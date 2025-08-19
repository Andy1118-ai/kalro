"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Edit, Save, X, Plus, Trash2, BarChart3 } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

interface Category {
  id: number
  name: string
  count: number
  subcategories: number
  description?: string
  color: string
  created: string
  lastModified: string
}

interface CategoryManagerProps {
  category: Category | null
  isOpen: boolean
  onClose: () => void
  mode: 'view' | 'edit' | 'create'
  onModeChange: (mode: 'view' | 'edit' | 'create') => void
  onChanged?: () => void
}

export function CategoryManager({ category, isOpen, onClose, mode, onModeChange, onChanged }: CategoryManagerProps) {
  const [editedCategory, setEditedCategory] = useState<Category | null>(null)

  if (!category && mode !== 'create') return null

  const handleEdit = () => {
    setEditedCategory({ ...category! })
    onModeChange('edit')
  }

  const handleSave = async () => {
    if (mode === 'edit' && editedCategory) {
      await apiClient.updateCategory(editedCategory.id, {
        name: editedCategory.name,
        description: editedCategory.description,
        color: editedCategory.color,
      })
      onChanged?.()
    }
    if (mode === 'create') {
      const payload: any = {
        name: editedCategory?.name,
        slug: editedCategory?.name?.toLowerCase().replace(/\s+/g, '-'),
        description: editedCategory?.description,
        color: editedCategory?.color || '#007A33',
      }
      await apiClient.createCategory(payload)
      onChanged?.()
    }
    onModeChange('view')
  }

  const handleCancel = () => {
    setEditedCategory(null)
    onModeChange('view')
  }

  const currentCategory = mode === 'edit' ? editedCategory : category

  const subcategoryData = [
    { name: 'Cereals', count: 450, growth: '+12%' },
    { name: 'Legumes', count: 320, growth: '+8%' },
    { name: 'Vegetables', count: 280, growth: '+15%' },
    { name: 'Fruits', count: 200, growth: '+5%' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FolderOpen className="h-6 w-6 text-[#007A33]" />
              <div>
                <DialogTitle className="text-xl">
                  {mode === 'create' ? 'Create New Category' : currentCategory?.name}
                </DialogTitle>
                <DialogDescription>
                  {mode === 'create' ? 'Add a new category to organize resources' : 
                   `Category ID: ${currentCategory?.id} • ${currentCategory?.count} resources`}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {mode === 'view' ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={async () => {
                      if (!category) return
                      await apiClient.deleteCategory(category.id)
                      onChanged?.()
                      onClose()
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-[#007A33] hover:bg-[#006400]">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Statistics */}
          {mode !== 'create' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BarChart3 className="h-6 w-6 mx-auto mb-2 text-[#007A33]" />
                <div className="text-2xl font-bold">{currentCategory?.count}</div>
                <div className="text-sm text-gray-600">Total Resources</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FolderOpen className="h-6 w-6 mx-auto mb-2 text-[#007A33]" />
                <div className="text-2xl font-bold">{currentCategory?.subcategories}</div>
                <div className="text-sm text-gray-600">Subcategories</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold">+15%</div>
                <div className="text-sm text-gray-600">Growth Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          )}

          {/* Category Form */}
          {mode === 'view' ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#007A33] mb-2">Category Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Name</Label>
                    <p className="text-sm text-gray-900 mt-1">{currentCategory?.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-4 h-4 rounded-full ${currentCategory?.color}`}></div>
                      <span className="text-sm text-gray-900">{currentCategory?.color}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Created</Label>
                    <p className="text-sm text-gray-900 mt-1">{currentCategory?.created}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Last Modified</Label>
                    <p className="text-sm text-gray-900 mt-1">{currentCategory?.lastModified}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-sm text-gray-900 mt-1">
                  {currentCategory?.description || "This category contains resources related to agricultural research and development in this specific domain."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#007A33] mb-2">
                {mode === 'create' ? 'Category Details' : 'Edit Category'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={editedCategory?.name || ''}
                    onChange={(e) => setEditedCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                    placeholder="Enter category name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-color">Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="category-color"
                      value={editedCategory?.color || ''}
                      onChange={(e) => setEditedCategory(prev => prev ? { ...prev, color: e.target.value } : null)}
                      placeholder="bg-[#007A33]"
                    />
                    <div className={`w-8 h-8 rounded-full ${editedCategory?.color || 'bg-gray-300'}`}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={editedCategory?.description || ''}
                  onChange={(e) => setEditedCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={4}
                  placeholder="Enter category description"
                />
              </div>
            </div>
          )}

          {/* Subcategories */}
          {mode !== 'create' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#007A33]">Subcategories</h3>
                <Button size="sm" variant="outline" className="border-[#007A33] text-[#007A33]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subcategory
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcategoryData.map((sub, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{sub.name}</CardTitle>
                        <Badge variant="secondary" className="text-green-600">
                          {sub.growth}
                        </Badge>
                      </div>
                      <CardDescription>{sub.count} resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Category Analytics */}
          {mode !== 'create' && (
            <div>
              <h3 className="text-lg font-semibold text-[#007A33] mb-4">Category Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Resource Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subcategoryData.map((sub, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{sub.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#007A33] h-2 rounded-full" 
                                style={{ width: `${(sub.count / 450) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{sub.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Growth Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">Growth chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
