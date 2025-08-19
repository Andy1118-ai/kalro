"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Mail, Shield, ChevronLeft, ChevronRight, CheckCircle, XCircle, X  } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import KALROLoadingSpinner from "@/components/loading-spinner"


export default function AdminLogin() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  // Toast function
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Close toast manually
  const closeToast = () => {
    setToast(null)
  }

  // Sample agricultural/research images data
  const carouselImages = [
    {
      src: "/livestock.jpeg",
    },
    {
      src: "/maize1.jpeg",
    },
    {
      src: "/tractor.jpeg",
    },
    {
      src: "/people.jpeg"
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % carouselImages.length
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setError("")

      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      // Use API route which now sets HttpOnly cookie server-side
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errText = await response.text().catch(() => '')
        throw new Error(errText || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success || !result.data?.token) {
        throw new Error(result.error || "Login failed")
      }

      // Persist token for client-side API usage (non-sensitive)
      localStorage.setItem('auth_token', result.data.token)

      showToast("Login successful! Welcome to KALRO Admin Portal", 'success')

      // Prefer full reload to ensure middleware sees the new cookie reliably
      setTimeout(() => {
        window.location.assign('/admin/dashboard')
      }, 300)
    } catch (e: any) {
      console.error("Login error:", e)
      const message = e?.message || 'Failed to connect to server'
      setError(message)
      showToast(message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Glass background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-gray-200/30 to-gray-400/20 backdrop-blur-3xl"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-2xl backdrop-blur-md border max-w-sm ${
            toast.type === 'success'
              ? 'bg-green-50/90 border-green-200 text-green-800'
              : 'bg-red-50/90 border-red-200 text-red-800'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={closeToast}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Centered Logo */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 animate-in fade-in duration-700">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-2xl border border-white/20">
          <Image
            src="/kalro.jpeg"
            alt="KALRO Logo"
            width={60}
            height={60}
            className="rounded-full"
            priority
          />
        </div>
      </div>      {/* Main Container */}
      <div className="w-full max-w-7xl flex bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-20">
        {/* Left Side - Image Carousel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[600px]">
          {/* Carousel Container */}
          <div className="relative w-full h-full">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-3000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image.src})` }}
                />
                {/* Light Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 backdrop-blur-[1px]" />
              </div>
            ))}

            {/* Navigation Buttons with Glass Effect */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4 text-white drop-shadow-md" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
            >
              <ChevronRight className="h-4 w-4 text-white drop-shadow-md" />
            </button>

            {/* Glass Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 backdrop-blur-md bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentImageIndex
                      ? 'bg-white scale-110 shadow-lg'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
          {/* Form Title */}
          <div className="text-center mb-8 animate-in fade-in duration-700 delay-300">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
              Kalro Admin Portal
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Kenya Agricultural and Livestock Research Organization
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 animate-in shake duration-500">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-gray-700 font-medium transition-colors duration-200 group-hover:text-[#007A33]">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-hover:text-[#007A33]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kalro.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                  className="pl-10 h-12 border-gray-200 focus:border-[#007A33] focus:ring-[#007A33] rounded-lg transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="password" className="text-gray-700 font-medium transition-colors duration-200 group-hover:text-[#007A33]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-hover:text-[#007A33]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                  className="pl-10 pr-12 h-12 border-gray-200 focus:border-[#007A33] focus:ring-[#007A33] rounded-lg transition-all duration-300"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent transition-all duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 transition-colors duration-200 hover:text-[#007A33]" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 transition-colors duration-200 hover:text-[#007A33]" />
                  )}
                </Button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center py-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="w-4 h-4"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </Label>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-green-800 hover:bg-green-900 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <KALROLoadingSpinner />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>

            {/* Demo Credentials */}
            <div className="mt-6 text-center animate-in fade-in duration-700 delay-700">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2 font-medium">Demo credentials:</p>
                <div className="font-mono text-xs bg-white p-3 rounded border border-gray-200">
                  <p className="text-gray-700">Email: admin@kalro.org</p>
                  <p className="text-gray-700">Password: admin123</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button className="text-sm text-gray-600 hover:text-[#007A33] transition-all duration-300 hover:scale-105 transform">
                ← Back to Knowledge Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}