"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

const navItems = [
  { name: { en: "Home", kr: "홈" }, href: "/" },
  { name: { en: "News", kr: "뉴스" }, href: "/news" },
  { name: { en: "About", kr: "소개" }, href: "/about" },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Korean Daily San Francisco" width={180} height={60} className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-red-600 relative ${
                pathname === item.href
                  ? "text-red-600 after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-red-600"
                  : "text-gray-700"
              }`}
            >
              {language === "en" ? item.name.en : item.name.kr}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600"
            >
              <Link href="/admin">{language === "en" ? "Admin" : "관리자"}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
          <div className="container py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-red-50 text-red-700 border-l-4 border-red-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? item.name.en : item.name.kr}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Button asChild size="sm" className="w-full bg-gradient-to-r from-amber-500 to-red-500">
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                  {language === "en" ? "Admin Portal" : "관리자 포털"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
