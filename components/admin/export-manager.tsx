"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Table, BarChart3, Users, Calendar, CheckCircle } from 'lucide-react'
import { useState } from "react"

const exportTypes = [
  {
    id: 'documents',
    name: 'Documents Export',
    description: 'Export document metadata and content',
    icon: FileText,
    formats: ['CSV', 'Excel', 'PDF', 'JSON'],
    fields: ['Title', 'Author', 'Domain', 'Category', 'Type', 'Date', 'Downloads', 'Description']
  },
  {
    id: 'users',
    name: 'Users Export',
    description: 'Export user accounts and activity data',
    icon: Users,
    formats: ['CSV', 'Excel', 'JSON'],
    fields: ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Documents Created', 'Registration Date']
  },
  {
    id: 'analytics',
    name: 'Analytics Export',
    description: 'Export usage statistics and reports',
    icon: BarChart3,
    formats: ['CSV', 'Excel', 'PDF'],
    fields: ['Date', 'Page Views', 'Downloads', 'Active Users', 'Popular Content', 'Search Terms']
  },
  {
    id: 'categories',
    name: 'Categories Export',
    description: 'Export category structure and content counts',
    icon: Table,
    formats: ['CSV', 'Excel', 'JSON'],
    fields: ['Category', 'Subcategory', 'Document Count', 'Total Downloads', 'Last Updated']
  }
]

const recentExports = [
  {
    id: 1,
    name: 'Documents_Export_2024-01-15.xlsx',
    type: 'Documents',
    format: 'Excel',
    size: '2.4 MB',
    date: '2024-01-15 14:30',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Users_Report_2024-01-14.pdf',
    type: 'Users',
    format: 'PDF',
    size: '1.8 MB',
    date: '2024-01-14 09:15',
    status: 'completed'
  },
  {
    id: 3,
    name: 'Analytics_Monthly_2024-01.csv',
    type: 'Analytics',
    format: 'CSV',
    size: '856 KB',
    date: '2024-01-13 16:45',
    status: 'processing'
  }
]

export default function ExportManager() {
  const [selectedExport, setSelectedExport] = useState(exportTypes[0])
  const [selectedFormat, setSelectedFormat] = useState('')
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [dateRange, setDateRange] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleFieldToggle = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    )
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-[#007A33]">Export Data</h3>
          <p className="text-gray-600">Export system data in various formats</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export Configuration */}
        <div className="space-y-6">
          {/* Export Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#007A33]">Select Export Type</CardTitle>
              <CardDescription>Choose what data you want to export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {exportTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div
                    key={type.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedExport.id === type.id 
                        ? 'border-[#007A33] bg-[#007A33]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedExport(type)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-[#007A33] mt-0.5" />
                      <div>
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#007A33]">Export Options</CardTitle>
              <CardDescription>Configure your export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedExport.formats.map((format) => (
                      <SelectItem key={format} value={format.toLowerCase()}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-3-months">Last 3 months</SelectItem>
                    <SelectItem value="last-year">Last year</SelectItem>
                    <SelectItem value="all-time">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Fields to Include</Label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedExport.fields.map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={selectedFields.includes(field)}
                        onCheckedChange={() => handleFieldToggle(field)}
                      />
                      <Label htmlFor={field} className="text-sm">{field}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {isExporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exporting...</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="w-full" />
                </div>
              )}

              <Button 
                className="w-full bg-[#007A33] hover:bg-[#006400]"
                onClick={handleExport}
                disabled={!selectedFormat || selectedFields.length === 0 || isExporting}
              >
                <Download className="mr-2 h-4 w-4 text-[#007A33]" />
                {isExporting ? 'Exporting...' : 'Start Export'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Exports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#007A33]">Recent Exports</CardTitle>
            <CardDescription>Download or manage your recent exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExports.map((exportItem) => (
                <div key={exportItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      exportItem.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {exportItem.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Calendar className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{exportItem.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{exportItem.type}</span>
                        <span>•</span>
                        <span>{exportItem.format}</span>
                        <span>•</span>
                        <span>{exportItem.size}</span>
                      </div>
                      <p className="text-xs text-gray-500">{exportItem.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={exportItem.status === 'completed' ? 'default' : 'secondary'}>
                      {exportItem.status}
                    </Badge>
                    {exportItem.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 text-[#007A33]" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
