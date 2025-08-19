"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Eye, Calendar, User, BookOpen } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import KALROLoadingSpinner from "@/components/loading-spinner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Domain color mapping
const domainColors = {
  crops: "bg-gradient-to-r from-[#064400] to-[#064400]",
  livestock: "bg-gradient-to-r from-[#443400] to-[#443400]",
  "natural-resources": "bg-gradient-to-r from-[#525f15] to-[#525f15]",
  "socio-economics": "bg-gradient-to-r from-[#babf08] to-[#babf08]",
  "cross-cutting": "bg-gradient-to-r from-[#8b5cf6] to-[#6b46c1]"
}

// Import mock data
import { mockCategories, mockDomainDocuments } from '@/data/mock-data'

// Domain data mapping
const domainData = {
  crops: {
    title: "Crops",
    description: "Comprehensive resources for crop production and management",
    color: "from-[#064400] to-[#064400]",
    hasSubcategories: true,
    categories: [
      {
        name: "cereals",
        displayName: "Cereals",
        subcategories: [
          { name: "maize", displayName: "Maize" },
          { name: "teff", displayName: "Teff" },
          { name: "rice", displayName: "Rice" },
          { name: "sorghum", displayName: "Sorghum" },
          { name: "finger-millet", displayName: "Finger Millet" },
          { name: "green-gram", displayName: "Green Gram" },
          { name: "cowpeas", displayName: "Cowpeas" }
        ]
      },
      {
        name: "legumes",
        displayName: "Legumes/Pulses", 
        subcategories: [
          { name: "cowpeas", displayName: "Cowpeas" },
          { name: "dry-beans", displayName: "Dry Beans" },
          { name: "green-grams", displayName: "Green Grams" },
          { name: "pigeon-peas", displayName: "Pigeon Peas" },
          { name: "garden-peas", displayName: "Garden Peas" },
          { name: "groundnuts", displayName: "Groundnuts" }
        ]
      },
      {
        name: "fruits",
        displayName: "Fruits",
        subcategories: [
          { name: "banana", displayName: "Banana" },
          { name: "avocado", displayName: "Avocado" },
          { name: "gooseberry", displayName: "Gooseberry" },
          { name: "macadamia", displayName: "Macadamia" },
          { name: "coconut", displayName: "Coconut" },
          { name: "watermelon", displayName: "Watermelon" },
          { name: "mango", displayName: "Mango" },
          { name: "papaya", displayName: "Papaya" }
        ]
      },
      {
        name: "root-tubers",
        displayName: "Root & Tubers",
        subcategories: [
          { name: "cassava", displayName: "Cassava" },
          { name: "sweet-potato", displayName: "Sweet Potato" },
          { name: "irish-potato", displayName: "Irish Potato" },
          { name: "arrowroots", displayName: "Arrowroots" }
        ]
      },
      {
        name: "industrial",
        displayName: "Industrial Crops",
        subcategories: [
          { name: "sugar", displayName: "Sugar" },
          { name: "tea", displayName: "Tea" },
          { name: "coffee", displayName: "Coffee" },
          { name: "pyrethrum", displayName: "Pyrethrum" },
          { name: "cashew-nuts", displayName: "Cashew Nuts" },
          { name: "cotton", displayName: "Cotton" },
          { name: "coconut", displayName: "Coconut" }
        ]
      },
      {
        name: "vegetables",
        displayName: "Vegetables",
        subcategories: [
          { name: "tomatoes", displayName: "Tomatoes" },
          { name: "cabbage", displayName: "Cabbage" },
          { name: "kale", displayName: "Kale" },
          { name: "spinach", displayName: "Spinach" },
          { name: "garden-peas", displayName: "Garden Peas" },
          { name: "african-indigenous-vegetables", displayName: "African Indigenous Vegetables" },
          { name: "onions", displayName: "Onions" },
          { name: "amaranth", displayName: "Amaranth" }
        ]
      }
    ]
  },
  livestock: {
    title: "Livestock",
    description: "Animal husbandry and livestock management resources",
    color: "from-[#443400] to-[#443400]",
    hasSubcategories: false,
    categories: [
      { name: "poultry", displayName: "Poultry" },
      { name: "cattle", displayName: "Cattle" },
      { name: "pigs", displayName: "Pigs" },
      { name: "Animal Health", displayName: "Animal Health" },
      { name: "camels", displayName: "Camels" },
      { name: "apiculture", displayName: "Apiculture (Beekeeping)" },
      { name: "fishery", displayName: "Aquaculture (Fishery)" },
      { name: "sheep-goats", displayName: "Sheep and Goats" }
    ]
  },
  "natural-resources": {
    title: "Natural Resources",
    description: "Sustainable resource management and conservation",
    color: "from-[#525f15] to-[#525f15]",
    hasSubcategories: false,
    categories: [
      { name: "soil-health", displayName: "Soil Health & Conservation" },
      { name: "water-harvesting", displayName: "Water Harvesting & Irrigation" },
      { name: "agroforestry", displayName: "Agroforestry" },
      { name: "climate-smart", displayName: "Climate-Smart Agriculture" },
      { name: "biodiversity", displayName: "Biodiversity & Ecosystem Services" }
    ]
  },
  "socio-economics": {
    title: "Socio-Economics",
    description: "Agricultural economics and social development",
    color: "from-[#babf08] to-[#babf08]",
    hasSubcategories: false,
    categories: [
      { name: "agribusiness", displayName: "Agribusiness & Value Chains" },
      { name: "market-access", displayName: "Market Access & Trade" },
      { name: "gender-youth", displayName: "Gender & Youth in Agriculture" },
      { name: "baseline-studies", displayName: "Baseline Studies" },
      { name: "cooperative", displayName: "Cooperative Development" },
      { name: "policy", displayName: "Policy Briefs & Extension Models" }
    ]
  }
}

