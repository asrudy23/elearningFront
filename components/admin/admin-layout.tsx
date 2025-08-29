/*"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, X, Shield, UserCheck } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Gestion utilisateurs", href: "/admin/users", icon: Users },
  { name: "Gestion cours", href: "/admin/courses", icon: BookOpen },
  { name: "Demandes d'inscription", href: "/admin/enrollments", icon: UserCheck },
  { name: "Paramètres plateforme", href: "/admin/settings", icon: Settings },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Mobile sidebar 
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-heading">EPG – École</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4 p-2 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-600">Mode Administrateur</span>
            </div>
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem("currentUser")
                window.location.href = "/login"
              }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </Button>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar 
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 epg-shadow">
          <div className="flex items-center px-4 py-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-heading">EPG – École</span>
            </Link>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-600">Mode Administrateur</span>
            </div>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem("currentUser")
                window.location.href = "/login"
              }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main content 
      <div className="lg:pl-64">
        {/* Mobile header 
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
*/
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, X, Shield, UserCheck } from "lucide-react"

// --- EXPLICATION 1: Importer notre hook de déconnexion ---
import { useLogoutMutation } from "@/lib/query/mutations/auth.mutation"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Gestion utilisateurs", href: "/admin/users", icon: Users },
  { name: "Gestion cours", href: "/admin/courses", icon: BookOpen },
  { name: "Demandes d'inscription", href: "/admin/enrollments", icon: UserCheck },
  { name: "Paramètres plateforme", href: "/admin/settings", icon: Settings },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // --- EXPLICATION 2: Utiliser le hook ---
  const { mutate: logout, isPending } = useLogoutMutation()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Mobile sidebar (Le style et la structure restent identiques) */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-heading">EPG – École</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4 p-2 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-600">Mode Administrateur</span>
            </div>
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={cn("flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100")} onClick={() => setSidebarOpen(false)}>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            {/* --- EXPLICATION 3: Mettre à jour le bouton --- */}
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => logout()} disabled={isPending}>
              <LogOut className="w-5 h-5 mr-3" />
              {isPending ? "Déconnexion..." : "Déconnexion"}
            </Button>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar (Le style et la structure restent identiques) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 epg-shadow">
          <div className="flex items-center px-4 py-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-[#0A1F44] font-heading">EPG – École</span>
            </Link>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-600">Mode Administrateur</span>
            </div>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={cn("flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", pathname === item.href ? "bg-[#F18A00] text-white" : "text-gray-700 hover:bg-gray-100")}>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            {/* --- EXPLICATION 3 (bis): Mettre à jour le bouton desktop --- */}
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => logout()} disabled={isPending}>
              <LogOut className="w-5 h-5 mr-3" />
              {isPending ? "Déconnexion..." : "Déconnexion"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content (Le style et la structure restent identiques) */}
      <div className="lg:pl-64">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}