"use client"

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { BarChart3, TrendingUp, Users, Download, Eye, FileText } from 'lucide-react'
import { useAnalytics } from '@/hooks/use-api'

const fallbackMonthly = [
  { month: 'Jan', downloads: 4200, views: 12500, users: 890 },
  { month: 'Feb', downloads: 3800, views: 11200, users: 920 },
  { month: 'Mar', downloads: 5100, views: 15300, users: 1100 },
  { month: 'Apr', downloads: 4600, views: 13800, users: 980 },
  { month: 'May', downloads: 5800, views: 17200, users: 1250 },
  { month: 'Jun', downloads: 6200, views: 18500, users: 1380 }
]

const categoryData = [
  { name: 'Crops', value: 1250, color: '#007A33' },
  { name: 'Livestock', value: 890, color: '#8B5E3C' },
  { name: 'Natural Resources', value: 650, color: '#228B22' },
  { name: 'Socio-Economics', value: 420, color: '#FFD700' }
]

const dailyActivityData = [
  { day: 'Mon', uploads: 12, downloads: 245, views: 890 },
  { day: 'Tue', uploads: 8, downloads: 189, views: 720 },
  { day: 'Wed', uploads: 15, downloads: 298, views: 1100 },
  { day: 'Thu', uploads: 10, downloads: 234, views: 850 },
  { day: 'Fri', uploads: 18, downloads: 356, views: 1250 },
  { day: 'Sat', uploads: 6, downloads: 145, views: 520 },
  { day: 'Sun', uploads: 4, downloads: 98, views: 380 }
]

const topResourcesData = [
  { name: 'Climate-Smart Maize', downloads: 2450, views: 8900 },
  { name: 'Dairy Cattle Management', downloads: 1890, views: 6700 },
  { name: 'Water Harvesting', downloads: 1650, views: 5800 },
  { name: 'Poultry Disease Prevention', downloads: 1420, views: 4900 },
  { name: 'Soil Conservation', downloads: 1200, views: 4200 }
]

export function AnalyticsCharts() {
  const { data: analytics, loading, error } = useAnalytics()

  const monthlyData = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    if (!Array.isArray(analytics) || analytics.length === 0) return fallbackMonthly
    const byMonth: Record<string, { downloads: number; views: number; users: number }> = {}
    months.forEach(m => { byMonth[m] = { downloads: 0, views: 0, users: 0 } })
    for (const entry of analytics as any[]) {
      const date = new Date(entry.date)
      const m = months[date.getMonth()]
      if (entry.metric_type === 'downloads') byMonth[m].downloads += Number(entry.metric_value || 0)
      if (entry.metric_type === 'views') byMonth[m].views += Number(entry.metric_value || 0)
    }
    return months.map(m => ({ month: m, ...byMonth[m] }))
  }, [analytics])

  return (
    <div className="space-y-6">
      {loading && <div className="p-2">Loading analytics...</div>}
      {error && <div className="p-2 text-red-600">{error}</div>}
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-[#007A33]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyData.reduce((s, m) => s + (m.views || 0), 0).toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-[#007A33]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyData.reduce((s, m) => s + (m.downloads || 0), 0).toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-[#007A33]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,456</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <FileText className="h-4 w-4 text-[#007A33]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,210</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#007A33]">Monthly Trends</CardTitle>
          <CardDescription>Downloads, views, and user activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              downloads: {
                label: "Downloads",
                color: "#007A33",
              },
              views: {
                label: "Views",
                color: "#228B22",
              },
              users: {
                label: "Users",
                color: "#8B5E3C",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="downloads" stroke="var(--color-downloads)" strokeWidth={2} />
                <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Distribution and Daily Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#007A33]">Category Distribution</CardTitle>
            <CardDescription>Resources by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                crops: { label: "Crops", color: "#007A33" },
                livestock: { label: "Livestock", color: "#8B5E3C" },
                natural: { label: "Natural Resources", color: "#228B22" },
                socio: { label: "Socio-Economics", color: "#FFD700" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#007A33]">Daily Activity</CardTitle>
            <CardDescription>Weekly activity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                uploads: { label: "Uploads", color: "#007A33" },
                downloads: { label: "Downloads", color: "#228B22" },
                views: { label: "Views", color: "#8B5E3C" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="uploads" fill="var(--color-uploads)" />
                  <Bar dataKey="downloads" fill="var(--color-downloads)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Resources Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#007A33]">Top Performing Resources</CardTitle>
          <CardDescription>Most popular resources by downloads and views</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              downloads: { label: "Downloads", color: "#007A33" },
              views: { label: "Views", color: "#228B22" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={topResourcesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="views" stackId="1" stroke="var(--color-views)" fill="var(--color-views)" fillOpacity={0.3} />
                <Area type="monotone" dataKey="downloads" stackId="1" stroke="var(--color-downloads)" fill="var(--color-downloads)" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Usage Heatmap Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#007A33]">Usage Heatmap</CardTitle>
          <CardDescription>User activity patterns throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Heatmap visualization would be displayed here</p>
              <p className="text-sm mt-2">Showing peak usage hours and days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