// Mock API client for fetching data
const fetchDomainData = async (domain: string) => {
  try {
    const data = domainData[domain as keyof typeof domainData]
    if (!data) throw new Error('Domain not found')
    return data
  } catch (error) {
    console.error('Error fetching domain data:', error)
    return null
  }
}

const fetchDocuments = async (categoryName: string, domainTitle?: string) => {
  try {
    // Get all domain documents
    let documents = []
    
    if (categoryName === 'all') {
      // For 'all', get documents from all domains or specific domain if provided
      if (domainTitle) {
        const domainDocs = mockDomainDocuments.find(d => 
          d.domain.toLowerCase() === domainTitle.toLowerCase()
        )
        documents = domainDocs ? domainDocs.documents : []
      } else {
        documents = mockDomainDocuments.flatMap(d => d.documents)
      }
    } else {
      // For specific category, get documents that match the category name
      const allDocs = mockDomainDocuments.flatMap(d => d.documents)
      documents = allDocs.filter(doc => 
        doc.category_id.toString().toLowerCase() === categoryName.toLowerCase() ||
        doc.tags.some(tag => tag.toLowerCase() === categoryName.toLowerCase())
      )
    }

    // Map the documents to the desired format
    return documents.map(doc => {
      return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        type: doc.file_type,
        author: doc.author,
        date: doc.created_at,
        downloads: doc.download_count,
        views: doc.view_count,
        image: '/default-document.png' // Adding the required image field
      }
    })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return []
  }
}

// No need for sample resources anymore as we'll fetch from API

