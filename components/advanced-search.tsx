"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Search, Filter, CalendarIcon, X, Clock, Star, Download } from 'lucide-react'
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SearchFilters {
  query: string
  domain: string
  category: string
  type: string
  author: string
  language: string
  dateFrom: Date | undefined
  dateTo: Date | undefined
  fileSizeMin: string
  fileSizeMax: string
  rating: string
  verified: boolean
}

interface SearchSuggestion {
  id: string
  text: string
  type: 'document' | 'author' | 'category' | 'recent'
  count?: number
}

const searchSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'maize production', type: 'document', count: 45 },
  { id: '2', text: 'climate smart agriculture', type: 'document', count: 32 },
  { id: '3', text: 'Dr. Jane Wanjiku', type: 'author', count: 12 },
  { id: '4', text: 'dairy cattle management', type: 'recent', count: 28 },
  { id: '5', text: 'soil health', type: 'category', count: 67 },
  { id: '6', text: 'water harvesting', type: 'document', count: 23 },
]

const recentSearches = [
  'maize pest control',
  'avocado farming',
  'poultry diseases',
  'soil testing methods'
]

const popularSearches = [
  'climate smart agriculture',
  'dairy cattle management',
  'maize production guide',
  'water harvesting techniques',
  'poultry management'
]

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    domain: '',
    category: '',
    type: '',
    author: '',
    language: '',
    dateFrom: undefined,
    dateTo: undefined,
    fileSizeMin: '',
    fileSizeMax: '',
    rating: '',
    verified: false
  })

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  // Simulate search suggestions based on query
  useEffect(() => {
    if (filters.query.length > 0) {
      const filtered = searchSuggestions.filter(s => 
        s.text.toLowerCase().includes(filters.query.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [filters.query])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      domain: '',
      category: '',
      type: '',
      author: '',
      language: '',
      dateFrom: undefined,
      dateTo: undefined,
      fileSizeMin: '',
      fileSizeMax: '',
      rating: '',
      verified: false
    })
  }

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'query') return false
      if (typeof value === 'boolean') return value
      return value !== '' && value !== undefined
    }).length
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent': return <Clock className="h-4 w-4 text-gray-400" />
      case 'author': return <div className="w-4 h-4 rounded-full bg-[#007A33] text-white text-xs flex items-center justify-center">A</div>
      case 'category': return <div className="w-4 h-4 rounded bg-[#8B5E3C] text-white text-xs flex items-center justify-center">#</div>
      default: return <Search className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-4">
      {/* Main Search Bar */}
      <Card className="transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] animate-in fade-in-0 duration-500 slide-in-from-left-8">
        <CardContent className="p-4 sm:p-6">
          <div className="relative">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-focus-within:text-[#007A33] group-focus-within:scale-110" />
              <Input
                placeholder="Search for documents, authors, topics..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="pl-10 pr-12 h-10 sm:h-12 border-gray-200 focus:border-[#007A33] focus:ring-[#007A33] text-sm sm:text-lg transition-all duration-300 focus:shadow-lg"
                onFocus={() => setShowSuggestions(true)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 transition-all duration-300 hover:scale-110 hover:bg-[#007A33]/10"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              >
                <Filter className={`h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 ${isAdvancedOpen ? 'rotate-180 text-[#007A33]' : ''}`} />
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-1 bg-[#007A33] text-white text-xs h-4 w-4 p-0 flex items-center justify-center animate-pulse">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
              <Card className="absolute top-full left-0 right-0 z-50 mt-2 shadow-lg border border-gray-200 max-h-80 overflow-y-auto animate-in fade-in-0 duration-300 slide-in-from-top-2">
                <CardContent className="p-0">
                  {suggestions.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-700">Suggestions</div>
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={suggestion.id}
                          className="flex items-center justify-between px-2 sm:px-3 py-2 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:translate-x-1 hover:shadow-sm"
                          onClick={() => {
                            handleFilterChange('query', suggestion.text)
                            setShowSuggestions(false)
                          }}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 animate-in fade-in-0 duration-300 slide-in-from-left-4">
                            {getSuggestionIcon(suggestion.type)}
                            <span className="text-xs sm:text-sm truncate">{suggestion.text}</span>
                          </div>
                          {suggestion.count && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0 ml-2 animate-in fade-in-0 duration-300 slide-in-from-right-4">
                              {suggestion.count}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {filters.query === '' && (
                    <>
                      <div className="border-b border-gray-100">
                        <div className="p-3 text-sm font-medium text-gray-700">Recent Searches</div>
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:translate-x-1"
                            onClick={() => {
                              handleFilterChange('query', search)
                              setShowSuggestions(false)
                            }}
                            style={{ animationDelay: `${index * 75}ms` }}
                          >
                            <Clock className="h-4 w-4 text-gray-400 animate-in fade-in-0 duration-300" />
                            <span className="text-sm animate-in fade-in-0 duration-300 slide-in-from-left-4">{search}</span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="p-3 text-sm font-medium text-gray-700">Popular Searches</div>
                        {popularSearches.map((search, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:translate-x-1"
                            onClick={() => {
                              handleFilterChange('query', search)
                              setShowSuggestions(false)
                            }}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <Search className="h-4 w-4 text-gray-400 animate-in fade-in-0 duration-300" />
                            <span className="text-sm animate-in fade-in-0 duration-300 slide-in-from-left-4">{search}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
            {[
              { key: 'verified', label: 'Expert Verified', icon: Star },
              { key: 'type', value: 'manual', label: 'Manuals' },
              { key: 'language', value: 'swahili', label: 'Swahili' }
            ].map((filter, index) => (
              <Button
                key={filter.key}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (filter.key === 'verified') {
                    handleFilterChange('verified', !filters.verified)
                  } else {
                    const currentValue = filters[filter.key as keyof SearchFilters]
                    handleFilterChange(filter.key as keyof SearchFilters, currentValue === filter.value ? '' : filter.value)
                  }
                }}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 hover:scale-105 hover:shadow-md animate-in fade-in-0 duration-500 slide-in-from-bottom-4 ${
                  (filter.key === 'verified' && filters.verified) || 
                  (filter.key !== 'verified' && filters[filter.key as keyof SearchFilters] === filter.value)
                    ? 'bg-[#007A33] text-white border-[#007A33] shadow-lg scale-105' 
                    : 'hover:border-[#007A33] hover:text-[#007A33]'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {filter.icon && <filter.icon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
                <span className="hidden sm:inline">{filter.label.includes('Expert') ? 'Expert ' : ''}</span>
                {filter.label.replace('Expert ', '')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <Card className="animate-in fade-in-0 duration-500 slide-in-from-top-8 transform transition-all duration-500 hover:shadow-xl">
          <CardHeader className="animate-in fade-in-0 duration-300 slide-in-from-left-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[#007A33] animate-in fade-in-0 duration-500 slide-in-from-left-6">Advanced Search Filters</CardTitle>
                <CardDescription className="animate-in fade-in-0 duration-700 slide-in-from-left-8">Refine your search with detailed filters</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                size="sm"
                className="transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:border-red-200 hover:text-red-600 animate-in fade-in-0 duration-500 slide-in-from-right-4"
              >
                <X className="mr-2 h-4 w-4 transition-transform duration-300 hover:rotate-90" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: 'domain', label: 'Domain', options: [
                  { value: 'crops', label: 'Crops' },
                  { value: 'livestock', label: 'Livestock' },
                  { value: 'natural-resources', label: 'Natural Resources' },
                  { value: 'socio-economics', label: 'Socio-Economics' }
                ]},
                { key: 'type', label: 'Document Type', options: [
                  { value: 'manual', label: 'Manual' },
                  { value: 'pamphlet', label: 'Pamphlet' },
                  { value: 'brochure', label: 'Brochure' },
                  { value: 'leaflet', label: 'Leaflet' },
                  { value: 'factsheet', label: 'Factsheet' },
                  { value: 'video', label: 'Video' },
                  { value: 'audio', label: 'Audio' }
                ]},
                { key: 'language', label: 'Language', options: [
                  { value: 'english', label: 'English' },
                  { value: 'swahili', label: 'Swahili' },
                  { value: 'kikuyu', label: 'Kikuyu' },
                  { value: 'luo', label: 'Luo' },
                  { value: 'kalenjin', label: 'Kalenjin' }
                ]},
                { key: 'author', label: 'Author', isInput: true },
                { key: 'rating', label: 'Minimum Rating', options: [
                  { value: '5', label: '5 Stars' },
                  { value: '4', label: '4+ Stars' },
                  { value: '3', label: '3+ Stars' },
                  { value: '2', label: '2+ Stars' }
                ]}
              ].map((field, index) => (
                <div 
                  key={field.key} 
                  className="space-y-2 animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Label className="transition-colors duration-300 hover:text-[#007A33]">{field.label}</Label>
                  {field.isInput ? (
                    <Input
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={filters[field.key as keyof SearchFilters] as string}
                      onChange={(e) => handleFilterChange(field.key as keyof SearchFilters, e.target.value)}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    />
                  ) : (
                    <Select 
                      value={filters[field.key as keyof SearchFilters] as string} 
                      onValueChange={(value) => handleFilterChange(field.key as keyof SearchFilters, value)}
                    >
                      <SelectTrigger className="transition-all duration-300 hover:border-[#007A33] focus:scale-[1.02]">
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="transition-colors duration-200 hover:bg-[#007A33]/10"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}

              {/* Verification Filter */}
              <div className="space-y-2 animate-in fade-in-0 duration-500 slide-in-from-bottom-4" style={{ animationDelay: '500ms' }}>
                <Label>Content Verification</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => handleFilterChange('verified', checked)}
                    className="transition-all duration-300 hover:scale-110"
                  />
                  <Label htmlFor="verified" className="text-sm transition-colors duration-300 hover:text-[#007A33] cursor-pointer">Expert Verified Only</Label>
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-3 sm:space-y-4 animate-in fade-in-0 duration-700 slide-in-from-left-8">
              <Label className="text-sm sm:text-base">Publication Date Range</Label>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {['dateFrom', 'dateTo'].map((dateKey, index) => (
                  <div key={dateKey} className="space-y-2">
                    <Label className="text-xs sm:text-sm text-gray-600">{dateKey === 'dateFrom' ? 'From' : 'To'}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                            !filters[dateKey as keyof SearchFilters] && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          {filters[dateKey as keyof SearchFilters] 
                            ? format(filters[dateKey as keyof SearchFilters] as Date, "PPP") 
                            : "Pick a date"
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 animate-in fade-in-0 duration-300 slide-in-from-top-4">
                        <Calendar
                          mode="single"
                          selected={filters[dateKey as keyof SearchFilters] as Date}
                          onSelect={(date: Date | undefined) => handleFilterChange(dateKey as keyof SearchFilters, date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            </div>

            {/* File Size Filter */}
            <div className="space-y-4 animate-in fade-in-0 duration-700 slide-in-from-right-8">
              <Label>File Size (MB)</Label>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { key: 'fileSizeMin', label: 'Minimum', placeholder: '0' },
                  { key: 'fileSizeMax', label: 'Maximum', placeholder: '100' }
                ].map((field, index) => (
                  <div key={field.key} className="space-y-2">
                    <Label className="text-sm text-gray-600">{field.label}</Label>
                    <Input
                      type="number"
                      placeholder={field.placeholder}
                      value={filters[field.key as keyof SearchFilters] as string}
                      onChange={(e) => handleFilterChange(field.key as keyof SearchFilters, e.target.value)}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t animate-in fade-in-0 duration-500 slide-in-from-bottom-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAdvancedOpen(false)}
                className="transition-all duration-300 hover:scale-105"
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#007A33] hover:bg-[#006400] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Search className="mr-2 h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
