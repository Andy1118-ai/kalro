"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Info, CheckCircle, XCircle, X, Bell, BellOff } from 'lucide-react'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  title: string
  message: string
  timestamp: Date
  actionRequired: boolean
  dismissed: boolean
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'System Storage Low',
    message: 'Available storage is below 10%. Consider archiving old documents.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    actionRequired: true,
    dismissed: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Pending Document Reviews',
    message: '15 documents are waiting for expert review approval.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionRequired: true,
    dismissed: false
  },
  {
    id: '3',
    type: 'info',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    actionRequired: false,
    dismissed: false
  },
  {
    id: '4',
    type: 'success',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully at 3:00 AM.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    actionRequired: false,
    dismissed: false
  }
]

export default function SmartAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ))
  }

  const dismissAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, dismissed: true })))
  }

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info': return <Info className="h-5 w-5 text-blue-500" />
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getAlertBorderColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'border-l-red-500'
      case 'warning': return 'border-l-yellow-500'
      case 'info': return 'border-l-blue-500'
      case 'success': return 'border-l-green-500'
    }
  }

  const activeAlerts = alerts.filter(alert => !alert.dismissed)
  const criticalCount = activeAlerts.filter(alert => alert.type === 'critical').length
  const actionRequiredCount = activeAlerts.filter(alert => alert.actionRequired).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#007A33] flex items-center gap-2">
              Smart Alerts
              {criticalCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {criticalCount} Critical
                </Badge>
              )}
              {actionRequiredCount > 0 && (
                <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                  {actionRequiredCount} Action Required
                </Badge>
              )}
            </CardTitle>
            <CardDescription>System notifications and alerts</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="notifications" className="text-sm">
                {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            {activeAlerts.length > 0 && (
              <Button variant="outline" size="sm" onClick={dismissAll}>
                Dismiss All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>No active alerts</p>
              <p className="text-sm">All systems running smoothly</p>
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 bg-gray-50 ${getAlertBorderColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        {alert.actionRequired && (
                          <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {alert.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
