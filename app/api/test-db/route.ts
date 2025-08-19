import { NextResponse } from 'next/server'
import pool from '@/lib/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test the database connection
    const connection = await pool.getConnection()
    
    // Run a simple query
    const [rows] = await connection.execute('SELECT 1 as test')
    
    // Release the connection back to the pool
    connection.release()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: rows
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
