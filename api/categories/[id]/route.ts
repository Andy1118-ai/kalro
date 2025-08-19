import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockCategories } from '@/data/mock-data'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updates = await request.json()

    if (process.env.NODE_ENV === 'development') {
      const existing = mockCategories.find(c => c.id === id)
      if (!existing) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        )
      }
      const updated = { ...existing, ...updates, updated_at: new Date().toISOString() }
      return NextResponse.json({ success: true, data: updated })
    }

    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ')
    const values = [...Object.values(updates), id]
    await pool.execute(
      `UPDATE categories SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    )
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]) as any[]
    return NextResponse.json({ success: true, data: rows[0] })
  } catch (error) {
    console.error('Category update error:', error)
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

    if (process.env.NODE_ENV === 'development') {
      const exists = mockCategories.some(c => c.id === id)
      if (!exists) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, message: 'Category deleted successfully' })
    }

    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]) as any[]
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Category delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}


