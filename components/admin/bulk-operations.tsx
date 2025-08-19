"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Link, Youtube, FileText, Trash2, Edit, Download, AlertCircle, CheckCircle, X } from 'lucide-react'
import { useState } from "react"



interface BulkUploadItem {
  id: string
  type: 'file' | 'url' | 'youtube'
  name: string
  source: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  error?: string
  metadata?: {
    domain?: string
    category?: string
    subcategory?: string
    type?: string
    author?: string
    description?: string
  }
}

interface Category {
  name: string;
  displayName: string;
  subcategories?: string[];
}

interface DomainData {
  name: string;
  categories: Category[];
}

interface DomainCategories {
  [key: string]: DomainData;
}

const domainCategories: DomainCategories = {
  crops: {
    name: "Crops",
    categories: [
      {
        name: "cereals",
        displayName: "Cereals",
        subcategories: ["maize", "teff", "rice", "sorghum", "finger-millet"]
      },
      {
        name: "legumes",
        displayName: "Legumes",
        subcategories: ["cowpeas", "dry-beans", "green-grams", "pigeon-peas"]
      },
      {
        name: "fruits",
        displayName: "Fruits",
        subcategories: ["banana", "avocado", "mango", "papaya"]
      }
    ]
  },
  livestock: {
    name: "Livestock",
    categories: [
      { name: "poultry", displayName: "Poultry" },
      { name: "cattle", displayName: "Cattle" },
      { name: "goats", displayName: "Goats" }
    ]
  },
  "natural-resources": {
    name: "Natural Resources",
    categories: [
      { name: "soil-health", displayName: "Soil Health" },
      { name: "water-management", displayName: "Water Management" }
    ]
  },
  "socio-economics": {
    name: "Socio-Economics",
    categories: [
      { name: "agribusiness", displayName: "Agribusiness" },
      { name: "market-access", displayName: "Market Access" }
    ]
  }
}

