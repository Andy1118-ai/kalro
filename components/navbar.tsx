'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, User, Bell } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const mainTabs = [
    { value: 'crops', label: 'Crops', href: '/domains/crops' },
    { value: 'livestock', label: 'Livestock', href: '/domains/livestock' },
    { value: 'natural-resources', label: 'Natural Resources', href: '/domains/natural-resources' },
    { value: 'socio-economics', label: 'Socio Economics', href: '/domains/socio-economics' },
    { value: 'cross-cutting', label: 'Cross-cutting', href: '/domains/cross-cutting' }
  ]

  const getCurrentTab = () => {
    const currentPath = pathname.split('/')[2] // Get domain from path
    return mainTabs.find(tab => tab.value === currentPath)?.value || 'crops'
  }

  return (
    <nav className="backdrop-blur-md bg-black/60 border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/kalro.jpeg" alt="KALRO logo" width={48} height={48} className="rounded-lg" />
              <span className="text-xl font-bold text-white">KALRO</span>
              <span className="text-sm text-white/80 hidden sm:inline">Knowledge Bank</span>
            </Link>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden lg:flex items-center">
            <Tabs value={getCurrentTab()} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-md">
                {mainTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    asChild
                    className="text-white/90 hover:text-white transition-all data-[state=active]:bg-[#007A33]/90 data-[state=active]:backdrop-blur-md data-[state=active]:text-white"
                  >
                    <Link href={tab.href} className="px-4 py-2 text-sm font-medium">
                      {tab.label}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/admin/login">
              <Button size="sm" className="bg-[#007A33]/90 hover:bg-[#007A33] backdrop-blur-md border border-white/10">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-black/60 backdrop-blur-md border-white/10">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 pb-4 border-b border-white/10">
                    <Image src="/kalro.jpeg" alt="KALRO logo" width={48} height={48} className="rounded-lg" />
                    <div>
                      <div className="font-bold text-white">KALRO</div>
                      <div className="text-sm text-white/80">Knowledge Hub</div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white mb-3">Research Areas</h3>
                    {mainTabs.map((tab) => (
                      <Link
                        key={tab.value}
                        href={tab.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname.includes(tab.value)
                            ? 'bg-[#007A33]/90 backdrop-blur-md text-white border border-white/10'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {tab.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#007A33]/90 hover:bg-[#007A33] backdrop-blur-md border border-white/10">
                        Admin Portal
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
