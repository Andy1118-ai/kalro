"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitBranch, Clock, User, FileText, Download, Eye, AlertCircle, CheckCircle, Edit, Plus } from 'lucide-react'
import { useState } from "react"

interface DocumentVersion {
  id: string
  version: string
  title: string
  author: string
  date: string
  status: 'draft' | 'review' | 'published' | 'archived'
  changes: string[]
  fileSize: string
  downloadCount: number
  isCurrentVersion: boolean
  reviewers?: string[]
  comments?: number
}

interface ChangelogEntry {
  id: string
  version: string
  date: string
  author: string
  type: 'major' | 'minor' | 'patch'
  changes: {
    type: 'added' | 'modified' | 'removed' | 'fixed'
    description: string
  }[]
}

const documentVersions: DocumentVersion[] = [
  {
    id: '1',
    version: '3.2',
    title: 'Climate-Smart Maize Production Guide',
    author: 'Dr. Jane Wanjiku',
    date: '2024-01-15',
    status: 'published',
    changes: [
      'Updated pest management section',
      'Added new climate adaptation strategies',
      'Revised fertilizer recommendations'
    ],
    fileSize: '2.4 MB',
    downloadCount: 2450,
    isCurrentVersion: true,
    reviewers: ['Prof. Samuel Kiprotich', 'Dr. Mary Njoroge'],
    comments: 3
  },
  {
    id: '2',
    version: '3.1',
    title: 'Climate-Smart Maize Production Guide',
    author: 'Dr. Jane Wanjiku',
    date: '2024-01-10',
    status: 'archived',
    changes: [
      'Minor corrections in chapter 4',
      'Updated references section',
      'Fixed formatting issues'
    ],
    fileSize: '2.3 MB',
    downloadCount: 1890,
    isCurrentVersion: false,
    reviewers: ['Prof. Samuel Kiprotich'],
    comments: 1
  },
  {
    id: '3',
    version: '3.0',
    title: 'Climate-Smart Maize Production Guide',
    author: 'Dr. Jane Wanjiku',
    date: '2024-01-05',
    status: 'archived',
    changes: [
      'Complete restructure of content',
      'Added new chapters on climate resilience',
      'Updated all illustrations and diagrams'
    ],
    fileSize: '2.1 MB',
    downloadCount: 1650,
    isCurrentVersion: false,
    reviewers: ['Prof. Samuel Kiprotich', 'Dr. Mary Njoroge', 'Dr. Peter Mwangi'],
    comments: 8
  },
  {
    id: '4',
    version: '2.5-draft',
    title: 'Climate-Smart Maize Production Guide',
    author: 'Dr. Jane Wanjiku',
    date: '2024-01-20',
    status: 'draft',
    changes: [
      'Working on new section about drought-resistant varieties',
      'Updating economic analysis chapter',
      'Adding case studies from recent field trials'
    ],
    fileSize: '2.5 MB',
    downloadCount: 0,
    isCurrentVersion: false,
    reviewers: [],
    comments: 0
  }
]

const changelog: ChangelogEntry[] = [
  {
    id: '1',
    version: '3.2',
    date: '2024-01-15',
    author: 'Dr. Jane Wanjiku',
    type: 'minor',
    changes: [
      { type: 'added', description: 'New section on integrated pest management using biological controls' },
      { type: 'modified', description: 'Updated fertilizer application rates based on recent soil studies' },
      { type: 'added', description: 'Climate adaptation strategies for different agro-ecological zones' },
      { type: 'fixed', description: 'Corrected calculation errors in yield estimation tables' }
    ]
  },
  {
    id: '2',
    version: '3.1',
    date: '2024-01-10',
    author: 'Dr. Jane Wanjiku',
    type: 'patch',
    changes: [
      { type: 'fixed', description: 'Corrected typos and grammatical errors in chapter 4' },
      { type: 'modified', description: 'Updated references to include latest research publications' },
      { type: 'fixed', description: 'Resolved formatting inconsistencies in tables and figures' }
    ]
  },
  {
    id: '3',
    version: '3.0',
    date: '2024-01-05',
    author: 'Dr. Jane Wanjiku',
    type: 'major',
    changes: [
      { type: 'added', description: 'New chapter on climate-smart agriculture principles' },
      { type: 'added', description: 'Comprehensive section on water management techniques' },
      { type: 'modified', description: 'Restructured entire document for better flow and readability' },
      { type: 'added', description: 'Interactive diagrams and updated illustrations' },
      { type: 'removed', description: 'Outdated sections on conventional farming practices' }
    ]
  }
]

