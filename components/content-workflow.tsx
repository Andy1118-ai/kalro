"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, CheckCircle, AlertCircle, XCircle, Eye, MessageCircle, Send, ArrowRight, User, Calendar } from 'lucide-react'
import { useState } from "react"

interface WorkflowDocument {
  id: string
  title: string
  author: string
  submittedDate: string
  currentStage: 'draft' | 'submitted' | 'review' | 'revision' | 'approved' | 'published' | 'rejected'
  reviewers: {
    name: string
    role: string
    status: 'pending' | 'approved' | 'rejected' | 'revision'
    comments?: string
    reviewDate?: string
  }[]
  progress: number
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
  version: string
}

interface WorkflowComment {
  id: string
  author: string
  role: string
  date: string
  comment: string
  type: 'general' | 'revision' | 'approval' | 'rejection'
}

const workflowDocuments: WorkflowDocument[] = [
  {
    id: '1',
    title: 'Climate-Smart Maize Production Guide v3.3',
    author: 'Dr. Jane Wanjiku',
    submittedDate: '2024-01-20',
    currentStage: 'review',
    reviewers: [
      { name: 'Prof. Samuel Kiprotich', role: 'Senior Reviewer', status: 'approved', reviewDate: '2024-01-22', comments: 'Excellent work on the pest management section' },
      { name: 'Dr. Mary Njoroge', role: 'Technical Reviewer', status: 'pending' },
      { name: 'Dr. Peter Mwangi', role: 'Editorial Reviewer', status: 'revision', comments: 'Minor formatting issues need attention' }
    ],
    progress: 65,
    priority: 'high',
    dueDate: '2024-01-25',
    category: 'Crops',
    version: '3.3'
  },
  {
    id: '2',
    title: 'Dairy Cattle Nutrition Manual',
    author: 'Prof. Samuel Kiprotich',
    submittedDate: '2024-01-18',
    currentStage: 'revision',
    reviewers: [
      { name: 'Dr. Jane Wanjiku', role: 'Senior Reviewer', status: 'revision', reviewDate: '2024-01-21', comments: 'Please update the feeding schedules section with latest research' },
      { name: 'Dr. Sarah Kimani', role: 'Technical Reviewer', status: 'approved', reviewDate: '2024-01-20' }
    ],
    progress: 40,
    priority: 'medium',
    dueDate: '2024-01-28',
    category: 'Livestock',
    version: '2.1'
  },
  {
    id: '3',
    title: 'Water Harvesting Techniques Handbook',
    author: 'Dr. Mary Njoroge',
    submittedDate: '2024-01-15',
    currentStage: 'approved',
    reviewers: [
      { name: 'Prof. Samuel Kiprotich', role: 'Senior Reviewer', status: 'approved', reviewDate: '2024-01-19' },
      { name: 'Dr. Peter Mwangi', role: 'Technical Reviewer', status: 'approved', reviewDate: '2024-01-18' },
      { name: 'Dr. Grace Wanjala', role: 'Editorial Reviewer', status: 'approved', reviewDate: '2024-01-17' }
    ],
    progress: 100,
    priority: 'medium',
    dueDate: '2024-01-22',
    category: 'Natural Resources',
    version: '1.5'
  }
]

const workflowComments: WorkflowComment[] = [
  {
    id: '1',
    author: 'Prof. Samuel Kiprotich',
    role: 'Senior Reviewer',
    date: '2024-01-22',
    comment: 'The pest management section is comprehensive and well-researched. The integration of biological control methods is particularly noteworthy.',
    type: 'approval'
  },
  {
    id: '2',
    author: 'Dr. Peter Mwangi',
    role: 'Editorial Reviewer',
    date: '2024-01-21',
    comment: 'Please ensure consistent formatting in tables 3.2 and 3.4. Also, check the reference citations in chapter 5.',
    type: 'revision'
  },
  {
    id: '3',
    author: 'Dr. Jane Wanjiku',
    role: 'Author',
    date: '2024-01-20',
    comment: 'Thank you for the feedback. I will address the formatting issues and update the references as suggested.',
    type: 'general'
  }
]

