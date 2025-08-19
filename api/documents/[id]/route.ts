import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockDocuments } from '@/data/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      const document = mockDocuments.find(d => d.id === id)
      
      if (!document) {
        return NextResponse.json(
          { success: false, error: 'Document not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: document
      })
    }

    // Production database query
    const [documents] = await pool.execute(
      `SELECT d.*, u.name as author, c.name as category_name 
       FROM documents d 
       LEFT JOIN users u ON d.author_id = u.id 
       LEFT JOIN categories c ON d.category_id = c.id 
       WHERE d.id = ?`,
      [id]
    ) as any[]

    if (documents.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: documents[0]
    })

  } catch (error) {
    console.error('Document fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updates = await request.json()

    // For development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const documentIndex = mockDocuments.findIndex(d => d.id === id)
      
      if (documentIndex === -1) {
        return NextResponse.json(
          { success: false, error: 'Document not found' },
          { status: 404 }
        )
      }

      const updatedDocument = {
        ...mockDocuments[documentIndex],
        ...updates,
        updated_at: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        data: updatedDocument
      })
    }

    // Production database update
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ')
    const values = [...Object.values(updates), id]

    await pool.execute(
      `UPDATE documents SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    )

    const [updatedDocument] = await pool.execute(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    ) as any[]

    return NextResponse.json({
      success: true,
      data: updatedDocument[0]
    })

  } catch (error) {
    console.error('Document update error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    // For development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const documentExists = mockDocuments.some(d => d.id === id)
      
      if (!documentExists) {
        return NextResponse.json(
          { success: false, error: 'Document not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Document deleted successfully'
      })
    }

    // Production database delete
    const [result] = await pool.execute(
      'DELETE FROM documents WHERE id = ?',
      [id]
    ) as any[]

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    })

  } catch (error) {
    console.error('Document deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
