/*"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Trophy, MessageCircle } from "lucide-react"
import { useState } from "react"

const currentCourses = [
  {
    id: 1,
    title: "Introduction au JavaScript",
    progress: 75,
    nextLesson: "Les fonctions avancées",
    image: "/javascript-course.png",
  },
  {
    id: 2,
    title: "Design UX/UI avec Figma",
    progress: 45,
    nextLesson: "Prototypage interactif",
    image: "/figma-design-course.png",
  },
  {
    id: 3,
    title: "Marketing Digital",
    progress: 20,
    nextLesson: "SEO et référencement",
    image: "/digital-marketing-course.png",
  },
]

const completedCourses = [
  { id: 1, title: "HTML & CSS Fondamentaux", completedDate: "15 Nov 2024", score: 92 },
  { id: 2, title: "Photographie Numérique", completedDate: "28 Oct 2024", score: 88 },
  { id: 3, title: "Gestion de Projet Agile", completedDate: "12 Oct 2024", score: 95 },
]

const notifications = [
  { id: 1, type: "quiz", message: "Quiz JavaScript disponible", time: "Il y a 2h", link: "/student/quiz/1" },
  {
    id: 2,
    type: "course",
    message: "Nouveau chapitre ajouté en Design UX",
    time: "Il y a 1 jour",
    link: "/student/course/2",
  },
  {
    id: 3,
    type: "achievement",
    message: "Félicitations ! Badge 'Développeur Junior' obtenu",
    time: "Il y a 3 jours",
    link: "/student/profile",
  },
]

export function StudentDashboard() {
  const [showChatbot, setShowChatbot] = useState(false)

  const handleContinueCourse = (courseId: number) => {
    window.location.href = `/student/course/${courseId}`
  }

  const handleDownloadCertificate = (courseId: number) => {
    window.location.href = `/student/certificate/${courseId}`
  }

  const handleNotificationClick = (link: string) => {
    window.location.href = link
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section 
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue Marie ! Continuez votre parcours d'apprentissage.</p>
      </div>

      {/* Stats Cards 
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-[#0A1F44] to-[#1E3A8A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Cours en cours</p>
                <p className="text-3xl font-bold">{currentCourses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#F18A00] to-[#E07A00] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Cours terminés</p>
                <p className="text-3xl font-bold">{completedCourses.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Score moyen</p>
                <p className="text-3xl font-bold">92%</p>
              </div>
              <Trophy className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Courses 
        <div className="lg:col-span-2">
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Mes cours en cours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0A1F44]">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Prochaine leçon: {course.nextLesson}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm font-medium text-[#F18A00]">{course.progress}%</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#F18A00] hover:bg-[#E07A00] text-white"
                    onClick={() => handleContinueCourse(course.id)}
                  >
                    Continuer
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar 
        <div className="space-y-6">
          {/* Notifications 
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleNotificationClick(notification.link)}
                >
                  <p className="text-sm font-medium text-[#0A1F44]">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Help Section 
          <Card className="bg-gradient-to-br from-[#F18A00] to-[#E07A00] text-white">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-orange-100" />
              <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
              <p className="text-sm text-orange-100 mb-4">Notre assistant IA est là pour vous accompagner</p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-[#F18A00] hover:bg-gray-100"
                onClick={() => setShowChatbot(true)}
              >
                Poser une question
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Completed Courses 
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Historique des cours terminés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-[#0A1F44]">{course.title}</h3>
                  <p className="text-sm text-gray-600">Terminé le {course.completedDate}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800">Score: {course.score}%</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadCertificate(course.id)}>
                    Certificat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simple Chatbot Modal 
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#0A1F44]">Assistant IA</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowChatbot(false)}>
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Tapez votre question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F18A00]"
                />
                <Button size="sm" className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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