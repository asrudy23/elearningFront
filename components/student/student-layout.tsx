/*"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, MessageSquare, User, Settings, LogOut, Menu, X, GraduationCap } from "lucide-react"
import { AuthGuard } from "../auth/authGuard"

const navigation = [
  { name: "Tableau de bord", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "Mes cours", href: "/student/courses", icon: BookOpen },
  { name: "Formation EPG", href: "/student/formation-epg", icon: GraduationCap },
  { name: "Historique IA", href: "/student/ai-history", icon: MessageSquare },
  { name: "Profil", href: "/student/profile", icon: User },
  { name: "Paramètres", href: "/student/settings", icon: Settings },
]

interface StudentLayoutProps {
  children: React.ReactNode
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <AuthGuard>
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-sans">EPG – École</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="p-4 sm:p-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-4"
              onClick={() => {
                localStorage.removeItem("currentUser")
                window.location.href = "/login"
              }}
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Déconnexion</span>
            </Button>
          </nav>
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 epg-shadow">
          <div className="flex items-center px-4 xl:px-6 py-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-sans">EPG – École</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 xl:p-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 xl:p-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem("currentUser")
                window.location.href = "/login"
              }}
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:pl-64 xl:pl-72">
        {/* Mobile header 
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium text-gray-600">Mode Étudiant</span>
        </div>

        <main className="p-4 sm:p-6 lg:p-8 xl:p-10">{children}</main>
      </div>
    </div>
    </AuthGuard>
    
  )
}*/
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, MessageSquare, User, Settings, LogOut, Menu, X, GraduationCap } from "lucide-react"

// --- EXPLICATION 1: Importer notre hook de déconnexion ---
import { useLogoutMutation } from "@/lib/query/mutations/auth.mutation"

const navigation = [
  { name: "Tableau de bord", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "Mes cours", href: "/student/courses", icon: BookOpen },
  { name: "Formation EPG", href: "/student/formation-epg", icon: GraduationCap },
  { name: "Historique IA", href: "/student/ai-history", icon: MessageSquare },
  { name: "Profil", href: "/student/profile", icon: User },
  { name: "Paramètres", href: "/student/settings", icon: Settings },
]

interface StudentLayoutProps {
  children: React.ReactNode
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // --- EXPLICATION 2: Utiliser le hook ---
  const { mutate: logout, isPending } = useLogoutMutation()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-sans">EPG – École</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="p-4 sm:p-6 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={cn("flex items-center space-x-3 px-3 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors", pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100")} onClick={() => setSidebarOpen(false)}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
            {/* --- EXPLICATION 3: Mettre à jour le bouton --- */}
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-4" onClick={() => logout()} disabled={isPending}>
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">{isPending ? "Déconnexion..." : "Déconnexion"}</span>
            </Button>
          </nav>
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 epg-shadow">
          <div className="flex items-center px-4 xl:px-6 py-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-sans">EPG – École</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 xl:p-6 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={cn("flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100")}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 xl:p-6 border-t">
            {/* --- EXPLICATION 3 (bis): Mettre à jour le bouton desktop --- */}
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => logout()} disabled={isPending}>
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">{isPending ? "Déconnexion..." : "Déconnexion"}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:pl-64 xl:pl-72">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium text-gray-600">Mode Étudiant</span>
        </div>
        <main className="p-4 sm:p-6 lg:p-8 xl:p-10">{children}</main>
      </div>
    </div>
  )
}
