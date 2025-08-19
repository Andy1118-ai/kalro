"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { BarChart3, BookOpen, Users, Download, TrendingUp, Plus, Eye, Edit, Trash2, Search, Filter, Upload, FolderOpen, Settings, LayoutDashboard, UserCheck, FileText, ImageIcon } from 'lucide-react'
import { AdminHeader } from "@/components/admin-header"
import { StatsCards } from "@/components/admin/stats-cards"
import { RecentActivity } from "@/components/admin/recent-activity"
import { DocumentsTable } from "@/components/admin/documents-table"
import { UsersTable } from "@/components/admin/users-table"
import { CategoriesManager } from "@/components/admin/categories-manager"
import { UploadManager } from "@/components/admin/upload-manager"
import { AnalyticsCharts } from "@/components/admin/analytics-charts"
import { SettingsPanel } from "@/components/admin/settings-panel"
import PermissionsManager from "@/components/admin/permissions-manager"
import ExportManager from "@/components/admin/export-manager"
import RealTimeUpdates from "@/components/admin/real-time-updates"
import BulkOperations from "@/components/admin/bulk-operations"
import RealTimeActivityFeed from "@/components/admin/real-time-activity-feed"
import SmartAlerts from "@/components/admin/smart-alerts"
import QuickActionsPanel from "@/components/admin/quick-actions-panel"
import PerformanceMetrics from "@/components/admin/performance-metrics"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#007A33] mb-2">KALRO Admin Dashboard</h1>
            <p className="text-gray-600">Manage your knowledge hub content and users</p>
          </div>

          {/* Centralized Tabs */}
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8 h-12">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bulk" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Bulk Ops</span>
              </TabsTrigger>
              <TabsTrigger 
                value="categories" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Categories</span>
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-[#007A33] data-[state=active]:text-white flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#007A33]">Enhanced Dashboard Overview</h2>
                <Button className="bg-[#007A33] hover:bg-[#006400]">
                  <Plus className="mr-2 h-4 w-4" />
                  Quick Add Resource
                </Button>
              </div>

              <StatsCards />
              
              {/* Quick Actions Panel */}
              <QuickActionsPanel />

              {/* Smart Alerts and Performance Metrics */}
              <div className="grid gap-6 lg:grid-cols-2">
                <SmartAlerts />
                <PerformanceMetrics />
              </div>

              {/* Real-time Activity and Recent Documents */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <RealTimeActivityFeed />
                </div>
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#007A33]">Recent Documents</CardTitle>
                      <CardDescription>Latest uploads and modifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DocumentsTable />
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#007A33]">Domain Distribution</CardTitle>
                    <CardDescription>Resources by domain category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Crops</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#007A33] h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">1,250</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Livestock</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#8B5E3C] h-2 rounded-full" style={{ width: '32%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">890</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Natural Resources</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#228B22] h-2 rounded-full" style={{ width: '23%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">650</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Socio-Economics</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">420</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#007A33]">Popular Downloads</CardTitle>
                    <CardDescription>Most downloaded resources this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Climate-Smart Maize Production", downloads: 2450, trend: "+12%" },
                        { title: "Dairy Cattle Management", downloads: 1890, trend: "+8%" },
                        { title: "Water Harvesting Techniques", downloads: 1650, trend: "+15%" },
                        { title: "Poultry Disease Prevention", downloads: 1420, trend: "+5%" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                            <p className="text-xs text-gray-600">{item.downloads.toLocaleString()} downloads</p>
                          </div>
                          <Badge variant="secondary" className="text-green-600">
                            {item.trend}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#007A33]">Document Management</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button className="bg-[#007A33] hover:bg-[#006400]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Document
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>All Documents</CardTitle>
                      <CardDescription>Manage your knowledge base resources</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input placeholder="Search documents..." className="pl-10 w-64" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DocumentsTable />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#007A33]">Upload Resources</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#007A33]">Upload New Document</CardTitle>
                    <CardDescription>Add new resources to the knowledge hub</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Document Title</Label>
                      <Input id="title" placeholder="Enter document title" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter document description" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="domain">Domain</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select domain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crops">Crops</SelectItem>
                            <SelectItem value="livestock">Livestock</SelectItem>
                            <SelectItem value="natural-resources">Natural Resources</SelectItem>
                            <SelectItem value="socio-economics">Socio-Economics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="type">Document Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="pamphlet">Pamphlet</SelectItem>
                            <SelectItem value="brochure">Brochure</SelectItem>
                            <SelectItem value="leaflet">Leaflet</SelectItem>
                            <SelectItem value="factsheet">Factsheet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input id="author" placeholder="Enter author name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#007A33] transition-colors">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                        <Button variant="outline">Choose File</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[#007A33] hover:bg-[#006400]">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#007A33]">Upload Guidelines</CardTitle>
                    <CardDescription>Follow these guidelines for best results</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#007A33] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">File Formats</p>
                          <p className="text-sm text-gray-600">PDF, DOC, DOCX files are supported</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#007A33] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">File Size</p>
                          <p className="text-sm text-gray-600">Maximum file size is 50MB</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#007A33] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Quality</p>
                          <p className="text-sm text-gray-600">Ensure documents are clear and readable</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#007A33] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Metadata</p>
                          <p className="text-sm text-gray-600">Complete all required fields for better discoverability</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#007A33]">Category Management</h2>
                <Button className="bg-[#007A33] hover:bg-[#006400]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "Crops", count: 1250, color: "bg-[#007A33]" },
                  { name: "Livestock", count: 890, color: "bg-[#8B5E3C]" },
                  { name: "Natural Resources", count: 650, color: "bg-[#228B22]" },
                  { name: "Socio-Economics", count: 420, color: "bg-[#FFD700]" }
                ].map((category) => (
                  <Card key={category.name}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      </div>
                      <CardDescription>{category.count} resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="users">User Management</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#007A33]">User Management</h2>
                    <Button className="bg-[#007A33] hover:bg-[#006400]">
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>All Users</CardTitle>
                          <CardDescription>Manage system users and permissions</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input placeholder="Search users..." className="pl-10 w-64" />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <UsersTable />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="permissions">
                  <PermissionsManager />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Tabs defaultValue="analytics" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="export">Export Data</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analytics">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#007A33]">Analytics & Reports</h2>
                    <Button variant="outline" className="border-[#007A33] text-[#007A33] hover:bg-[#007A33] hover:text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">125,430</div>
                        <p className="text-xs text-green-600">+12% from last month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">45,230</div>
                        <p className="text-xs text-green-600">+23% from last month</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">10,456</div>
                        <p className="text-xs text-green-600">+8% from last month</p>
                      </CardContent>
                    </Card>
                                        <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">4m 32s</div>
                        <p className="text-xs text-green-600">+5% from last month</p>
                      </CardContent>
                    </Card>
                  </div>

                  <AnalyticsCharts />

                </TabsContent>
                <TabsContent value="export">
                  <ExportManager />
                </TabsContent>
              </Tabs>
            </TabsContent>

             {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#007A33]">System Settings</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#007A33]">General Settings</CardTitle>
                    <CardDescription>Configure basic system settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">Site Name</Label>
                      <Input id="site-name" defaultValue="KALRO Knowledge Hub" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="site-description">Site Description</Label>
                      <Textarea id="site-description" defaultValue="Kenya Agricultural and Livestock Research Organization Knowledge Hub" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">Enable maintenance mode for system updates</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>User Registration</Label>
                        <p className="text-sm text-gray-600">Allow new user registrations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#007A33]">Security Settings</CardTitle>
                    <CardDescription>Manage security and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-gray-600">Auto-logout inactive users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full bg-[#007A33] hover:bg-[#006400]">
                      Save Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
             {/* Bulk Operations Tab */}
            <TabsContent value="bulk" className="space-y-6">
              <BulkOperations />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}