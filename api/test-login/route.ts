import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('Test login endpoint called with:', { email, password })
    
    return NextResponse.json({
      success: true,
      message: 'Test endpoint working',
      data: { email, timestamp: new Date().toISOString() }
    })
  } catch (error) {
    console.error('Test login error:', error)
    return NextResponse.json(
      { success: false, error: 'Test endpoint error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Test login endpoint is working'
  })
}
