"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react'
import { CategoryManager } from "./category-manager"
import { useCategories } from "@/hooks/use-api"

export function CategoriesManager() {
  const { data, loading, error } = useCategories()
  const categories = useMemo(() => {
    const incoming = (data ?? []) as any[]
    return incoming.map((c) => ({
      id: c.id,
      name: c.name,
      // Use subcategories length as a proxy for count in dev mock; adjust when real counts are available
      count: (Array.isArray(c.subcategories) ? c.subcategories.length : 0) * 100,
      subcategories: Array.isArray(c.subcategories) ? c.subcategories.length : 0,
      color: c.color || '#007A33',
      description: c.description || '',
      created: c.created_at || '',
      lastModified: c.updated_at || ''
    }))
  }, [data])

  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[0] | null>(null)
  const [isManagerOpen, setIsManagerOpen] = useState(false)
  const [managerMode, setManagerMode] = useState<'view' | 'edit' | 'create'>('view')

  const handleView = (category: typeof categories[0]) => {
    setSelectedCategory(category)
    setManagerMode('view')
    setIsManagerOpen(true)
  }

  const handleEdit = (category: typeof categories[0]) => {
    setSelectedCategory(category)
    setManagerMode('edit')
    setIsManagerOpen(true)
  }

  const handleCreate = () => {
    setSelectedCategory(null)
    setManagerMode('create')
    setIsManagerOpen(true)
  }

  const handleDelete = (category: typeof categories[0]) => {
    console.log('Deleting category:', category.name)
    // Implement delete logic
  }

  return (
    <>
      {loading && <div className="p-4">Loading categories...</div>}
      {error && <div className="p-4 text-red-600">{error}</div>}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#007A33]">Category Management</h3>
          <Button className="bg-[#007A33] hover:bg-[#006400]" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {/* Category Analytics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-green-600">+2 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + (cat.count || 0), 0).toLocaleString()}</div>
              <p className="text-xs text-green-600">+15% growth</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Avg. Resources/Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length ? Math.round(categories.reduce((sum, cat) => sum + (cat.count || 0), 0) / categories.length) : 0}</div>
              <p className="text-xs text-green-600">Well distributed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories[0]?.name || '—'}</div>
              <p className="text-xs text-green-600">{categories[0]?.count?.toLocaleString?.() || 0} resources</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-[#007A33]" />
                    {category.name}
                  </CardTitle>
                    {typeof category.color === 'string' && category.color.startsWith('#') ? (
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    )}
                </div>
                <CardDescription>
                    {category.count} resources • {category.subcategories} subcategories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Growth Rate</span>
                    <Badge variant="secondary" className="text-green-600">+12%</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleView(category)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(category)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#007A33] flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Category Distribution
            </CardTitle>
            <CardDescription>Resource distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${typeof category.color === 'string' && !category.color.startsWith('#') ? category.color : ''}`}
                        style={{ width: `${categories[0]?.count ? Math.min(100, (category.count / categories[0].count) * 100) : 0}%`, backgroundColor: typeof category.color === 'string' && category.color.startsWith('#') ? category.color : undefined }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {category.count.toLocaleString()}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((category.count / categories.reduce((sum, cat) => sum + cat.count, 0)) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <CategoryManager
        category={selectedCategory}
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        mode={managerMode}
        onModeChange={setManagerMode}
        onChanged={() => {
          // simple refresh by reloading window; ideally we would expose refetch from useCategories
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }}
      />
    </>
  )
}