function ResourceCard({ resource }: { resource: Resource }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  return (
    <Card className="group overflow-hidden">
      <div className="p-3 sm:p-4">
        <Badge variant="outline">
          {resource.type}
        </Badge>
      </div>
      
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-bold text-[#007A33] group-hover:text-[#006400] transition-colors line-clamp-2">
          {resource.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {resource.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-1 min-w-0">
              <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">{resource.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{new Date(resource.date).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="hidden sm:inline">{resource.downloads.toLocaleString()} downloads</span>
              <span className="sm:hidden">{resource.downloads > 1000 ? `${Math.round(resource.downloads/1000)}k` : resource.downloads}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="default" className="flex-1">
                  <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{resource.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By {resource.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(resource.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="default">
                        {resource.type}
                      </Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                <ScrollArea className="h-[70vh]">
                  <article className="prose prose-sm sm:prose-lg max-w-none p-6">
                    <div className="bg-muted p-4 rounded-lg">
                      {/* Document content with responsive typography */}
                    </div>
                  </article>
                </ScrollArea>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-6 border-t">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Download PDF
                    </Button>
                    <Button onClick={() => setIsViewerOpen(false)} variant="default">
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline" className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white h-8 sm:h-9 px-2 sm:px-3">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ResourcesGrid({ resources }: { resources: Resource[] }) {
  if (!resources || resources.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No resources available</h3>
        <p className="text-sm sm:text-base text-gray-600">Resources for this category will be added soon.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  )
}

import { DomainInfo, Resource, Category } from '@/types/domain'

export default function DomainPage() {
  const params = useParams()
  const domain = params.domain as string
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null)
  const [resources, setResources] = useState<{[key: string]: Resource[]}>({})

  useEffect(() => {
    const loadDomainData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchDomainData(domain)
        if (data) {
          setDomainInfo({
            title: data.title,
            description: data.description,
            color: domainColors[domain as keyof typeof domainColors] || "from-[#007A33] to-[#006400]",
            hasSubcategories: data.hasSubcategories,
            categories: data.categories
          })

          // Pre-fetch documents for the first category
          if (data.categories && data.categories.length > 0) {
            const firstCategory = data.categories[0]
            const documents = await fetchDocuments(firstCategory.name)
            setResources(prev => ({ ...prev, [firstCategory.name]: documents }))
          }
        }
      } catch (error) {
        console.error('Error loading domain data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDomainData()
  }, [domain])

  const [activeMainTab, setActiveMainTab] = useState("")
  const [activeSubTab, setActiveSubTab] = useState("")

  // Initialize active tabs when domain info is loaded
  useEffect(() => {
    if (domainInfo) {
      setActiveMainTab("all")
      setActiveSubTab("all")
    }
  }, [domainInfo])

  // Load resources when active tab changes
  useEffect(() => {
    const loadResources = async () => {
      if (!activeMainTab || !domainInfo) return

      try {
        // Load resources based on the active tab
        const documents = await fetchDocuments(activeMainTab, domainInfo.title)
        setResources(prev => ({ ...prev, [activeMainTab]: documents }))

        // If this is a category with subcategories, load resources for each subcategory
        const category = domainInfo.categories.find(cat => cat.name === activeMainTab)
        if (category && category.subcategories) {
          for (const subcategory of category.subcategories) {
            const subDocs = await fetchDocuments(subcategory.name, domainInfo.title)
            setResources(prev => ({ ...prev, [subcategory.name]: subDocs }))
          }
        }
      } catch (error) {
        console.error('Error loading resources:', error)
      }
    }

    loadResources()
  }, [activeMainTab, domainInfo])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle main tab change
  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value)
    scrollToTop()
  }

  // Handle sub tab change
  const handleSubTabChange = (value: string) => {
    setActiveSubTab(value)
    scrollToTop()
  }

  if (isLoading) {
    return <KALROLoadingSpinner />
  }

  if (!domainInfo) {
    return <div>Domain not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${domainInfo.color} text-white py-12 sm:py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{domainInfo.title}</h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8">{domainInfo.description}</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 max-w-2xl mx-auto">
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 sm:h-12 border-gray-200 text-sm sm:text-base"
                  />
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-10 sm:h-12 border-gray-200 text-sm sm:text-base">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="pamphlet">Pamphlet</SelectItem>
                    <SelectItem value="brochure">Brochure</SelectItem>
                    <SelectItem value="leaflet">Leaflet</SelectItem>
                    <SelectItem value="factsheet">Factsheet</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="youtube">Youtube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full mt-3 sm:mt-4" variant="default">
                <Search className="mr-2 h-4 w-4" />
                Search Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Tabs */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={domainInfo?.categories?.[0]?.name} value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
            <TabsList className="w-full flex-wrap gap-2">
              <TabsTrigger 
                key="all" 
                value="all"
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white"
              >
                All Documents
              </TabsTrigger>
              {domainInfo?.categories?.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name}
                  className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white"
                >
                  {category.displayName}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent key="all" value="all" className="space-y-8">
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#007A33] mb-2">
                    All Documents
                  </h2>
                  <p className="text-gray-600">
                    Explore all resources and guides in {domainInfo.title}
                  </p>
                </div>
                <ResourcesGrid resources={Object.values(resources).flat()} />
              </div>
            </TabsContent>

            {domainInfo?.categories?.map((category) => (
              <TabsContent key={category.name} value={category.name} className="space-y-8">
                {domainInfo.hasSubcategories && category.subcategories ? (
                  // Domain with subcategories
                  <Tabs defaultValue="all" value={activeSubTab} onValueChange={handleSubTabChange} className="w-full">
                    <TabsList className="w-full flex-wrap gap-2">
                      <TabsTrigger 
                        key="all" 
                        value="all"
                        className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white"
                      >
                        All {category.displayName}
                      </TabsTrigger>
                      {category.subcategories.map((subcategory) => (
                        <TabsTrigger 
                          key={subcategory.name} 
                          value={subcategory.name}
                          className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white"
                        >
                          {subcategory.displayName}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {category.subcategories.map((subcategory) => (
                      <TabsContent key={subcategory.name} value={subcategory.name}>
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-[#007A33] mb-2">
                            {subcategory.displayName}
                          </h2>
                          <p className="text-gray-600">
                            Explore our collection of {subcategory.displayName.toLowerCase()} resources and guides
                          </p>
                        </div>
                        <ResourcesGrid resources={resources[subcategory.name] || []} />
                      </TabsContent>
                    ))}
                  </Tabs>
                ) : (
                  // Other domains without subcategories
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-[#007A33] mb-2">
                        {category.displayName}
                      </h2>
                      <p className="text-gray-600">
                        Explore our collection of {category.displayName.toLowerCase()} resources and guides
                      </p>
                    </div>
                    <ResourcesGrid resources={resources[category.name] || []} />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  )
}