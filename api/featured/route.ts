import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET(req: NextRequest) {
  try {
    const featured = await db.query(
      `SELECT d.*, c.name as category_name, u.name as author 
       FROM documents d 
       LEFT JOIN categories c ON d.category_id = c.id
       LEFT JOIN users u ON d.author_id = u.id
       WHERE d.featured = 1 AND d.status = 'published'
       ORDER BY d.created_at DESC
       LIMIT 3`
    )

    return NextResponse.json({ success: true, data: featured })
  } catch (error) {
    console.error('Error fetching featured content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured content' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { documentId, featured } = await req.json()
    
    // Only allow admins to update featured status (you'll need to implement auth check)
    await db.query(
      'UPDATE documents SET featured = ? WHERE id = ?',
      [featured ? 1 : 0, documentId]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating featured status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update featured status' },
      { status: 500 }
    )
  }
}
