import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockDocuments } from '@/data/mock-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')
    const searchQuery = searchParams.get('search')
    const documentType = searchParams.get('type')

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      )
    }

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      let documents = mockDocuments.filter(doc => 
        doc.category_id === parseInt(categoryId)
      )

      // Apply search filter if provided
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        documents = documents.filter(doc =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
        )
      }

      // Apply document type filter if provided
      if (documentType) {
        documents = documents.filter(doc =>
          doc.file_type.toLowerCase() === documentType.toLowerCase()
        )
      }

      // Format the documents according to the expected structure
      const formattedDocuments = documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        type: doc.file_type,
        author: doc.author,
        date: doc.created_at,
        downloads: doc.download_count,
        image: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(doc.title)}`
      }))

      return NextResponse.json({
        success: true,
        data: formattedDocuments
      })
    }

    // Production database query
    let query = `
      SELECT d.*, u.name as author_name 
      FROM documents d 
      LEFT JOIN users u ON d.author_id = u.id 
      WHERE d.category_id = ?
    `
    const params: any[] = [categoryId]

    if (searchQuery) {
      query += ' AND (d.title LIKE ? OR d.description LIKE ?)'
      params.push(`%${searchQuery}%`, `%${searchQuery}%`)
    }

    if (documentType) {
      query += ' AND d.file_type = ?'
      params.push(documentType)
    }

    query += ' ORDER BY d.created_at DESC'

    const [documents] = await pool.execute(query, params) as any[]

    const formattedDocuments = documents.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      type: doc.file_type,
      author: doc.author_name,
      date: doc.created_at,
      downloads: doc.download_count,
      image: doc.image_url || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(doc.title)}`
    }))

    return NextResponse.json({
      success: true,
      data: formattedDocuments
    })

  } catch (error) {
    console.error('Documents fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and multipart form-data
    let title: string | null = null
    let description: string | null = null
    let file_path: string | null = null
    let file_type: string | null = null
    let file_size: number | null = null
    let category_id: number | null = null
    let author_id: number | null = null
    let tags: any[] | null = null

    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      title = (form.get('title') as string) || ''
      description = (form.get('description') as string) || ''
      const file = form.get('file') as File | null
      if (file) {
        file_path = `/uploads/${file.name}`
        file_type = file.type || 'application/octet-stream'
        file_size = file.size || 0
      }
      category_id = form.get('category_id') ? parseInt(form.get('category_id') as string) : null
      author_id = form.get('author_id') ? parseInt(form.get('author_id') as string) : null
      const tagsValue = form.get('tags') as string | null
      tags = tagsValue ? JSON.parse(tagsValue) : []
    } else {
      const body = await request.json()
      title = body.title
      description = body.description
      file_path = body.file_path
      file_type = body.file_type
      file_size = body.file_size
      category_id = body.category_id
      author_id = body.author_id
      tags = body.tags
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    // For development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const newDocument = {
        id: Math.max(...mockDocuments.map(d => d.id)) + 1,
        title,
        description,
        file_path,
        file_type,
        file_size,
        category_id,
        author_id,
        status: 'draft' as const,
        tags: tags || [],
        download_count: 0,
        view_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        data: newDocument
      })
    }

    // Production database insert
    const [result] = await pool.execute(
      'INSERT INTO documents (title, description, file_path, file_type, file_size, category_id, author_id, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, file_path, file_type, file_size, category_id, author_id, JSON.stringify(tags || [])]
    ) as any[]

    const [newDocument] = await pool.execute(
      'SELECT * FROM documents WHERE id = ?',
      [result.insertId]
    ) as any[]

    return NextResponse.json({
      success: true,
      data: newDocument[0]
    })

  } catch (error) {
    console.error('Document creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
