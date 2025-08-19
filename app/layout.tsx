import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import  Navbar  from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KALRO Knowledge Bank",
  description: "Access comprehensive agricultural knowledge, research publications, and expert resources across crops, livestock, natural resources, and socio-economics from KALRO.",
  icons: {
    icon: "/kalro.jpeg",
    shortcut: "/kalro.jpeg",
    apple: "/kalro.jpeg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
