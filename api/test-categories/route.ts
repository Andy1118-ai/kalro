import { NextResponse } from 'next/server'
import pool from '@/lib/database'

export async function GET() {
  try {
    const connection = await pool.getConnection()
    
    // Test querying actual data
    const [rows] = await connection.execute('SELECT * FROM categories LIMIT 5')
    
    connection.release()
    
    return NextResponse.json({
      success: true,
      message: 'Categories retrieved successfully!',
      data: rows
    })
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve categories',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
