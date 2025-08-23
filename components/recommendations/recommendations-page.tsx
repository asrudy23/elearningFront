"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users } from "lucide-react"

const recommendedCourses = [
  {
    id: 1,
    title: "Introduction au JavaScript",
    description: "Apprenez les bases du JavaScript moderne avec des projets pratiques.",
    image: "/javascript-course.png",
    level: "Débutant",
    duration: "8 heures",
    students: 1250,
    rating: 4.8,
    category: "Programmation",
  },
  {
    id: 2,
    title: "Design UX/UI avec Figma",
    description: "Maîtrisez les principes du design et créez des interfaces utilisateur modernes.",
    image: "/figma-design-course.png",
    level: "Intermédiaire",
    duration: "12 heures",
    students: 890,
    rating: 4.9,
    category: "Design",
  },
  {
    id: 3,
    title: "Marketing Digital Avancé",
    description: "Développez vos compétences en marketing digital et stratégies de croissance.",
    image: "/digital-marketing-course.png",
    level: "Avancé",
    duration: "15 heures",
    students: 650,
    rating: 4.7,
    category: "Marketing",
  },
  {
    id: 4,
    title: "Analyse Financière",
    description: "Comprenez les états financiers et prenez de meilleures décisions d'investissement.",
    image: "/finance-analysis-course.png",
    level: "Intermédiaire",
    duration: "10 heures",
    students: 420,
    rating: 4.6,
    category: "Finance",
  },
]

export function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Bienvenue, Marie !</h1>
          <p className="text-xl text-gray-600">Voici des cours recommandés pour vous par notre IA</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge
                    className={`absolute top-3 right-3 ${
                      course.level === "Débutant"
                        ? "bg-green-100 text-green-800"
                        : course.level === "Intermédiaire"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg font-semibold text-[#0A1F44] font-heading mb-2">{course.title}</CardTitle>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {course.category}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-[#F18A00] hover:bg-[#E07A00] text-white">S'inscrire</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <Button
            variant="outline"
            className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white bg-transparent"
          >
            Parcourir tous les cours
          </Button>
        </div>
      </div>
    </div>
  )
}
