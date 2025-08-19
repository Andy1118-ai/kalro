import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'
import { mockCategories } from '@/data/mock-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const includeSubcategories = searchParams.get('include_subcategories') === 'true'

    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      const domainCategory = mockCategories.find(cat => cat.slug === domain)
      
      if (!domainCategory) {
        return NextResponse.json(
          { success: false, error: 'Domain not found' },
          { status: 404 }
        )
      }

      // Format the response according to the expected structure
      return NextResponse.json({
        success: true,
        data: {
          id: domainCategory.id,
          name: domainCategory.name,
          description: domainCategory.description,
          slug: domainCategory.slug,
          color: domainCategory.color,
          subcategories: domainCategory.subcategories?.map(sub => ({
            id: sub.id,
            name: sub.name,
            displayName: sub.name, // Using name as display name
            slug: sub.slug,
            description: sub.description
          })) || []
        }
      })
    }

    // Production database query
    let query = 'SELECT * FROM categories WHERE slug = ? AND parent_id IS NULL'
    const [categories] = await pool.execute(query, [domain]) as any[]

    if (categories.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Domain not found' },
        { status: 404 }
      )
    }

    const category = categories[0]

    if (includeSubcategories) {
      const [subcategories] = await pool.execute(
        'SELECT * FROM categories WHERE parent_id = ? ORDER BY name',
        [category.id]
      ) as any[]
      category.subcategories = subcategories.map((sub: any) => ({
        id: sub.id,
        name: sub.name,
        displayName: sub.name,
        slug: sub.slug,
        description: sub.description
      }))
    }

    return NextResponse.json({
      success: true,
      data: category
    })

  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug, description, parent_id, color, icon } = await request.json()

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    // For development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const newCategory = {
        id: Math.max(...mockCategories.map(c => c.id)) + 1,
        name,
        slug,
        description,
        parent_id,
        color: color || '#007A33',
        icon,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        data: newCategory
      })
    }

    // Production database insert
    const [result] = await pool.execute(
      'INSERT INTO categories (name, slug, description, parent_id, color, icon) VALUES (?, ?, ?, ?, ?, ?)',
      [name, slug, description, parent_id, color || '#007A33', icon]
    ) as any[]

    const [newCategory] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    ) as any[]

    return NextResponse.json({
      success: true,
      data: newCategory[0]
    })

  } catch (error) {
    console.error('Category creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
