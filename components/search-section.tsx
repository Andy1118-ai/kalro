"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';
import { useState } from "react";
import { useRouter } from 'next/navigation'

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const router = useRouter()

  return (
    <section className="py-12 bg-[#F4F1E1]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto"> {/* Increased the max-width of the container for more space */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#007A33] mb-2">Find Agricultural Resources</h2>
            <p className="text-gray-600">Search through thousands of research publications and guides</p>
          </div>
          
          {/* Main container with glassmorphism effect */}
          <div className="bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg p-6">
            <div className="flex flex-row items-center gap-4 flex-wrap"> {/* Flex row for single row layout */}
              <div className="flex-1 min-w-[300px]"> {/* Increased minimum width for search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search for crops, livestock, techniques..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 w-full border-gray-200 focus:border-[#007A33] focus:ring-[#007A33]"
                  />
                </div>
              </div>
              
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="h-12 w-[150px] border-gray-200">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crops">Crops</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                  <SelectItem value="natural-resources">Natural Resources</SelectItem>
                  <SelectItem value="socio-economics">Socio-Economics</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12 w-[150px] border-gray-200">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="pamphlet">Pamphlet</SelectItem>
                  <SelectItem value="brochure">Brochure</SelectItem>
                  <SelectItem value="leaflet">Leaflet</SelectItem>
                  <SelectItem value="factsheet">Factsheet</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white h-12">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
              
              <Button
                className="bg-[#007A33] hover:bg-[#006400] text-white px-8 h-12"
                onClick={() => {
                  const params = new URLSearchParams()
                  if (searchQuery) params.set('search', searchQuery)
                  if (selectedType) params.set('type', selectedType)
                  // Send to the appropriate domain page if chosen, else default to crops listing
                  const domainPath = selectedDomain ? `/domains/${selectedDomain}` : '/domains/crops'
                  router.push(`${domainPath}?${params.toString()}`)
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}