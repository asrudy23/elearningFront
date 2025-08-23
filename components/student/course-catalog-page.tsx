"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, Users, Star, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allCourses = [
  {
    id: 1,
    title: "JavaScript Avancé",
    description: "Maîtrisez les concepts avancés de JavaScript et les frameworks modernes",
    instructor: "Marie Dubois",
    instructorAvatar: "/teacher-avatar.png",
    image: "/javascript-course.png",
    duration: "8 semaines",
    students: 1250,
    rating: 4.8,
    price: "Gratuit",
    category: "Programmation",
    level: "Avancé",
    enrolled: true,
  },
  {
    id: 2,
    title: "Design avec Figma",
    description: "Apprenez à créer des interfaces utilisateur modernes avec Figma",
    instructor: "Thomas Martin",
    instructorAvatar: "/male-teacher-avatar.png",
    image: "/figma-design-course.png",
    duration: "6 semaines",
    students: 890,
    rating: 4.9,
    price: "Gratuit",
    category: "Design",
    level: "Intermédiaire",
    enrolled: true,
  },
  {
    id: 3,
    title: "Photographie Professionnelle",
    description: "Techniques avancées de photographie et post-traitement",
    instructor: "Sophie Laurent",
    instructorAvatar: "/teacher-avatar.png",
    image: "/photography-course.png",
    duration: "10 semaines",
    students: 567,
    rating: 4.7,
    price: "Gratuit",
    category: "Art",
    level: "Intermédiaire",
    enrolled: true,
  },
  {
    id: 4,
    title: "Marketing Digital",
    description: "Stratégies complètes de marketing digital et réseaux sociaux",
    instructor: "Pierre Moreau",
    instructorAvatar: "/male-teacher-avatar.png",
    image: "/digital-marketing-course.png",
    duration: "12 semaines",
    students: 2100,
    rating: 4.6,
    price: "Gratuit",
    category: "Marketing",
    level: "Débutant",
    enrolled: false,
  },
  {
    id: 5,
    title: "Python pour Data Science",
    description: "Analyse de données et machine learning avec Python",
    instructor: "Dr. Claire Rousseau",
    instructorAvatar: "/teacher-avatar.png",
    image: "/python-data-science-course.png",
    duration: "14 semaines",
    students: 1800,
    rating: 4.9,
    price: "Gratuit",
    category: "Programmation",
    level: "Avancé",
    enrolled: false,
  },
  {
    id: 6,
    title: "Gestion de Projet Agile",
    description: "Méthodologies Scrum et Kanban pour la gestion de projet",
    instructor: "Jean-Luc Petit",
    instructorAvatar: "/male-teacher-avatar.png",
    image: "/agile-project-course.png",
    duration: "8 semaines",
    students: 1450,
    rating: 4.5,
    price: "Gratuit",
    category: "Management",
    level: "Intermédiaire",
    enrolled: false,
  },
]

const categories = ["Tous", "Programmation", "Design", "Art", "Marketing", "Management"]
const levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"]

export function CourseCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedLevel, setSelectedLevel] = useState("Tous")

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "Tous" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const handleEnroll = (courseId: number) => {
    // Simulate enrollment
    alert("Inscription réussie ! Vous pouvez maintenant accéder au cours.")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">Catalogue de cours</h1>
        <p className="text-gray-600">Découvrez tous les cours disponibles sur la plateforme</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F18A00]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F18A00]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              {course.enrolled && <Badge className="absolute top-2 right-2 bg-green-600">Inscrit</Badge>}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

              <div className="flex items-center space-x-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{course.instructor}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F18A00]">{course.price}</span>
                {course.enrolled ? (
                  <Button asChild size="sm" className="bg-[#0A1F44] hover:bg-[#0A1F44]/90">
                    <Link href={`/student/course/${course.id}`}>
                      <BookOpen className="w-4 h-4 mr-1" />
                      Continuer
                    </Link>
                  </Button>
                ) : (
                  <Button size="sm" className="bg-[#F18A00] hover:bg-[#E07A00]" onClick={() => handleEnroll(course.id)}>
                    S'inscrire
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun cours trouvé avec ces critères.</p>
        </div>
      )}
    </div>
  )
}
