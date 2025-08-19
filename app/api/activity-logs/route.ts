import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockActivityLogs } from '@/data/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const userId = searchParams.get('user_id')
    const action = searchParams.get('action')

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      let filteredLogs = [...mockActivityLogs]

      if (userId) {
        filteredLogs = filteredLogs.filter(log => log.user_id === parseInt(userId))
      }

      if (action) {
        filteredLogs = filteredLogs.filter(log => log.action === action)
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

      return NextResponse.json({
        success: true,
        data: paginatedLogs,
        pagination: {
          page,
          limit,
          total: filteredLogs.length,
          totalPages: Math.ceil(filteredLogs.length / limit)
        }
      })
    }

    // Production database query
    let query = `
      SELECT al.*, u.name as user_name 
      FROM activity_logs al 
      LEFT JOIN users u ON al.user_id = u.id 
      WHERE 1=1
    `
    const params: any[] = []

    if (userId) {
      query += ' AND al.user_id = ?'
      params.push(userId)
    }

    if (action) {
      query += ' AND al.action = ?'
      params.push(action)
    }

    query += ' ORDER BY al.created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, (page - 1) * limit)

    const [logs] = await pool.execute(query, params) as any[]

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM activity_logs WHERE 1=1'
    const countParams: any[] = []

    if (userId) {
      countQuery += ' AND user_id = ?'
      countParams.push(userId)
    }

    if (action) {
      countQuery += ' AND action = ?'
      countParams.push(action)
    }

    const [countResult] = await pool.execute(countQuery, countParams) as any[]
    const total = countResult[0].total

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Activity logs error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, action, resource_type, resource_id, details, ip_address } = await request.json()

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Action is required' },
        { status: 400 }
      )
    }

    // For development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const newLog = {
        id: Math.max(...mockActivityLogs.map(l => l.id)) + 1,
        user_id,
        action,
        resource_type,
        resource_id,
        details,
        ip_address,
        created_at: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        data: newLog
      })
    }

    // Production database insert
    const [result] = await pool.execute(
      'INSERT INTO activity_logs (user_id, action, resource_type, resource_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, action, resource_type, resource_id, details, ip_address]
    ) as any[]

    const newLog = {
      id: result.insertId,
      user_id,
      action,
      resource_type,
      resource_id,
      details,
      ip_address,
      created_at: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: newLog
    })

  } catch (error) {
    console.error('Create activity log error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
