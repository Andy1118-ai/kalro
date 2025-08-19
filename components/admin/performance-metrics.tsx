"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Cpu, HardDrive, Wifi, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Metric {
  id: string
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'good',
      trend: 'stable',
      icon: <Cpu className="h-4 w-4" />
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 68,
      unit: '%',
      status: 'warning',
      trend: 'up',
      icon: <HardDrive className="h-4 w-4" />
    },
    {
      id: 'disk',
      name: 'Disk Usage',
      value: 82,
      unit: '%',
      status: 'critical',
      trend: 'up',
      icon: <HardDrive className="h-4 w-4" />
    },
    {
      id: 'network',
      name: 'Network Latency',
      value: 45,
      unit: 'ms',
      status: 'good',
      trend: 'down',
      icon: <Wifi className="h-4 w-4" />
    },
    {
      id: 'response',
      name: 'Response Time',
      value: 120,
      unit: 'ms',
      status: 'good',
      trend: 'stable',
      icon: <Clock className="h-4 w-4" />
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        trend: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable'
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: Metric['status']) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
    }
  }

  const getProgressColor = (status: Metric['status']) => {
    switch (status) {
      case 'good': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
    }
  }

  const getTrendIcon = (trend: Metric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-red-500" />
      case 'down': return <TrendingDown className="h-3 w-3 text-green-500" />
      case 'stable': return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const overallStatus = metrics.some(m => m.status === 'critical') ? 'critical' :
                       metrics.some(m => m.status === 'warning') ? 'warning' : 'good'

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#007A33]">System Performance</CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </div>
          <Badge 
            variant={overallStatus === 'good' ? 'default' : 'destructive'}
            className={overallStatus === 'good' ? 'bg-green-100 text-green-800' : 
                      overallStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''}
          >
            {overallStatus === 'good' ? 'Healthy' : 
             overallStatus === 'warning' ? 'Warning' : 'Critical'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(metric.status)}>
                    {metric.icon}
                  </div>
                  <span className="text-sm font-medium">{metric.name}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(0)}{metric.unit}
                  </span>
                </div>
              </div>
              <Progress 
                value={metric.id === 'network' || metric.id === 'response' ? 
                  Math.max(0, 100 - metric.value) : metric.value} 
                className="h-2"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last updated:</span>
            <span className="font-medium">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Next update in:</span>
            <span className="font-medium">5 seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
