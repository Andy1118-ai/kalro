"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Activity, Users, FileText, TrendingUp, Eye, MessageCircle, Download, Upload } from 'lucide-react'
import { useState, useEffect } from "react"

interface RealTimeUpdate {
  id: string
  type: 'document' | 'user' | 'system' | 'analytics'
  action: string
  user?: string
  target?: string
  timestamp: Date
  details?: string
  priority: 'low' | 'medium' | 'high'
}

const initialUpdates: RealTimeUpdate[] = [
  {
    id: '1',
    type: 'document',
    action: 'uploaded',
    user: 'Dr. Jane Wanjiku',
    target: 'Climate-Smart Maize Production Guide',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    details: 'New manual added to Crops > Cereals > Maize',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'user',
    action: 'registered',
    user: 'System',
    target: 'Prof. Samuel Kiprotich',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    details: 'New user registration pending approval',
    priority: 'high'
  },
  {
    id: '3',
    type: 'analytics',
    action: 'milestone',
    user: 'System',
    target: '10,000 downloads',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    details: 'Platform reached 10,000 total downloads',
    priority: 'low'
  }
]

export default function RealTimeUpdates() {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>(initialUpdates)
  const [isConnected, setIsConnected] = useState(true)
  const [unreadCount, setUnreadCount] = useState(3)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newUpdate: RealTimeUpdate = {
        id: Date.now().toString(),
        type: ['document', 'user', 'system', 'analytics'][Math.floor(Math.random() * 4)] as any,
        action: ['uploaded', 'updated', 'deleted', 'viewed', 'downloaded'][Math.floor(Math.random() * 5)],
        user: ['Dr. Jane Wanjiku', 'Prof. Samuel Kiprotich', 'Dr. Mary Njoroge', 'System'][Math.floor(Math.random() * 4)],
        target: ['Maize Production Guide', 'Dairy Cattle Manual', 'Water Harvesting Techniques'][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
        details: 'Real-time update simulation',
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
      }

      setUpdates(prev => [newUpdate, ...prev.slice(0, 19)]) // Keep only 20 most recent
      setUnreadCount(prev => prev + 1)
    }, 30000) // New update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getUpdateIcon = (type: string, action: string) => {
    switch (type) {
      case 'document':
        return action === 'uploaded' ? Upload : action === 'downloaded' ? Download : FileText
      case 'user':
        return Users
      case 'analytics':
        return TrendingUp
      default:
        return Activity
    }
  }

  const getUpdateColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-blue-600 bg-blue-100'
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const markAllAsRead = () => {
    setUnreadCount(0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-[#007A33]">Real-Time Updates</h3>
          <p className="text-gray-600">Live system activity and notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read ({unreadCount})
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#007A33] flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Live Activity Feed
                  </CardTitle>
                  <CardDescription>Real-time system events and user actions</CardDescription>
                </div>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {updates.map((update) => {
                  const Icon = getUpdateIcon(update.type, update.action)
                  return (
                    <div key={update.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-full ${getUpdateColor(update.priority)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            <span className="text-[#007A33]">{update.user}</span> {update.action} {update.target}
                          </p>
                          <span className="text-xs text-gray-500">{formatTimeAgo(update.timestamp)}</span>
                        </div>
                        {update.details && (
                          <p className="text-xs text-gray-600 mt-1">{update.details}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {update.type}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            update.priority === 'high' ? 'border-red-200 text-red-700' :
                            update.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                            'border-blue-200 text-blue-700'
                          }`}>
                            {update.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#007A33]">System Status</CardTitle>
              <CardDescription>Current system health and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Server Status</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage</span>
                <Badge className="bg-yellow-100 text-yellow-800">78% Used</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Users</span>
                <span className="text-sm font-bold text-[#007A33]">1,247</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#007A33]">Quick Stats</CardTitle>
              <CardDescription>Real-time platform metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Page Views (Today)</span>
                </div>
                <span className="font-bold text-[#007A33]">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-[#007A33]" />
                  <span className="text-sm">Downloads (Today)</span>
                </div>
                <span className="font-bold text-[#007A33]">456</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">New Users (Today)</span>
                </div>
                <span className="font-bold text-[#007A33]">23</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">New Documents</span>
                </div>
                <span className="font-bold text-[#007A33]">7</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
