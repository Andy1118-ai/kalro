"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Shield, MessageCircle, AlertTriangle, CheckCircle, Flag, ThumbsUp, ThumbsDown, Eye, Calendar, User } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

interface QualityDocument {
  id: string
  title: string
  author: string
  date: string
  rating: number
  totalRatings: number
  verified: boolean
  expertBadges: string[]
  plagiarismScore: number
  qualityScore: number
  feedback: {
    positive: number
    negative: number
    comments: number
  }
  image: string
  category: string
  type: string
  downloads: number
}

interface Review {
  id: string
  reviewer: string
  role: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
}

interface ExpertBadge {
  id: string
  name: string
  description: string
  color: string
  icon: string
  criteria: string
}

const qualityDocuments: QualityDocument[] = [
  {
    id: '1',
    title: 'Climate-Smart Maize Production Guide',
    author: 'Dr. Jane Wanjiku',
    date: '2024-01-15',
    rating: 4.8,
    totalRatings: 156,
    verified: true,
    expertBadges: ['peer-reviewed', 'field-tested', 'award-winning'],
    plagiarismScore: 98,
    qualityScore: 95,
    feedback: { positive: 142, negative: 8, comments: 23 },
    image: '/placeholder.svg?height=200&width=300&text=Maize+Production',
    category: 'Crops',
    type: 'Manual',
    downloads: 2450
  },
  {
    id: '2',
    title: 'Dairy Cattle Management Best Practices',
    author: 'Prof. Samuel Kiprotich',
    date: '2024-01-10',
    rating: 4.9,
    totalRatings: 203,
    verified: true,
    expertBadges: ['peer-reviewed', 'industry-standard'],
    plagiarismScore: 96,
    qualityScore: 92,
    feedback: { positive: 189, negative: 12, comments: 31 },
    image: '/placeholder.svg?height=200&width=300&text=Dairy+Cattle',
    category: 'Livestock',
    type: 'Brochure',
    downloads: 1890
  },
  {
    id: '3',
    title: 'Water Harvesting Techniques',
    author: 'Dr. Mary Njoroge',
    date: '2024-01-08',
    rating: 4.7,
    totalRatings: 89,
    verified: false,
    expertBadges: ['field-tested'],
    plagiarismScore: 94,
    qualityScore: 88,
    feedback: { positive: 76, negative: 5, comments: 18 },
    image: '/placeholder.svg?height=200&width=300&text=Water+Harvesting',
    category: 'Natural Resources',
    type: 'Pamphlet',
    downloads: 1650
  }
]

const expertBadges: ExpertBadge[] = [
  {
    id: 'peer-reviewed',
    name: 'Peer Reviewed',
    description: 'Reviewed and approved by subject matter experts',
    color: 'bg-blue-100 text-blue-800',
    icon: '🔬',
    criteria: 'Minimum 3 expert reviews with average score ≥ 4.5'
  },
  {
    id: 'field-tested',
    name: 'Field Tested',
    description: 'Validated through practical field implementation',
    color: 'bg-green-100 text-green-800',
    icon: '🌾',
    criteria: 'Tested in at least 5 different field conditions'
  },
  {
    id: 'award-winning',
    name: 'Award Winning',
    description: 'Recognized with agricultural excellence awards',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🏆',
    criteria: 'Received national or international agricultural awards'
  },
  {
    id: 'industry-standard',
    name: 'Industry Standard',
    description: 'Adopted as standard practice by agricultural institutions',
    color: 'bg-purple-100 text-purple-800',
    icon: '⭐',
    criteria: 'Adopted by 10+ agricultural institutions'
  }
]

const reviews: Review[] = [
  {
    id: '1',
    reviewer: 'Dr. Peter Mwangi',
    role: 'Agricultural Extension Officer',
    rating: 5,
    date: '2024-01-20',
    comment: 'Excellent comprehensive guide. The climate adaptation strategies are particularly well-researched and practical for smallholder farmers.',
    helpful: 23,
    verified: true
  },
  {
    id: '2',
    reviewer: 'Sarah Kimani',
    role: 'Farmer',
    rating: 4,
    date: '2024-01-18',
    comment: 'Very helpful resource. Applied the pest management techniques and saw significant improvement in my maize yield.',
    helpful: 18,
    verified: false
  },
  {
    id: '3',
    reviewer: 'Prof. Grace Wanjala',
    role: 'Soil Scientist',
    rating: 5,
    date: '2024-01-16',
    comment: 'The soil health section is outstanding. Well-referenced and includes latest research findings.',
    helpful: 31,
    verified: true
  }
]

