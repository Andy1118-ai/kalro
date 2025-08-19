"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RefreshCw, FileText, Download, User, Upload, Eye } from 'lucide-react'

interface Activity {
  id: string
  type: 'upload' | 'download' | 'view' | 'user_action'
  user: string
  action: string
  resource?: string
  timestamp: Date
  status: 'success' | 'pending' | 'error'
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'upload',
    user: 'Dr. Jane Wanjiku',
    action: 'uploaded',
    resource: 'Climate-Smart Maize Production Guide',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: 'success'
  },
  {
    id: '2',
    type: 'download',
    user: 'Prof. Samuel Kiprotich',
    action: 'downloaded',
    resource: 'Dairy Cattle Management Best Practices',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'success'
  },
  {
    id: '3',
    type: 'view',
    user: 'Dr. Mary Njoroge',
    action: 'viewed',
    resource: 'Water Harvesting Techniques',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    status: 'success'
  },
  {
    id: '4',
    type: 'user_action',
    user: 'Admin',
    action: 'created new user account',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    status: 'success'
  }
]

export default function RealTimeActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: ['upload', 'download', 'view', 'user_action'][Math.floor(Math.random() * 4)] as Activity['type'],
        user: ['Dr. Jane Wanjiku', 'Prof. Samuel Kiprotich', 'Dr. Mary Njoroge', 'Admin'][Math.floor(Math.random() * 4)],
        action: 'performed action',
        resource: Math.random() > 0.5 ? 'Sample Resource Document' : undefined,
        timestamp: new Date(),
        status: 'success'
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 9)])
      setLastUpdate(new Date())
    }, 10000)

    return () => clearInterval(interval)
  }, [isLive])

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'upload': return <Upload className="h-4 w-4" />
      case 'download': return <Download className="h-4 w-4 text-[#007A33]" />
      case 'view': return <Eye className="h-4 w-4" />
      case 'user_action': return <User className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'upload': return 'bg-blue-100 text-blue-800'
      case 'download': return 'bg-green-100 text-green-800'
      case 'view': return 'bg-purple-100 text-purple-800'
      case 'user_action': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#007A33]">Live Activity Feed</CardTitle>
            <CardDescription>Real-time system activity</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className={isLive ? 'text-green-600' : 'text-gray-600'}
            >
              {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-xs text-gray-600">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-600">
                  {activity.action} {activity.resource && (
                    <span className="font-medium">"{activity.resource}"</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
              <Badge variant={activity.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
