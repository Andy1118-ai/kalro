"use client"

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Eye, Star } from 'lucide-react'
import { type ApiResponse } from '@/hooks/use-api'
import { useEffect, useState } from 'react'
import { mockDocuments } from '@/data/mock-data'

interface Document {
  id: number;
  title: string;
  description: string;
  category_name?: string;
  file_type?: string;
  author?: string;
  created_at?: string;
  download_count?: number;
}

export function FeaturedContent() {
  const [featuredResources, setFeaturedResources] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      try {
        // Get the 3 most downloaded documents
        const featured = mockDocuments
          .sort((a, b) => (b.download_count || 0) - (a.download_count || 0))
          .slice(0, 3)
          .map(doc => ({
            id: doc.id,
            title: doc.title,
            description: doc.description,
            category_name: doc.tags?.[0] || 'Resource',
            file_type: doc.file_type,
            author: doc.author,
            created_at: doc.created_at,
            download_count: doc.download_count
          }))
        
        setFeaturedResources(featured)
      } catch (err) {
        setError('Failed to load featured content')
      } finally {
        setLoading(false)
      }
    }, 500) // Add a small delay to simulate network request
  }, [])
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#007A33] mb-4">Featured Resources</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and recently published agricultural resources
          </p>
        </div>
        {loading && <div className="text-center text-sm">Loading...</div>}
        {error && <div className="text-center text-sm text-red-600">{error}</div>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredResources.map((resource: Document) => (
            <Card key={resource.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-100">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-[#007A33] text-white">{resource.category_name || 'Resource'}</Badge>
                  <Badge className="bg-white/90 text-gray-800">
                    {resource.file_type || 'Document'}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-black transition-colors line-clamp-2">
                  {resource.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-black">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-black">
                    <span>By {resource.author || '—'}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(resource.created_at || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-black">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4 text-[#007A33]" />
                        <span>{(resource.download_count ?? 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-[#007A33] hover:bg-[#006400]">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white">
                      <Download className="h-4 w-4 text-[#007A33]" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  )
}
