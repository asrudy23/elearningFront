"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Clock, Users, BookOpen, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

const enrolledCourses = [
  {
    id: 1,
    title: "JavaScript Avancé",
    instructor: "Marie Dubois",
    description: "Maîtrisez les concepts avancés de JavaScript et les frameworks modernes",
    image: "/javascript-course.png",
    level: "Avancé",
    duration: "8 semaines",
    students: 1250,
    rating: 4.8,
    category: "Programmation",
    progress: 75,
    lastAccessed: "Il y a 2 jours",
    status: "En cours",
    completedLessons: 15,
    totalLessons: 20,
  },
  {
    id: 2,
    title: "Design avec Figma",
    instructor: "Thomas Martin",
    description: "Apprenez à créer des interfaces utilisateur modernes avec Figma",
    image: "/figma-design-course.png",
    level: "Intermédiaire",
    duration: "6 semaines",
    students: 890,
    rating: 4.9,
    category: "Design",
    progress: 100,
    lastAccessed: "Il y a 1 semaine",
    status: "Terminé",
    completedLessons: 12,
    totalLessons: 12,
  },
  {
    id: 3,
    title: "Photographie Professionnelle",
    instructor: "Sophie Laurent",
    description: "Techniques avancées de photographie et post-traitement",
    image: "/photography-course.png",
    level: "Intermédiaire",
    duration: "10 semaines",
    students: 567,
    rating: 4.7,
    category: "Art",
    progress: 30,
    lastAccessed: "Il y a 5 jours",
    status: "En cours",
    completedLessons: 6,
    totalLessons: 20,
  },
]

export function CoursesListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const categories = ["all", "Programmation", "Design", "Art", "Marketing", "Management"]
  const statuses = ["all", "En cours", "Terminé", "Non commencé"]

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string, progress: number) => {
    if (status === "Terminé") {
      return <Badge className="bg-green-100 text-green-800">Terminé</Badge>
    } else if (progress > 0) {
      return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Non commencé</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Mes cours</h1>
          <p className="text-gray-600">Vos cours validés et accessibles</p>
        </div>
        <Button asChild className="bg-[#F18A00] hover:bg-[#E07A00]">
          <Link href="/student/formation-epg">
            <Search className="w-4 h-4 mr-2" />
            Découvrir plus de cours
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Cours inscrits</p>
                <p className="text-2xl font-bold text-[#0A1F44]">{enrolledCourses.length}</p>
              </div>
              <div className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Cours en cours</p>
                <p className="text-2xl font-bold text-blue-600">
                  {enrolledCourses.filter((c) => c.status === "En cours").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Cours terminés</p>
                <p className="text-2xl font-bold text-green-600">
                  {enrolledCourses.filter((c) => c.status === "Terminé").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg epg-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher dans mes cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {statuses.slice(1).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-gray-600 mb-6">
          {filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? "s" : ""}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {getStatusBadge(course.status, course.progress)}
                  <div className="absolute top-3 left-3 bg-[#0A1F44] text-white px-2 py-1 rounded text-sm font-medium">
                    {course.progress}% terminé
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg font-semibold text-[#0A1F44] font-heading mb-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">Par {course.instructor}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>
                      {course.completedLessons}/{course.totalLessons} leçons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#F18A00] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {course.category}
                  </Badge>
                </div>

                <p className="text-xs text-gray-500">Dernier accès: {course.lastAccessed}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white">
                  <Link href={`/student/course/${course.id}`}>
                    {course.progress === 100 ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Revoir le cours
                      </>
                    ) : course.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continuer
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Commencer
                      </>
                    )}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Aucun cours trouvé avec ces critères.</p>
          <Button asChild className="bg-[#F18A00] hover:bg-[#E07A00]">
            <Link href="/student/formation-epg">Découvrir des cours</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