function QualityCard({ document, index }: { document: QualityDocument; index: number }) {
  const [showReviews, setShowReviews] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getBadgeInfo = (badgeId: string) => {
    return expertBadges.find(badge => badge.id === badgeId)
  }

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const getPlagiarismColor = (score: number) => {
    if (score >= 95) return 'text-green-600'
    if (score >= 90) return 'text-yellow-600'
    if (score >= 85) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] animate-in fade-in-0 duration-500 slide-in-from-bottom-8"
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={document.image || "/placeholder.svg"}
          alt={document.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gray-400/20 group-hover:bg-gray-400/10 transition-all duration-500" />
        {document.verified && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 transform transition-all duration-300 group-hover:scale-110">
            <Badge className="bg-[#007A33] text-white text-xs animate-pulse">
              <Shield className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          </div>
        )}
        <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 text-gray-800 text-xs transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
          {document.type}
        </Badge>
      </div>
      
      <CardHeader className="p-3 sm:p-6 transform transition-all duration-300 group-hover:translate-y-[-2px]">
        <CardTitle className="text-base sm:text-lg font-bold text-[#007A33] group-hover:text-[#006400] transition-all duration-300 line-clamp-2 group-hover:scale-[1.02]">
          {document.title}
        </CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center space-x-1 min-w-0 group-hover:text-[#007A33] transition-colors duration-300">
            <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span className="truncate">{document.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{new Date(document.date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 hover:scale-125 ${
                    star <= Math.floor(document.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium transition-colors duration-300 group-hover:text-[#007A33]">{document.rating}</span>
            <span className="text-xs sm:text-sm text-gray-600">({document.totalRatings})</span>
          </div>
        </div>

        {/* Expert Badges */}
        <div className="flex flex-wrap gap-1">
          {document.expertBadges.map((badgeId, badgeIndex) => {
            const badge = getBadgeInfo(badgeId)
            return badge ? (
              <Badge 
                key={badgeId} 
                className={`text-xs ${badge.color} transition-all duration-300 hover:scale-110 animate-in fade-in-0 duration-300 slide-in-from-left-4`}
                style={{ animationDelay: `${badgeIndex * 100}ms` }}
              >
                <span className="mr-1 transition-transform duration-300 hover:scale-125">{badge.icon}</span>
                <span className="hidden sm:inline">{badge.name}</span>
              </Badge>
            ) : null
          })}
        </div>

        {/* Quality Metrics */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Quality Score</span>
              <span className={`font-medium ${getQualityColor(document.qualityScore)} transition-colors duration-300`}>
                {document.qualityScore}%
              </span>
            </div>
            <Progress value={document.qualityScore} className="h-1.5 sm:h-2 transition-all duration-500" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Originality</span>
              <span className={`font-medium ${getPlagiarismColor(document.plagiarismScore)} transition-colors duration-300`}>
                {document.plagiarismScore}%
              </span>
            </div>
            <Progress value={document.plagiarismScore} className="h-1.5 sm:h-2 transition-all duration-500" />
          </div>
        </div>

        {/* Feedback Summary */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1 text-green-600 transition-all duration-300 hover:scale-110">
              <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
              <span>{document.feedback.positive}</span>
            </div>
            <div className="flex items-center space-x-1 text-red-600 transition-all duration-300 hover:scale-110">
              <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
              <span>{document.feedback.negative}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600 transition-all duration-300 hover:scale-110 hover:text-[#007A33]">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
              <span>{document.feedback.comments}</span>
            </div>
          </div>
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
            onClick={() => setShowReviews(!showReviews)}
          >
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-orange-600 border-orange-200 hover:bg-orange-50 h-8 sm:h-9 px-2 sm:px-3 transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            <Flag className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
          </Button>
        </div>

        {/* Reviews Section */}
        {showReviews && (
          <div className="border-t pt-3 sm:pt-4 space-y-2 sm:space-y-3 animate-in fade-in-0 duration-500 slide-in-from-bottom-8">
            <h4 className="font-medium text-xs sm:text-sm">Recent Reviews</h4>
            {reviews.slice(0, 2).map((review, reviewIndex) => (
              <div 
                key={review.id} 
                className="p-2 sm:p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] animate-in fade-in-0 duration-300 slide-in-from-left-4"
                style={{ animationDelay: `${reviewIndex * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                      <AvatarFallback className="bg-[#007A33] text-white text-xs">
                        {review.reviewer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs sm:text-sm font-medium truncate transition-colors duration-300 hover:text-[#007A33]">{review.reviewer}</span>
                    {review.verified && (
                      <Shield className="h-3 w-3 text-[#007A33] flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-all duration-300 hover:scale-125 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 mb-2 line-clamp-2 transition-colors duration-300 hover:text-gray-900">{review.comment}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="truncate transition-colors duration-300 hover:text-[#007A33]">{review.role}</span>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="transition-colors duration-300 hover:text-[#007A33]">{review.helpful} helpful</span>
                    <span className="hidden sm:inline">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ExpertBadgeManager() {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-8">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {expertBadges.map((badge, index) => (
          <Card 
            key={badge.id}
            className="transition-all duration-500 hover:shadow-lg hover:scale-[1.02] animate-in fade-in-0 duration-500 slide-in-from-bottom-8"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <span className="text-xl sm:text-2xl transition-transform duration-300 hover:scale-125">{badge.icon}</span>
                <span className="text-[#007A33] transition-colors duration-300 hover:text-[#006400]">{badge.name}</span>
              </CardTitle>
              <CardDescription className="text-sm transition-colors duration-300 hover:text-gray-700">{badge.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-1">Criteria</h4>
                  <p className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 hover:text-gray-800">{badge.criteria}</p>
                </div>
                <Badge className={`${badge.color} text-xs transition-all duration-300 hover:scale-105`}>{badge.name}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PlagiarismChecker() {
  const [checkResults] = useState([
    {
      id: '1',
      document: 'Climate-Smart Maize Production Guide v3.3',
      score: 98,
      status: 'passed',
      issues: 0,
      checkedDate: '2024-01-20'
    },
    {
      id: '2',
      document: 'Dairy Cattle Nutrition Manual',
      score: 85,
      status: 'warning',
      issues: 3,
      checkedDate: '2024-01-19'
    },
    {
      id: '3',
      document: 'Water Harvesting Techniques',
      score: 94,
      status: 'passed',
      issues: 1,
      checkedDate: '2024-01-18'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'failed': return <Flag className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-8">
      <Card className="transition-all duration-500 hover:shadow-lg animate-in fade-in-0 duration-500 slide-in-from-left-8">
        <CardHeader>
          <CardTitle className="text-[#007A33] transition-colors duration-300 hover:text-[#006400]">Plagiarism Detection Results</CardTitle>
          <CardDescription>Automated originality checks for all submitted documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checkResults.map((result, index) => (
              <div 
                key={result.id} 
                className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.01] animate-in fade-in-0 duration-500 slide-in-from-right-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-1">
                  <h4 className="font-medium transition-colors duration-300 hover:text-[#007A33]">{result.document}</h4>
                  <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-800">
                    Checked on {new Date(result.checkedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#007A33] transition-all duration-300 hover:scale-110">{result.score}%</div>
                    <div className="text-xs text-gray-600">Original</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium transition-all duration-300 hover:scale-110">{result.issues}</div>
                    <div className="text-xs text-gray-600">Issues</div>
                  </div>
                  <Badge className={`${getStatusColor(result.status)} transition-all duration-300 hover:scale-105`}>
                    {getStatusIcon(result.status)}
                    <span className="ml-1 capitalize">{result.status}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function QualityAssurance() {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 animate-in fade-in-0 duration-500 slide-in-from-left-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#007A33] animate-in fade-in-0 duration-700 slide-in-from-left-6">Quality Assurance</h2>
          <p className="text-sm sm:text-base text-gray-600 animate-in fade-in-0 duration-900 slide-in-from-left-8">Maintain high standards through reviews, verification, and feedback</p>
        </div>
      </div>

      <Tabs defaultValue="reviews" className="w-full animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          {[
            { value: 'reviews', icon: Star, label: 'Reviews & Ratings', color: 'text-yellow-500' },
            { value: 'badges', icon: Shield, label: 'Expert Badges', color: 'text-blue-600' },
            { value: 'plagiarism', icon: AlertTriangle, label: 'Plagiarism Check', color: 'text-orange-600' },
            { value: 'feedback', icon: MessageCircle, label: 'Feedback System', color: 'text-purple-600' }
          ].map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 hover:scale-105 animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <tab.icon className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 ${tab.color} transition-transform duration-300 hover:scale-110`} />
              <span className="hidden sm:inline">{tab.label.includes('&') ? tab.label.split(' & ')[0] + ' & ' : tab.label.split(' ')[0]} </span>
              {tab.label.includes('&') ? tab.label.split(' & ')[1] : tab.label.split(' ').slice(-1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="reviews" className="space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {qualityDocuments.map((document, index) => (
              <QualityCard key={document.id} document={document} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <ExpertBadgeManager />
        </TabsContent>

        <TabsContent value="plagiarism" className="space-y-6">
          <PlagiarismChecker />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card className="animate-in fade-in-0 duration-700 slide-in-from-bottom-8 transition-all duration-500 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#007A33] transition-colors duration-300 hover:text-[#006400]">Feedback Collection System</CardTitle>
              <CardDescription>Gather and analyze user feedback to improve content quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 animate-in fade-in-0 duration-700 slide-in-from-bottom-4">Feedback System</h3>
                <p className="text-gray-600 animate-in fade-in-0 duration-900 slide-in-from-bottom-6">Advanced feedback collection and analysis tools will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
