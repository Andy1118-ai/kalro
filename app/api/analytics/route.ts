import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockAnalytics } from '@/data/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const metricType = searchParams.get('metric_type')

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      let filteredAnalytics = [...mockAnalytics]

      if (startDate) {
        filteredAnalytics = filteredAnalytics.filter(a => a.date >= startDate)
      }

      if (endDate) {
        filteredAnalytics = filteredAnalytics.filter(a => a.date <= endDate)
      }

      if (metricType) {
        filteredAnalytics = filteredAnalytics.filter(a => a.metric_type === metricType)
      }

      return NextResponse.json({
        success: true,
        data: filteredAnalytics
      })
    }

    // Production database query
    let query = 'SELECT * FROM analytics WHERE 1=1'
    const params: any[] = []

    if (startDate) {
      query += ' AND date >= ?'
      params.push(startDate)
    }

    if (endDate) {
      query += ' AND date <= ?'
      params.push(endDate)
    }

    if (metricType) {
      query += ' AND metric_type = ?'
      params.push(metricType)
    }

    query += ' ORDER BY date ASC'

    const [analytics] = await pool.execute(query, params) as any[]

    return NextResponse.json({
      success: true,
      data: analytics
    })

  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