function VersionCard({ version, index }: { version: DocumentVersion; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />
      case 'review': return <AlertCircle className="h-4 w-4" />
      case 'draft': return <Edit className="h-4 w-4" />
      case 'archived': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card 
      className={`transform transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] animate-in fade-in-0 duration-500 slide-in-from-bottom-8 ${
        version.isCurrentVersion ? 'ring-2 ring-[#007A33] bg-[#007A33]/5 shadow-lg' : ''
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <CardHeader className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <span className="text-[#007A33] text-base sm:text-lg transition-all duration-300 hover:scale-105">
                Version {version.version}
              </span>
              {version.isCurrentVersion && (
                <Badge className="bg-[#007A33] text-white text-xs w-fit animate-pulse">Current</Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm">
                <div className="flex items-center space-x-1 group-hover:text-[#007A33] transition-colors duration-300">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
                  <span className="truncate">{version.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
                  <span>{new Date(version.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(version.status)} text-xs flex-shrink-0 transition-all duration-300 hover:scale-105`}>
            {getStatusIcon(version.status)}
            <span className="ml-1 capitalize">{version.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
        <div className={`transition-all duration-500 ${isExpanded ? 'max-h-96' : 'max-h-24'} overflow-hidden`}>
          <h4 className="font-medium text-xs sm:text-sm text-gray-900 mb-2">Changes in this version:</h4>
          <ul className="space-y-1">
            {version.changes.map((change, changeIndex) => (
              <li 
                key={changeIndex} 
                className="text-xs sm:text-sm text-gray-600 flex items-start space-x-2 animate-in fade-in-0 duration-300 slide-in-from-left-4"
                style={{ animationDelay: `${changeIndex * 100}ms` }}
              >
                <span className="text-[#007A33] mt-1 flex-shrink-0 transition-transform duration-300 hover:scale-125">•</span>
                <span className="min-w-0">{change}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="transition-opacity duration-300" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="transition-colors duration-300 hover:text-[#007A33]">Size: {version.fileSize}</span>
            <span className="transition-colors duration-300 hover:text-[#007A33]">Downloads: {version.downloadCount.toLocaleString()}</span>
            {version.comments && version.comments > 0 && (
              <span className="transition-colors duration-300 hover:text-[#007A33]">Comments: {version.comments}</span>
            )}
          </div>
        </div>

        {version.reviewers && version.reviewers.length > 0 && (
          <div className="animate-in fade-in-0 duration-500 slide-in-from-bottom-4">
            <h5 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Reviewers:</h5>
            <div className="flex flex-wrap items-center gap-2">
              {version.reviewers.map((reviewer, reviewerIndex) => (
                <div 
                  key={reviewerIndex} 
                  className="flex items-center space-x-1 animate-in fade-in-0 duration-300 slide-in-from-right-4"
                  style={{ animationDelay: `${reviewerIndex * 100}ms` }}
                >
                  <Avatar className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 hover:scale-110">
                    <AvatarFallback className="bg-[#007A33] text-white text-xs">
                      {reviewer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600 hidden sm:inline">{reviewer}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
            className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white h-8 sm:h-9 px-2 sm:px-3 transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            <Download className="h-3 w-3 sm:h-4 sm:w-4 text-[#007A33] transition-transform duration-300 hover:scale-125" />
          </Button>
          {version.status === 'draft' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="border-blue-500 text-blue-600 hover:bg-blue-50 h-8 sm:h-9 px-2 sm:px-3 transition-all duration-300 hover:scale-110 hover:-rotate-6"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ChangelogItem({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800'
      case 'minor': return 'bg-yellow-100 text-yellow-800'
      case 'patch': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'added': return 'text-green-600'
      case 'modified': return 'text-yellow-600'
      case 'removed': return 'text-red-600'
      case 'fixed': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return '+'
      case 'modified': return '~'
      case 'removed': return '-'
      case 'fixed': return '✓'
      default: return '•'
    }
  }

  return (
    <Card 
      className="transform transition-all duration-500 hover:shadow-lg hover:scale-[1.01] animate-in fade-in-0 duration-700 slide-in-from-left-8"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#007A33] transition-colors duration-300 hover:text-[#006400]">Version {entry.version}</CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-4 text-sm mt-1">
                <div className="flex items-center space-x-1 transition-colors duration-300 hover:text-[#007A33]">
                  <User className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span>{entry.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardDescription>
          </div>
          <Badge className={`${getTypeColor(entry.type)} transition-all duration-300 hover:scale-105`}>
            {entry.type.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {entry.changes.map((change, changeIndex) => (
            <div 
              key={changeIndex} 
              className="flex items-start space-x-3 animate-in fade-in-0 duration-300 slide-in-from-left-4"
              style={{ animationDelay: `${changeIndex * 100}ms` }}
            >
              <span className={`font-mono text-sm font-bold ${getChangeTypeColor(change.type)} mt-0.5 transition-all duration-300 hover:scale-125`}>
                {getChangeTypeIcon(change.type)}
              </span>
              <div>
                <span className={`text-xs font-medium uppercase tracking-wide ${getChangeTypeColor(change.type)} transition-colors duration-300`}>
                  {change.type}
                </span>
                <p className="text-sm text-gray-700 mt-1 transition-colors duration-300 hover:text-gray-900">{change.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function VersionControl() {
  const [selectedDocument, setSelectedDocument] = useState('climate-smart-maize')

  const publishedVersions = documentVersions.filter(v => v.status === 'published' || v.status === 'archived')
  const draftVersions = documentVersions.filter(v => v.status === 'draft' || v.status === 'review')

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 animate-in fade-in-0 duration-500 slide-in-from-left-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#007A33] animate-in fade-in-0 duration-700 slide-in-from-left-6">Version Control</h2>
          <p className="text-sm sm:text-base text-gray-600 animate-in fade-in-0 duration-900 slide-in-from-left-8">Track document versions, changes, and revision history</p>
        </div>
        <Button className="bg-[#007A33] hover:bg-[#006400] w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in fade-in-0 duration-500 slide-in-from-right-8">
          <Plus className="mr-2 h-4 w-4 transition-transform duration-300 hover:rotate-90" />
          Create New Version
        </Button>
      </div>

      <Tabs defaultValue="versions" className="w-full animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          {[
            { value: 'versions', icon: GitBranch, label: 'All Versions', color: 'text-[#007A33]' },
            { value: 'drafts', icon: Edit, label: 'Drafts & Review', color: 'text-blue-600' },
            { value: 'changelog', icon: FileText, label: 'Changelog', color: 'text-purple-600' }
          ].map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 hover:scale-105 animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <tab.icon className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 ${tab.color} transition-transform duration-300 hover:scale-110`} />
              <span className="hidden sm:inline">{tab.label.split(' ')[0]} </span>{tab.label.includes('&') ? tab.label.split(' ').slice(-1) : tab.label.split(' ').slice(-1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="versions" className="space-y-6">
          <Card className="animate-in fade-in-0 duration-500 slide-in-from-top-8">
            <CardHeader>
              <CardTitle className="text-[#007A33]">Published Versions</CardTitle>
              <CardDescription>All published and archived versions of the document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
                {publishedVersions.map((version, index) => (
                  <VersionCard key={version.id} version={version} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <Card className="animate-in fade-in-0 duration-500 slide-in-from-top-8">
            <CardHeader>
              <CardTitle className="text-[#007A33]">Work in Progress</CardTitle>
              <CardDescription>Draft versions and documents under review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {draftVersions.map((version, index) => (
                  <VersionCard key={version.id} version={version} index={index} />
                ))}
              </div>
              {draftVersions.length === 0 && (
                <div className="text-center py-8 animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
                  <Edit className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts in progress</h3>
                  <p className="text-gray-600 mb-4">Start working on a new version of this document</p>
                  <Button className="bg-[#007A33] hover:bg-[#006400] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Draft
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changelog" className="space-y-6">
          <Card className="animate-in fade-in-0 duration-500 slide-in-from-top-8">
            <CardHeader>
              <CardTitle className="text-[#007A33]">Document Changelog</CardTitle>
              <CardDescription>Detailed history of all changes made to this document</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {changelog.map((entry, index) => (
                    <ChangelogItem key={entry.id} entry={entry} index={index} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
