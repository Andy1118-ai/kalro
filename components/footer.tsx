import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#007A33] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/kalro.jpeg" alt="KALRO logo" width={40} height={40} className="rounded-lg" />
              <div>
                <div className="font-bold text-lg">KALRO</div>
                <div className="text-sm text-white/80">Knowledge Hub</div>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Kenya Agricultural and Livestock Research Organization - Empowering agriculture through research and knowledge dissemination.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/domains/crops" className="block text-white/80 hover:text-white text-sm">Crops</Link>
              <Link href="/domains/livestock" className="block text-white/80 hover:text-white text-sm">Livestock</Link>
              <Link href="/domains/natural-resources" className="block text-white/80 hover:text-white text-sm">Natural Resources</Link>
              <Link href="/domains/socio-economics" className="block text-white/80 hover:text-white text-sm">Socio-Economics</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <div className="space-y-2">
              <Link href="/resources" className="block text-white/80 hover:text-white text-sm">All Publications</Link>
              <Link href="/resources?type=manual" className="block text-white/80 hover:text-white text-sm">Manuals</Link>
              <Link href="/resources?type=brochure" className="block text-white/80 hover:text-white text-sm">Brochures</Link>
              <Link href="/resources?type=factsheet" className="block text-white/80 hover:text-white text-sm">Factsheets</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-white/60" />
                <span className="text-white/80">KALRO Headquarters, Nairobi</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-white/60" />
                <span className="text-white/80">+254 20 4183301-20</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-white/60" />
                <span className="text-white/80">info@kalro.org</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button size="sm" className="bg-[#FFD700] text-[#007A33] hover:bg-[#FFD700]/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <p>&copy; 2024 Kenya Agricultural and Livestock Research Organization. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
