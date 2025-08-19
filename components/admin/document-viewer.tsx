"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Edit, Save, X, Calendar, User, Tag, Eye } from 'lucide-react'

interface Document {
  id: number
  title: string
  domain: string
  type: string
  author: string
  date: string
  status: string
  downloads: number
  description?: string
  tags?: string[]
  fileSize?: string
  version?: string
}

interface DocumentViewerProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
  mode: 'view' | 'edit'
  onModeChange: (mode: 'view' | 'edit') => void
  onSave?: (doc: Document) => Promise<void> | void
}

export function DocumentViewer({ document, isOpen, onClose, mode, onModeChange, onSave }: DocumentViewerProps) {
  const [editedDocument, setEditedDocument] = useState<Document | null>(null)

  if (!document) return null

  const handleEdit = () => {
    setEditedDocument({ ...document })
    onModeChange('edit')
  }

  const handleSave = async () => {
    if (editedDocument && onSave) {
      await onSave(editedDocument)
    }
    onModeChange('view')
  }

  const handleCancel = () => {
    setEditedDocument(null)
    onModeChange('view')
  }

  const currentDoc = mode === 'edit' ? editedDocument : document

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-[#007A33]" />
              <div>
                <DialogTitle className="text-xl">{currentDoc?.title}</DialogTitle>
                <DialogDescription>
                  Document ID: {currentDoc?.id} • {currentDoc?.type}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {mode === 'view' ? (
                <>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2 text-[#007A33]" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
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
          {/* Document Status and Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Eye className="h-6 w-6 mx-auto mb-2 text-[#007A33]" />
              <div className="text-2xl font-bold">{currentDoc?.downloads.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-[#007A33]" />
              <div className="text-sm font-bold">{currentDoc?.date}</div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <User className="h-6 w-6 mx-auto mb-2 text-[#007A33]" />
              <div className="text-sm font-bold">{currentDoc?.author}</div>
              <div className="text-sm text-gray-600">Author</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Tag className="h-6 w-6 mx-auto mb-2 text-[#007A33]" />
              <Badge variant={currentDoc?.status === 'Published' ? 'default' : 'secondary'}>
                {currentDoc?.status}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Status</div>
            </div>
          </div>

          <Separator />

          {/* Document Details */}
          {mode === 'view' ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#007A33] mb-2">Document Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Title</Label>
                    <p className="text-sm text-gray-900 mt-1">{currentDoc?.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Domain</Label>
                    <Badge variant="secondary" className="mt-1">{currentDoc?.domain}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Type</Label>
                    <p className="text-sm text-gray-900 mt-1">{currentDoc?.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Author</Label>
                    <p className="text-sm text-gray-900 mt-1">{currentDoc?.author}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-sm text-gray-900 mt-1">
                  {currentDoc?.description || "This is a comprehensive guide covering the latest techniques and best practices in agricultural research and development."}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(currentDoc?.tags || ['agriculture', 'research', 'guide']).map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#007A33] mb-2">Edit Document</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editedDocument?.title || ''}
                    onChange={(e) => setEditedDocument(prev => prev ? { ...prev, title: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-domain">Domain</Label>
                  <Select
                    value={editedDocument?.domain || ''}
                    onValueChange={(value) => setEditedDocument(prev => prev ? { ...prev, domain: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crops">Crops</SelectItem>
                      <SelectItem value="Livestock">Livestock</SelectItem>
                      <SelectItem value="Natural Resources">Natural Resources</SelectItem>
                      <SelectItem value="Socio-Economics">Socio-Economics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select
                    value={editedDocument?.type || ''}
                    onValueChange={(value) => setEditedDocument(prev => prev ? { ...prev, type: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Pamphlet">Pamphlet</SelectItem>
                      <SelectItem value="Brochure">Brochure</SelectItem>
                      <SelectItem value="Leaflet">Leaflet</SelectItem>
                      <SelectItem value="Factsheet">Factsheet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={editedDocument?.author || ''}
                    onChange={(e) => setEditedDocument(prev => prev ? { ...prev, author: e.target.value } : null)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editedDocument?.description || ''}
                  onChange={(e) => setEditedDocument(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Document Preview */}
          <div>
            <h3 className="text-lg font-semibold text-[#007A33] mb-2">Document Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Document preview would be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">PDF, DOC, or other file format preview</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
