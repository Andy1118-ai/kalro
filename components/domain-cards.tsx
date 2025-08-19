"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wheat, MilkIcon as Cow, TreePine, TrendingUp, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const domains = [
  {
    id: "crops",
    title: "Crops",
    description: "Comprehensive crop production guides and research",
    icon: Wheat,
    color: "from-[#007A33] to-[#006400]",
    image: "/maize.jpeg?height=300&width=400",
    categories: ["Cereals", "Legumes", "Fruits", "Vegetables", "Industrial Crops"],
    resourceCount: 1250,
    hoverDescription: "Access detailed guides on crop varieties, planting techniques, pest management, and harvest optimization across cereals, legumes, fruits, vegetables, and industrial crops."
  },
  {
    id: "livestock",
    title: "Livestock",
    description: "Animal husbandry and livestock management resources",
    icon: Cow,
    color: "from-[#8B5E3C] to-[#6B4423]",
    image: "/livestock.jpeg?height=300&width=400",
    categories: ["Cattle", "Poultry", "Goats", "Pigs", "Apiculture"],
    resourceCount: 890,
    hoverDescription: "Explore comprehensive livestock management practices, breeding programs, disease prevention, nutrition guides, and value chain development for various animal species."
  },
  {
    id: "natural-resources",
    title: "Natural Resources",
    description: "Sustainable resource management and conservation",
    icon: TreePine,
    color: "from-[#228B22] to-[#006400]",
    image: "/natural-resources.jpeg?height=300&width=400",
    categories: ["Soil Health", "Water Management", "Agroforestry", "Climate-Smart Agriculture"],
    resourceCount: 650,
    hoverDescription: "Learn about soil conservation, water harvesting, agroforestry practices, climate adaptation strategies, and biodiversity conservation for sustainable agriculture."
  },
  {
    id: "socio-economics",
    title: "Socio-Economics",
    description: "Agricultural economics and social development",
    icon: TrendingUp,
    color: "from-[#FFD700] to-[#FFA500]",
    image: "/agri-tech.jpeg?height=300&width=400",
    categories: ["Agribusiness", "Market Access", "Cooperatives", "Gender & Youth"],
    resourceCount: 420,
    hoverDescription: "Discover market opportunities, value chain development, cooperative formation, gender inclusion strategies, and policy frameworks for agricultural development."
  }
]

export function DomainCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#007A33] mb-4">Knowledge Domains</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of agricultural knowledge across four key domains
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain, index) => {
            const Icon = domain.icon
            return (
              <Link
                key={domain.id}
                href={`/domains/${domain.id}`}
                className="block"
              >
                <Card
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 bg-white text-black animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(domain.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardHeader className="relative">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={domain.image || "/placeholder.svg"}
                      alt={domain.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-${domain.color.split(' ')[1]}/30 group-hover:via-transparent group-hover:to-transparent transition-all duration-500`} />
                    <div className={`absolute top-4 left-4 p-3 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 text-white shadow-lg group-hover:bg-gradient-to-br group-hover:${domain.color} group-hover:border-white/60 group-hover:shadow-xl transition-all duration-300`}>
                      <Icon className="h-6 w-6 drop-shadow-lg transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800 transition-all duration-300 hover:scale-105">
                      {domain.resourceCount} Resources
                    </Badge>
                  </div>
                  
                  <CardTitle className={`text-xl font-bold text-[#007A33] group-hover:bg-gradient-to-r group-hover:${domain.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                    {domain.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 min-h-[3rem] transition-all duration-300">
                    {hoveredCard === domain.id ? domain.hoverDescription : domain.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {domain.categories.slice(0, 3).map((category) => (
                        <Badge 
                          key={category} 
                          className={`text-xs text-white bg-gradient-to-r ${domain.color} hover:opacity-90 transition-opacity duration-200`}
                        >
                          {category}
                        </Badge>
                      ))}
                      {domain.categories.length > 3 && (
                        <Badge 
                          className={`text-xs text-white bg-gradient-to-r ${domain.color} hover:opacity-90 transition-opacity duration-200`}
                        >
                          +{domain.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className={`inline-flex items-center text-[#007A33] group-hover:bg-gradient-to-r group-hover:${domain.color} group-hover:bg-clip-text group-hover:text-transparent font-medium group-hover:translate-x-1 transition-all duration-300`}>
                      Explore {domain.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