function WorkflowCard({ document, index }: { document: WorkflowDocument; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'revision': return 'bg-orange-100 text-orange-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'published': return 'bg-[#007A33]/10 text-[#007A33]'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'draft': return <FileText className="h-4 w-4" />
      case 'submitted': return <Clock className="h-4 w-4" />
      case 'review': return <Eye className="h-4 w-4" />
      case 'revision': return <AlertCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'published': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getReviewerStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600'
      case 'rejected': return 'text-red-600'
      case 'revision': return 'text-orange-600'
      case 'pending': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getReviewerStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'revision': return <AlertCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Card 
      className="hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] animate-in fade-in-0 duration-500 slide-in-from-bottom-8"
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg font-bold text-[#007A33] mb-2 line-clamp-2 transition-all duration-300 hover:scale-[1.02]">
              {document.title}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center space-x-1 min-w-0 group-hover:text-[#007A33] transition-colors duration-300">
                <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <span className="truncate">{document.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
                <span>Submitted {new Date(document.submittedDate).toLocaleDateString()}</span>
              </div>
              <Badge variant="secondary" className="text-xs w-fit transition-all duration-300 hover:scale-105">{document.category}</Badge>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-start sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
            <Badge className={`${getStageColor(document.currentStage)} text-xs transition-all duration-300 hover:scale-105`}>
              {getStageIcon(document.currentStage)}
              <span className="ml-1 capitalize">{document.currentStage}</span>
            </Badge>
            <Badge className={`${getPriorityColor(document.priority)} text-xs transition-all duration-300 hover:scale-105 ${document.priority === 'high' ? 'animate-pulse' : ''}`}>
              {document.priority.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium">Review Progress</span>
            <span className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 hover:text-[#007A33]">{document.progress}%</span>
          </div>
          <Progress 
            value={document.progress} 
            className="w-full h-2 transition-all duration-500" 
            style={{ 
              background: `linear-gradient(to right, #007A33 ${document.progress}%, #e5e7eb ${document.progress}%)` 
            }}
          />
        </div>

        <div className={`transition-all duration-500 ${isHovered ? 'max-h-96' : 'max-h-32'} overflow-hidden`}>
          <h4 className="font-medium text-xs sm:text-sm text-gray-900 mb-3">Reviewers</h4>
          <div className="space-y-2">
            {document.reviewers.map((reviewer, reviewerIndex) => (
              <div 
                key={reviewerIndex} 
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] animate-in fade-in-0 duration-300 slide-in-from-left-4"
                style={{ animationDelay: `${reviewerIndex * 100}ms` }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                    <AvatarFallback className="bg-[#007A33] text-white text-xs">
                      {reviewer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate transition-colors duration-300 hover:text-[#007A33]">{reviewer.name}</p>
                    <p className="text-xs text-gray-600 truncate">{reviewer.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className={`flex items-center space-x-1 ${getReviewerStatusColor(reviewer.status)} transition-all duration-300 hover:scale-110`}>
                    {getReviewerStatusIcon(reviewer.status)}
                    <span className="text-xs capitalize hidden sm:inline">{reviewer.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600 pt-2 border-t">
          <span className="transition-colors duration-300 hover:text-[#007A33]">Due: {new Date(document.dueDate).toLocaleDateString()}</span>
          <span className="transition-colors duration-300 hover:text-[#007A33]">Version: {document.version}</span>
        </div>

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1 bg-[#007A33] hover:bg-[#006400] text-xs sm:text-sm h-8 sm:h-9 transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
            View<span className="hidden sm:inline"> Document</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white text-xs sm:text-sm h-8 sm:h-9 transition-all duration-300 hover:scale-110 hover:rotate-3"
          >
            <MessageCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-125" />
            <span className="hidden sm:inline">Comments</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CommentThread({ comments }: { comments: WorkflowComment[] }) {
  const [newComment, setNewComment] = useState('')

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case 'approval': return 'border-l-green-500 bg-green-50'
      case 'revision': return 'border-l-orange-500 bg-orange-50'
      case 'rejection': return 'border-l-red-500 bg-red-50'
      case 'general': return 'border-l-blue-500 bg-blue-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
      <div className="space-y-3">
        {comments.map((comment, index) => (
          <div 
            key={comment.id} 
            className={`p-4 border-l-4 rounded-r-lg ${getCommentTypeColor(comment.type)} transition-all duration-300 hover:shadow-md hover:scale-[1.01] animate-in fade-in-0 duration-500 slide-in-from-left-8`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6 transition-transform duration-300 hover:scale-110">
                  <AvatarFallback className="bg-[#007A33] text-white text-xs">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm transition-colors duration-300 hover:text-[#007A33]">{comment.author}</span>
                <Badge variant="secondary" className="text-xs transition-all duration-300 hover:scale-105">{comment.role}</Badge>
              </div>
              <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-700 transition-colors duration-300 hover:text-gray-900">{comment.comment}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 animate-in fade-in-0 duration-700 slide-in-from-bottom-4">
        <div className="space-y-3">
          <Textarea
            placeholder="Add your comment or feedback..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-20 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
          />
          <div className="flex justify-between items-center">
            <Select defaultValue="general">
              <SelectTrigger className="w-48 transition-all duration-300 hover:border-[#007A33] focus:scale-[1.02]">
                <SelectValue placeholder="Comment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Comment</SelectItem>
                <SelectItem value="revision">Request Revision</SelectItem>
                <SelectItem value="approval">Approve</SelectItem>
                <SelectItem value="rejection">Reject</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#007A33] hover:bg-[#006400] transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Send className="mr-2 h-4 w-4 transition-transform duration-300 hover:rotate-12" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContentWorkflow() {
  const [selectedDocument, setSelectedDocument] = useState<WorkflowDocument | null>(null)

  const getDocumentsByStage = (stage: string) => {
    return workflowDocuments.filter(doc => doc.currentStage === stage)
  }

  const pendingReview = getDocumentsByStage('review')
  const needingRevision = getDocumentsByStage('revision')
  const approved = getDocumentsByStage('approved')
  const submitted = getDocumentsByStage('submitted')

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-700 slide-in-from-top-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 animate-in fade-in-0 duration-500 slide-in-from-left-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#007A33] animate-in fade-in-0 duration-700 slide-in-from-left-6">Content Approval Workflow</h2>
          <p className="text-sm sm:text-base text-gray-600 animate-in fade-in-0 duration-900 slide-in-from-left-8">Manage document review and approval process</p>
        </div>
      </div>

      <Tabs defaultValue="review" className="w-full animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          {[
            { value: 'review', icon: Eye, label: 'In Review', count: pendingReview.length, color: 'text-yellow-600' },
            { value: 'revision', icon: AlertCircle, label: 'Needs Revision', count: needingRevision.length, color: 'text-orange-600' },
            { value: 'approved', icon: CheckCircle, label: 'Approved', count: approved.length, color: 'text-green-600' },
            { value: 'submitted', icon: Clock, label: 'Submitted', count: submitted.length, color: 'text-blue-600' }
          ].map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 hover:scale-105 animate-in fade-in-0 duration-500 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <tab.icon className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 ${tab.color} transition-transform duration-300 hover:scale-110`} />
              <span className="hidden sm:inline">{tab.label.split(' ')[0]} </span>{tab.label.includes(' ') ? tab.label.split(' ').slice(-1) : tab.label} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {pendingReview.map((document, index) => (
              <WorkflowCard key={document.id} document={document} index={index} />
            ))}
          </div>
          {pendingReview.length === 0 && (
            <Card className="animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
              <CardContent className="text-center py-12">
                <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents in review</h3>
                <p className="text-gray-600">All submitted documents have been reviewed</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="revision" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {needingRevision.map((document, index) => (
              <WorkflowCard key={document.id} document={document} index={index} />
            ))}
          </div>
          {needingRevision.length === 0 && (
            <Card className="animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
              <CardContent className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents need revision</h3>
                <p className="text-gray-600">All documents are progressing smoothly through review</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {approved.map((document, index) => (
              <WorkflowCard key={document.id} document={document} index={index} />
            ))}
          </div>
          {approved.length === 0 && (
            <Card className="animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No approved documents</h3>
                <p className="text-gray-600">Approved documents will appear here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {submitted.map((document, index) => (
              <WorkflowCard key={document.id} document={document} index={index} />
            ))}
          </div>
          {submitted.length === 0 && (
            <Card className="animate-in fade-in-0 duration-700 slide-in-from-bottom-8">
              <CardContent className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submitted documents</h3>
                <p className="text-gray-600">Recently submitted documents will appear here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Comment Thread Modal/Panel */}
      {selectedDocument && (
        <Card className="animate-in fade-in-0 duration-500 slide-in-from-bottom-8">
          <CardHeader>
            <CardTitle className="text-[#007A33]">Comments & Feedback</CardTitle>
            <CardDescription>{selectedDocument.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <CommentThread comments={workflowComments} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
