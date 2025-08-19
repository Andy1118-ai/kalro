"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, Users, FileText, Settings, BarChart3, Shield, Database } from 'lucide-react'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  badge?: string
  action: () => void
}

export default function QuickActionsPanel() {
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const handleAction = async (actionId: string, actionFn: () => void) => {
    setLoadingAction(actionId)
    // Simulate async action
    await new Promise(resolve => setTimeout(resolve, 1000))
    actionFn()
    setLoadingAction(null)
  }

  const quickActions: QuickAction[] = [
    {
      id: 'add-document',
      title: 'Add Document',
      description: 'Upload new resource',
      icon: <Plus className="h-5 w-5" />,
      color: 'bg-[#007A33] hover:bg-[#006400]',
      action: () => console.log('Add document clicked')
    },
    {
      id: 'bulk-upload',
      title: 'Bulk Upload',
      description: 'Upload multiple files',
      icon: <Upload className="h-5 w-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      badge: 'New',
      action: () => console.log('Bulk upload clicked')
    },
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'User administration',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => console.log('Manage users clicked')
    },
    {
      id: 'review-queue',
      title: 'Review Queue',
      description: 'Pending approvals',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-orange-600 hover:bg-orange-700',
      badge: '15',
      action: () => console.log('Review queue clicked')
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure system',
      icon: <Settings className="h-5 w-5" />,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => console.log('System settings clicked')
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Usage statistics',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Analytics clicked')
    },
    {
      id: 'security',
      title: 'Security Audit',
      description: 'Security overview',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => console.log('Security audit clicked')
    },
    {
      id: 'backup',
      title: 'Backup System',
      description: 'Create backup',
      icon: <Database className="h-5 w-5" />,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => console.log('Backup system clicked')
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#007A33]">Quick Actions</CardTitle>
        <CardDescription>One-click access to common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <div key={action.id} className="relative">
              <Button
                variant="outline"
                className={`w-full h-20 flex flex-col items-center justify-center space-y-2 text-white border-0 transition-all duration-200 hover:scale-105 hover:shadow-lg ${action.color}`}
                onClick={() => handleAction(action.id, action.action)}
                disabled={loadingAction === action.id}
              >
                {loadingAction === action.id ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    {action.icon}
                    <span className="text-xs font-medium text-center">{action.title}</span>
                  </>
                )}
              </Button>
              {action.badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 text-xs px-2 py-1"
                >
                  {action.badge}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
