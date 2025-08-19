"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Bookmark, Clock, Download, Eye, Search, Filter, Trash2, Share2, Calendar, User } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

interface BookmarkedItem {
  id: string
  title: string
  description: string
  type: string
  author: string
  date: string
  downloads: number
  image: string
  bookmarkedAt: string
  category: 'bookmark' | 'favorite' | 'recent'
  domain: string
  rating: number
}

const bookmarkedItems: BookmarkedItem[] = [
  {
    id: '1',
    title: 'Climate-Smart Maize Production Guide',
    description: 'Comprehensive guide on sustainable maize farming practices adapted to climate change',
    type: 'Manual',
    author: 'Dr. Jane Wanjiku',
    date: '2024-01-15',
    downloads: 2450,
    image: '/placeholder.svg?height=200&width=300&text=Maize+Production',
    bookmarkedAt: '2024-01-20',
    category: 'bookmark',
    domain: 'Crops',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Dairy Cattle Management Best Practices',
    description: 'Essential practices for improving dairy cattle productivity and health',
    type: 'Brochure',
    author: 'Prof. Samuel Kiprotich',
    date: '2024-01-10',
    downloads: 1890,
    image: '/placeholder.svg?height=200&width=300&text=Dairy+Cattle',
    bookmarkedAt: '2024-01-19',
    category: 'favorite',
    domain: 'Livestock',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Water Harvesting Techniques for Small-Scale Farmers',
    description: 'Practical water conservation and harvesting methods for sustainable agriculture',
    type: 'Pamphlet',
    author: 'Dr. Mary Njoroge',
    date: '2024-01-08',
    downloads: 1650,
    image: '/placeholder.svg?height=200&width=300&text=Water+Harvesting',
    bookmarkedAt: '2024-01-18',
    category: 'recent',
    domain: 'Natural Resources',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Poultry Disease Prevention Guide',
    description: 'Comprehensive guide to preventing common poultry diseases',
    type: 'Manual',
    author: 'Dr. Sarah Kimani',
    date: '2024-01-05',
    downloads: 1750,
    image: '/placeholder.svg?height=200&width=300&text=Poultry+Health',
    bookmarkedAt: '2024-01-17',
    category: 'bookmark',
    domain: 'Livestock',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Agricultural Value Chain Development',
    description: 'Strategies for developing efficient agricultural value chains',
    type: 'Manual',
    author: 'Dr. James Ochieng',
    date: '2024-01-11',
    downloads: 980,
    image: '/placeholder.svg?height=200&width=300&text=Value+Chains',
    bookmarkedAt: '2024-01-16',
    category: 'favorite',
    domain: 'Socio-Economics',
    rating: 4.5
  }
]

