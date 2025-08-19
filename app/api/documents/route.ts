import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockDocuments, mockCategories } from '@/data/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const categoryId = searchParams.get('category_id')
    const searchQuery = searchParams.get('search')
    const documentType = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // For admin dashboard, allow fetching all documents without category_id
    // For regular document browsing, category_id is still required

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      let documents = [...mockDocuments]

      // Filter by category if provided
      if (categoryId) {
        documents = documents.filter(doc =>
          doc.category_id === parseInt(categoryId)
        )
      }

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

      // Apply pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedDocuments = documents.slice(startIndex, endIndex)

      // Create a category lookup map
      const categoryMap = new Map()
      mockCategories.forEach(cat => {
        categoryMap.set(cat.id, cat.name)
        if (cat.subcategories) {
          cat.subcategories.forEach(subcat => {
            categoryMap.set(subcat.id, subcat.name)
          })
        }
      })

      // Format the documents according to the expected structure
      const formattedDocuments = paginatedDocuments.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        type: doc.file_type,
        file_type: doc.file_type,
        author: doc.author,
        date: doc.created_at,
        created_at: doc.created_at,
        downloads: doc.download_count,
        download_count: doc.download_count,
        category_name: categoryMap.get(doc.category_id) || 'General',
        status: doc.status || 'published',
        image: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(doc.title)}`
      }))

      return NextResponse.json({
        success: true,
        data: formattedDocuments,
        pagination: {
          page,
          limit,
          total: documents.length,
          totalPages: Math.ceil(documents.length / limit)
        }
      })
    }

    // Production database query
    let query = 'SELECT * FROM documents WHERE 1=1'
    const params: any[] = []

    if (categoryId) {
      query += ' AND category_id = ?'
      params.push(categoryId)
    }

    if (searchQuery) {
      query += ' AND (title LIKE ? OR description LIKE ?)'
      params.push(`%${searchQuery}%`, `%${searchQuery}%`)
    }

    if (documentType) {
      query += ' AND file_type = ?'
      params.push(documentType)
    }

    query += ' LIMIT ? OFFSET ?'
    params.push(limit, (page - 1) * limit)

    const [documents] = await pool.execute(query, params) as any[]

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM documents WHERE 1=1'
    const countParams: any[] = []

    if (categoryId) {
      countQuery += ' AND category_id = ?'
      countParams.push(categoryId)
    }

    if (searchQuery) {
      countQuery += ' AND (title LIKE ? OR description LIKE ?)'
      countParams.push(`%${searchQuery}%`, `%${searchQuery}%`)
    }

    if (documentType) {
      countQuery += ' AND file_type = ?'
      countParams.push(documentType)
    }

    const [countResult] = await pool.execute(countQuery, countParams) as any[]
    const total = countResult[0].total

    return NextResponse.json({
      success: true,
      data: documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Documents error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, category_id, file_type, file_url, author } = await request.json()

    if (!title || !category_id) {
      return NextResponse.json(
        { success: false, error: 'Title and category_id are required' },
        { status: 400 }
      )
    }

    // For development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const newDocument = {
        id: Math.max(...mockDocuments.map(d => d.id)) + 1,
        title,
        description,
        category_id,
        file_type: file_type || 'pdf',
        file_url: file_url || '/placeholder-document.pdf',
        author: author || 'Unknown',
        download_count: 0,
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
      'INSERT INTO documents (title, description, category_id, file_type, file_url, author) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, category_id, file_type || 'pdf', file_url || '/placeholder-document.pdf', author || 'Unknown']
    ) as any[]

    const newDocument = {
      id: result.insertId,
      title,
      description,
      category_id,
      file_type: file_type || 'pdf',
      file_url: file_url || '/placeholder-document.pdf',
      author: author || 'Unknown',
      download_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: newDocument
    })

  } catch (error) {
    console.error('Create document error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