export default function BulkOperations() {
  const [uploadItems, setUploadItems] = useState<BulkUploadItem[]>([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const getCurrentCategories = () => {
    if (!selectedDomain) return []
    return domainCategories[selectedDomain as keyof typeof domainCategories]?.categories || []
  }

  const getCurrentSubcategories = () => {
    if (!selectedDomain || !selectedCategory) return []
    const domain = domainCategories[selectedDomain as keyof typeof domainCategories]
    const category = domain?.categories.find(cat => cat.name === selectedCategory)
    return category?.subcategories || []
  }

  const addUrlUpload = () => {
    if (!urlInput.trim()) return

    const newItem: BulkUploadItem = {
      id: Date.now().toString(),
      type: 'url',
      name: urlInput.split('/').pop() || 'URL Document',
      source: urlInput,
      status: 'pending',
      progress: 0,
      metadata: {
        domain: selectedDomain,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        type: documentType,
        author,
        description
      }
    }

    setUploadItems(prev => [...prev, newItem])
    setUrlInput('')
  }

  const addYoutubeUpload = () => {
    if (!youtubeUrl.trim()) return

    // Extract video ID from YouTube URL
    const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    if (!videoId) return

    const newItem: BulkUploadItem = {
      id: Date.now().toString(),
      type: 'youtube',
      name: `YouTube Video: ${videoId}`,
      source: youtubeUrl,
      status: 'pending',
      progress: 0,
      metadata: {
        domain: selectedDomain,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        type: 'youtube',
        author,
        description
      }
    }

    setUploadItems(prev => [...prev, newItem])
    setYoutubeUrl('')
  }

  const removeItem = (id: string) => {
    setUploadItems(prev => prev.filter(item => item.id !== id))
  }

  const startBulkUpload = async () => {
    setIsProcessing(true)

    for (const item of uploadItems) {
      if (item.status !== 'pending') continue

      // Update status to processing
      setUploadItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, status: 'processing' } : i
      ))

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setUploadItems(prev => prev.map(i => 
          i.id === item.id ? { ...i, progress } : i
        ))
      }

      // Randomly simulate success or error
      const success = Math.random() > 0.2
      setUploadItems(prev => prev.map(i => 
        i.id === item.id ? { 
          ...i, 
          status: success ? 'completed' : 'error',
          error: success ? undefined : 'Failed to process document'
        } : i
      ))
    }

    setIsProcessing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'processing':
        return <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#007A33] border-t-transparent" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-600" />
      case 'url':
        return <Link className="h-4 w-4 text-blue-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-[#007A33]">Bulk Operations</h3>
          <p className="text-gray-600">Upload multiple documents or perform bulk actions</p>
        </div>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
          <TabsTrigger value="manage">Bulk Manage</TabsTrigger>
          <TabsTrigger value="delete">Bulk Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#007A33]">Upload Configuration</CardTitle>
                <CardDescription>Set default metadata for bulk uploads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Domain</Label>
                    <Select value={selectedDomain} onValueChange={(value) => {
                      setSelectedDomain(value)
                      setSelectedCategory('')
                      setSelectedSubcategory('')
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crops">Crops</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                        <SelectItem value="natural-resources">Natural Resources</SelectItem>
                        <SelectItem value="socio-economics">Socio-Economics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={(value) => {
                        setSelectedCategory(value)
                        setSelectedSubcategory('')
                      }}
                      disabled={!selectedDomain}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentCategories().map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {getCurrentSubcategories().length > 0 && (
                  <div className="space-y-2">
                    <Label>Subcategory</Label>
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentSubcategories().map((subcategory: string) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('-', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="pamphlet">Pamphlet</SelectItem>
                      <SelectItem value="brochure">Brochure</SelectItem>
                      <SelectItem value="leaflet">Leaflet</SelectItem>
                      <SelectItem value="factsheet">Factsheet</SelectItem>
                      <SelectItem value="youtube">YouTube Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name" 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#007A33]">Add Documents</CardTitle>
                <CardDescription>Upload files, URLs, or YouTube videos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label>File Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#007A33] transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                    <Button variant="outline">Choose Files</Button>
                  </div>
                </div>

                {/* URL Upload */}
                <div className="space-y-2">
                  <Label>URL/Link Upload</Label>
                  <div className="flex space-x-2">
                    <Input 
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Enter document URL or link" 
                    />
                    <Button onClick={addUrlUpload} disabled={!urlInput.trim()}>
                      <Link className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* YouTube Upload */}
                <div className="space-y-2">
                  <Label>YouTube Video</Label>
                  <div className="flex space-x-2">
                    <Input 
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="Enter YouTube URL" 
                    />
                    <Button onClick={addYoutubeUpload} disabled={!youtubeUrl.trim()}>
                      <Youtube className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Queue */}
          {uploadItems.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#007A33]">Upload Queue</CardTitle>
                    <CardDescription>{uploadItems.length} items ready for upload</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setUploadItems([])}
                      disabled={isProcessing}
                    >
                      Clear All
                    </Button>
                    <Button 
                      onClick={startBulkUpload}
                      disabled={isProcessing || uploadItems.every(item => item.status !== 'pending')}
                      className="bg-[#007A33] hover:bg-[#006400]"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isProcessing ? 'Processing...' : 'Start Upload'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <Badge variant={
                            item.status === 'completed' ? 'default' :
                            item.status === 'error' ? 'destructive' :
                            item.status === 'processing' ? 'secondary' : 'outline'
                          }>
                            {item.status}
                          </Badge>
                        </div>
                        
                        {item.status === 'processing' && (
                          <Progress value={item.progress} className="w-full mt-2" />
                        )}
                        
                        {item.error && (
                          <p className="text-xs text-red-600 mt-1">{item.error}</p>
                        )}
                        
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600">
                          <span>{item.metadata?.domain}</span>
                          {item.metadata?.category && (
                            <>
                              <span>•</span>
                              <span>{item.metadata.category}</span>
                            </>
                          )}
                          {item.metadata?.type && (
                            <>
                              <span>•</span>
                              <span>{item.metadata.type}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeItem(item.id)}
                        disabled={item.status === 'processing'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#007A33]">Bulk Document Management</CardTitle>
              <CardDescription>Select and manage multiple documents at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox />
                    <Label>Select All</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Bulk Edit
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4 text-[#007A33]" />
                      Export Selected
                    </Button>
                  </div>
                </div>
                
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Document management interface will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#007A33] flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                Bulk Delete Operations
              </CardTitle>
              <CardDescription>Permanently delete multiple documents (use with caution)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">Warning</span>
                  </div>
                  <p className="text-red-700 text-sm mt-1">
                    Bulk delete operations are permanent and cannot be undone. Please review your selection carefully.
                  </p>
                </div>
                
                <div className="text-center py-12 text-gray-500">
                  <Trash2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Bulk delete interface will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
