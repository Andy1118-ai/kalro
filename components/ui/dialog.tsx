"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Download, X } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Animation class constants ---
const overlayAnimation =
  "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out " +
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"

const getPositionClasses = (position: 'center' | 'top' | 'bottom') => {
  switch (position) {
    case 'top':
      return 'fixed left-1/2 top-0 -translate-x-1/2 translate-y-0'
    case 'bottom':
      return 'fixed left-1/2 bottom-0 -translate-x-1/2 translate-y-0'
    default:
      return 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
  }
}

const getAnimationClasses = (position: 'center' | 'top' | 'bottom') => {
  switch (position) {
    case 'top':
      return 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top'
    case 'bottom':
      return 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom'
    default:
      return 'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
  }
}

const baseContentAnimation = 
  "z-50 grid w-full gap-4 " +
  "shadow-2xl border border-white/20 " +
  "bg-white/10 backdrop-blur-xl " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out " +
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"

// --- Size map for DialogContent ---
const sizeClasses = {
  sm: "max-w-sm p-5",
  md: "max-w-md p-6",
  lg: "max-w-lg p-8",
  xl: "max-w-xl p-10",
} as const

// --- Overlay ---
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(overlayAnimation, className)}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

// --- Content ---
interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: keyof typeof sizeClasses
  onDownload?: () => void
  fullScreen?: boolean
  position?: 'center' | 'top' | 'bottom'
  animationDuration?: number
  disableEscapeKey?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ 
  className, 
  children, 
  size = "lg", 
  onDownload,
  fullScreen = false,
  position = 'center',
  animationDuration = 200,
  disableEscapeKey = false,
  ...props 
}, ref) => {
  // Handle escape key
  React.useEffect(() => {
    if (disableEscapeKey) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [disableEscapeKey])

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        style={{ 
          '--animation-duration': `${animationDuration}ms`
        } as React.CSSProperties}
        className={cn(
          baseContentAnimation,
          getPositionClasses(position),
          getAnimationClasses(position),
          fullScreen ? 'h-screen w-screen sm:h-auto sm:w-full' : sizeClasses[size],
          !fullScreen && 'sm:rounded-2xl',
          "duration-[var(--animation-duration)]",
          className
        )}
        onOpenAutoFocus={(e) => {
          if (disableEscapeKey) {
            e.preventDefault()
          }
        }}
        {...props}
      >

        {/* Top-right icon actions */}
        <div className={cn(
          "absolute right-4 flex items-center gap-2",
          fullScreen ? "top-6" : "top-4"
        )}>
          {onDownload && (
            <button
              onClick={onDownload}
              className="rounded-full bg-white/20 p-2 opacity-80 hover:opacity-100 hover:scale-105 transition-all 
                         ring-offset-background focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 backdrop-blur-sm"
            >
              <Download className="h-4 w-4 text-white drop-shadow-md" />
              <span className="sr-only">Download</span>
            </button>
          )}

          <DialogPrimitive.Close
            className="rounded-full bg-white/20 p-2 opacity-80 hover:opacity-100 hover:scale-105 transition-all 
                       ring-offset-background focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 backdrop-blur-sm"
          >
            <X className="h-4 w-4 text-white drop-shadow-md" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>

        <div role="dialog" 
             aria-modal="true" 
             className={cn(
               "focus:outline-none",
               fullScreen && "h-full overflow-y-auto"
             )}>
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})
DialogContent.displayName = "DialogContent"

// --- Header / Title / Description ---
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-2xl font-bold tracking-tight text-white drop-shadow-sm", className)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-white/80 drop-shadow-sm", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

// --- Exports ---
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
