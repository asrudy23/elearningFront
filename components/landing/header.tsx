"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">E</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#0A1F44] font-sans">EPG – École</span>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="text-sm lg:text-base text-gray-600 hover:text-[#0A1F44] transition-colors cursor-pointer"
            >
              Fonctionnalités
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="text-sm lg:text-base text-gray-600 hover:text-[#0A1F44] transition-colors cursor-pointer"
            >
              Témoignages
            </a>
            <a
              href="#partners"
              onClick={(e) => handleSmoothScroll(e, "partners")}
              className="text-sm lg:text-base text-gray-600 hover:text-[#0A1F44] transition-colors cursor-pointer"
            >
              Partenaires
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button variant="ghost" asChild className="text-[#0A1F44] hover:bg-gray-50 text-sm lg:text-base">
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild className="bg-[#F18A00] hover:bg-[#E07A00] text-white text-sm lg:text-base">
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-3">
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, "features")}
                className="text-gray-600 hover:text-[#0A1F44] transition-colors py-2 cursor-pointer"
              >
                Fonctionnalités
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleSmoothScroll(e, "testimonials")}
                className="text-gray-600 hover:text-[#0A1F44] transition-colors py-2 cursor-pointer"
              >
                Témoignages
              </a>
              <a
                href="#partners"
                onClick={(e) => handleSmoothScroll(e, "partners")}
                className="text-gray-600 hover:text-[#0A1F44] transition-colors py-2 cursor-pointer"
              >
                Partenaires
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button variant="ghost" asChild className="text-[#0A1F44] hover:bg-gray-50 justify-start">
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  <Link href="/register">S'inscrire</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
