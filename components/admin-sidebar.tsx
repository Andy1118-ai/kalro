"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, BookOpen, Users, Settings, BarChart3, Upload, FolderOpen, UserCheck, HelpCircle, LogOut } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/admin/documents", icon: BookOpen, badge: "3,210" },
  { name: "Upload", href: "/admin/upload", icon: Upload },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Users", href: "/admin/users", icon: Users, badge: "156" },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const bottomNavigation = [
  { name: "Help & Support", href: "/admin/help", icon: HelpCircle },
  { name: "Sign Out", href: "/admin/logout", icon: LogOut },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#007A33] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <div className="font-bold text-[#007A33]">KALRO Admin</div>
            <div className="text-xs text-gray-600">Knowledge Hub</div>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-[#007A33]/10 text-[#007A33] hover:bg-[#007A33]/20"
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="space-y-1">
          {bottomNavigation.map((item) => {
            const Icon = item.icon
            
            return (
              <Link key={item.name} href={item.href}>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
