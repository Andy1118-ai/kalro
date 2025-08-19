import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Download, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: "Total Documents",
    value: "3,210",
    description: "+12% from last month",
    icon: BookOpen,
    color: "text-[#007A33]",
    bgColor: "bg-[#007A33]/10"
  },
  {
    title: "Active Users",
    value: "10,456",
    description: "+8% from last month",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Total Downloads",
    value: "45,230",
    description: "+23% from last month",
    icon: Download,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Monthly Growth",
    value: "18.2%",
    description: "+4.1% from last month",
    icon: TrendingUp,
    color: "text-[#FFD700]",
    bgColor: "bg-yellow-100"
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