function BookmarkCard({ item, onRemove, index }: { item: BookmarkedItem; onRemove: (id: string) => void; index: number }) {
  const [isRemoving, setIsRemoving] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'favorite': return <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
      case 'bookmark': return <Bookmark className="h-4 w-4 text-[#007A33] fill-current" />
      case 'recent': return <Clock className="h-4 w-4 text-blue-500" />
      default: return <Bookmark className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'favorite': return 'bg-red-100 text-red-800'
      case 'bookmark': return 'bg-[#007A33]/10 text-[#007A33]'
      case 'recent': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(item.id)
    }, 300)
  }

  return (
    <Card 
      className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] animate-in fade-in-0 duration-700 slide-in-from-bottom-8 ${
        isRemoving ? 'animate-out fade-out-0 duration-300 slide-out-to-right-full scale-95' : ''
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gray-400/20 group-hover:bg-gray-400/10 transition-all duration-500" />
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 transform transition-all duration-300 group-hover:scale-110">
          {getCategoryIcon(item.category)}
        </div>
        <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 text-gray-800 text-xs transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
          {item.type}
        </Badge>
        <Badge className={`absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-xs transform transition-all duration-300 group-hover:scale-105 ${getCategoryColor(item.category)}`}>
          {item.domain}
        </Badge>
      </div>
      
      <CardHeader className="p-3 sm:p-6 transform transition-all duration-300 group-hover:translate-y-[-2px]">
        <CardTitle className="text-base sm:text-lg font-bold text-[#007A33] group-hover:text-[#006400] transition-all duration-300 line-clamp-2 group-hover:scale-[1.02]">
          {item.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm transition-colors duration-300 group-hover:text-gray-700">
          {item.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-1 min-w-0 group-hover:text-[#007A33] transition-colors duration-300">
              <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="truncate">{item.author}</span>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden sm:inline">{new Date(item.date).toLocaleDateString()}</span>
              <span className="sm:hidden">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-1 group-hover:text-[#007A33] transition-colors duration-300">
              <Download className="h-3 w-3 sm:h-4 sm:w-4 text-[#007A33] transition-all duration-300 group-hover:text-[#006400] group-hover:scale-110" />
              <span className="hidden sm:inline">{item.downloads.toLocaleString()} downloads</span>
              <span className="sm:hidden">{item.downloads > 1000 ? `${Math.round(item.downloads/1000)}k` : item.downloads}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 transition-transform duration-300 group-hover:scale-125">★</span>
              <span className="transition-colors duration-300 group-hover:text-[#007A33]">{item.rating}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
            Saved on {new Date(item.bookmarkedAt).toLocaleDateString()}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-[#007A33] hover:bg-[#006400] text-xs sm:text-sm h-8 sm:h-9 transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
              View
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white h-8 sm:h-9 px-2 sm:px-3 transition-all duration-300 hover:scale-110 hover:rotate-3"
            >
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 h-8 sm:h-9 px-2 sm:px-3 transition-all duration-300 hover:scale-110 hover:rotate-12"
              onClick={handleRemove}
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function BookmarksFavorites() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterDomain, setFilterDomain] = useState('')
  const [items, setItems] = useState(bookmarkedItems)

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const getFilteredItems = (category: 'bookmark' | 'favorite' | 'recent') => {
    let filtered = items.filter(item => {
      if (category === 'recent') {
        return true
      }
      return item.category === category
    })

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filterDomain) {
      filtered = filtered.filter(item => item.domain === filterDomain)
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime())
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        filtered.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
    }

    return filtered
  }

  const bookmarks = getFilteredItems('bookmark')
  const favorites = getFilteredItems('favorite')
  const recent = getFilteredItems('recent').slice(0, 10)

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-4">
      <div className="flex justify-between items-center animate-in fade-in-0 duration-500 slide-in-from-left-8">
        <div>
          <h2 className="text-2xl font-bold text-[#007A33] animate-in fade-in-0 duration-700 slide-in-from-left-6">My Library</h2>
          <p className="text-gray-600 animate-in fade-in-0 duration-900 slide-in-from-left-8">Your saved documents and recently viewed content</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card className="animate-in fade-in-0 duration-500 slide-in-from-right-8 transform transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-all duration-300 group-focus-within:text-[#007A33] group-focus-within:scale-110" />
              <Input
                placeholder="Search your saved items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 sm:h-10 text-sm transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm sm:w-48 transition-all duration-300 hover:border-[#007A33] focus:scale-[1.02]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Saved</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm sm:w-48 transition-all duration-300 hover:border-[#007A33] focus:scale-[1.02]">
                  <SelectValue placeholder="Filter by domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Domains</SelectItem>
                  <SelectItem value="Crops">Crops</SelectItem>
                  <SelectItem value="Livestock">Livestock</SelectItem>
                  <SelectItem value="Natural Resources">Natural Resources</SelectItem>
                  <SelectItem value="Socio-Economics">Socio-Economics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different categories */}
      <Tabs defaultValue="bookmarks" className="w-full animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          {[
            { value: 'bookmarks', icon: Bookmark, label: 'Bookmarks', count: bookmarks.length, color: 'text-[#007A33]' },
            { value: 'favorites', icon: Heart, label: 'Favorites', count: favorites.length, color: 'text-red-500' },
            { value: 'recent', icon: Clock, label: 'Recent', count: recent.length, color: 'text-blue-500' }
          ].map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 hover:scale-105 animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <tab.icon className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 ${tab.color} transition-transform duration-300 hover:scale-110`} />
              <span className="hidden sm:inline">{tab.label} </span>({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>

        {['bookmarks', 'favorites', 'recent'].map((tabValue) => {
          const tabData = tabValue === 'bookmarks' ? bookmarks : tabValue === 'favorites' ? favorites : recent
          const emptyIcon = tabValue === 'bookmarks' ? Bookmark : tabValue === 'favorites' ? Heart : Clock
          const EmptyIcon = emptyIcon

          return (
            <TabsContent key={tabValue} value={tabValue} className="space-y-6">
              {tabData.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {tabData.map((item, index) => (
                    <BookmarkCard key={item.id} item={item} onRemove={handleRemoveItem} index={index} />
                  ))}
                </div>
              ) : (
                <Card className="animate-in fade-in-0 duration-500 slide-in-from-bottom-8">
                  <CardContent className="text-center py-12">
                    <EmptyIcon className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2 animate-in fade-in-0 duration-700 slide-in-from-bottom-4">
                      No {tabValue} yet
                    </h3>
                    <p className="text-gray-600 mb-4 animate-in fade-in-0 duration-900 slide-in-from-bottom-6">
                      {tabValue === 'bookmarks' 
                        ? 'Start bookmarking documents to access them quickly later'
                        : tabValue === 'favorites'
                        ? 'Mark documents as favorites to keep track of your most valuable resources'
                        : 'Your recently viewed documents will appear here'
                      }
                    </p>
                    <Button className="bg-[#007A33] hover:bg-[#006400] transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in fade-in-0 duration-1000 slide-in-from-bottom-8">
                      Browse Documents
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
