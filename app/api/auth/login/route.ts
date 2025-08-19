import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '@/lib/database'
import { mockUsers } from '@/data/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      const user = mockUsers.find(u => u.email === email)

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // In development, accept any password for demo purposes
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-kalro-admin-portal-2024',
        { expiresIn: '24h' }
      )

      // Set HttpOnly cookie on the response so middleware can read it reliably
      const response = NextResponse.json({
        success: true,
        data: {
          user: { ...user, password: undefined },
          token
        }
      })

      const isSecure = process.env.NODE_ENV !== 'development'
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: isSecure,
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return response
    }

    // Production database query
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as any[]

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const user = rows[0]
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-kalro-admin-portal-2024',
      { expiresIn: '24h' }
    )

    // Set HttpOnly cookie in production too
    const response = NextResponse.json({
      success: true,
      data: {
        user: { ...user, password: undefined },
        token
      }
    })

    const isSecure = process.env.NODE_ENV !== 'development'
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: isSecure,
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
