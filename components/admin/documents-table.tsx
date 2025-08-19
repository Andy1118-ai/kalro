"use client"

import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash2, Download } from 'lucide-react'
import { DocumentViewer } from "./document-viewer"
import { apiClient } from "@/lib/api-client"
import { default as KALROLoadingSpinner } from "@/components/loading-spinner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function DocumentsTable() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerMode, setViewerMode] = useState<'view' | 'edit'>('view')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)

  // Load documents on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true)
      setError(null)
      try {
        // Call the API without category_id to get all documents for admin dashboard
        const response = await apiClient.getDocuments() as any
        if (response.success && response.data) {
          setDocuments(response.data)
        } else {
          setError('Failed to load documents')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents')
      } finally {
        setLoading(false)
      }
    }

    loadDocuments()
  }, [])

  const refetch = () => {
    // Reload documents
    const loadDocuments = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.getDocuments() as any
        if (response.success && response.data) {
          setDocuments(response.data)
        } else {
          setError('Failed to load documents')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents')
      } finally {
        setLoading(false)
      }
    }
    loadDocuments()
  }

  const handleView = (document: any) => {
    setSelectedDocument(document)
    setViewerMode('view')
    setIsViewerOpen(true)
  }

  const handleEdit = (document: any) => {
    setSelectedDocument(document)
    setViewerMode('edit')
    setIsViewerOpen(true)
  }

  const handleDownload = (document: any) => {
    setSelectedDocument(document)
    setIsDownloadDialogOpen(true)
  }

  const handleDownloadConfirm = () => {
    if (selectedDocument) {
      console.log('Downloading document:', selectedDocument.title)
      // Implement download logic
      setIsDownloadDialogOpen(false)
    }
  }

  const handleDelete = (document: any) => {
    setSelectedDocument(document)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedDocument) {
      await apiClient.deleteDocument(selectedDocument.id)
      setIsDeleteDialogOpen(false)
      refetch()
    }
  }

  return (
    <>
      {loading && <KALROLoadingSpinner />}
      {error && <div className="p-4 text-red-600">{error}</div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{doc.category_name || doc.domain || '—'}</Badge>
              </TableCell>
              <TableCell>{doc.file_type || doc.type || '—'}</TableCell>
              <TableCell>{doc.author || '—'}</TableCell>
              <TableCell>
                <Badge
                  variant={doc.status?.toLowerCase() === 'published' ? 'default' : doc.status?.toLowerCase() === 'draft' ? 'secondary' : 'outline'}
                  className={doc.status?.toLowerCase() === 'published' ? 'bg-green-100 text-green-800' : ''}
                >
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell>{(doc.download_count ?? doc.downloads ?? 0).toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(doc)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(doc)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                    <Download className="h-4 w-4 text-[#007A33]" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(doc)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DocumentViewer
        document={selectedDocument}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        mode={viewerMode}
        onModeChange={setViewerMode}
        onSave={async (updated) => {
          await apiClient.updateDocument(updated.id, updated)
          refetch()
        }}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedDocument?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Document</DialogTitle>
            <DialogDescription>
              You are about to download &quot;{selectedDocument?.title}&quot;. Do you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="ghost" onClick={() => setIsDownloadDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleDownloadConfirm}>
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
