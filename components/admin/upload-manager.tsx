"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText } from 'lucide-react'
import { apiClient } from "@/lib/api-client"
import { default as KALROLoadingSpinner } from "@/components/loading-spinner"

export function UploadManager() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [docType, setDocType] = useState("")
  const [domain, setDomain] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      setMessage(null)
      const form = new FormData()
      form.append('title', title)
      form.append('description', description)
      if (file) form.append('file', file)
      // Optional fields
      if (docType) form.append('file_type', docType)
      if (domain) form.append('category_id', domain)
      // Mock author in dev
      form.append('author_id', '1')
      form.append('tags', JSON.stringify([]))
      await apiClient.uploadDocument(form)
      setMessage('Document uploaded')
      setTitle(""); setDescription(""); setDocType(""); setDomain(""); setFile(null)
    } catch (e: any) {
      setMessage(e?.message || 'Upload failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#007A33]">Upload New Document</CardTitle>
          <CardDescription>Add new resources to the knowledge hub</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && <div className="text-sm">{message}</div>}
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter document title" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter document description" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Crops</SelectItem>
                  <SelectItem value="2">Livestock</SelectItem>
                  <SelectItem value="3">Natural Resources</SelectItem>
                  <SelectItem value="4">Socio-Economics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Document Type</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#007A33] transition-colors">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
              <Input type="file" onChange={handleFileChange} />
            </div>
          </div>
          
          <Button className="w-full bg-[#007A33] hover:bg-[#006400]" disabled={submitting} onClick={handleSubmit}>
            {submitting ? (
              <KALROLoadingSpinner />
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
