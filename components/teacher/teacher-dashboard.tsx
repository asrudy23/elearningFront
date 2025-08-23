"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Users, BookOpen, TrendingUp, BarChart3, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const teacherCourses = [
  {
    id: 1,
    title: "Introduction au JavaScript",
    students: 1250,
    status: "Publié",
    createdDate: "15 Oct 2024",
    lastUpdated: "2 Nov 2024",
  },
  {
    id: 2,
    title: "JavaScript Avancé",
    students: 890,
    status: "Publié",
    createdDate: "20 Sep 2024",
    lastUpdated: "25 Oct 2024",
  },
  {
    id: 3,
    title: "React pour Débutants",
    students: 0,
    status: "Brouillon",
    createdDate: "1 Nov 2024",
    lastUpdated: "5 Nov 2024",
  },
  {
    id: 4,
    title: "Node.js et Express",
    students: 650,
    status: "Publié",
    createdDate: "10 Aug 2024",
    lastUpdated: "15 Oct 2024",
  },
]

export function TeacherDashboard() {
  const [courses, setCourses] = useState(teacherCourses)

  const handleEditCourse = (courseId: number) => {
    window.location.href = `/teacher/courses/edit/${courseId}`
  }

  const handleViewStatistics = (courseId: number) => {
    window.location.href = `/teacher/statistics?course=${courseId}`
  }

  const handleManageStudents = () => {
    window.location.href = `/teacher/students`
  }

  const handlePublishCourse = (courseId: number) => {
    setCourses((prev) => prev.map((course) => (course.id === courseId ? { ...course, status: "Publié" } : course)))
    alert("Cours publié avec succès !")
  }

  const handleViewCourse = (courseId: number) => {
    window.location.href = `/student/course/${courseId}`
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Tableau de bord enseignant</h1>
          <p className="text-gray-600">Bienvenue Prof. Martin ! Gérez vos cours et suivez vos étudiants.</p>
        </div>
        <Button asChild className="bg-[#F18A00] hover:bg-[#E07A00] text-white px-6 py-3 text-lg font-semibold">
          <Link href="/teacher/courses/create">
            <Plus className="w-5 h-5 mr-2" />
            Créer un nouveau cours
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-[#0A1F44] to-[#1E3A8A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Cours créés</p>
                <p className="text-3xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#F18A00] to-[#E07A00] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Étudiants totaux</p>
                <p className="text-3xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Taux de réussite</p>
                <p className="text-3xl font-bold">87%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Note moyenne</p>
                <p className="text-3xl font-bold">4.8</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-[#F18A00] rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#0A1F44] font-heading mb-2">Créer un cours</h3>
            <p className="text-gray-600 text-sm mb-4">Commencez à créer un nouveau cours pour vos étudiants</p>
            <Button
              asChild
              variant="outline"
              className="border-[#F18A00] text-[#F18A00] hover:bg-[#F18A00] hover:text-white bg-transparent"
            >
              <Link href="/teacher/courses/create">Commencer</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-[#0A1F44] rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#0A1F44] font-heading mb-2">Voir les statistiques</h3>
            <p className="text-gray-600 text-sm mb-4">Analysez les performances de vos cours et étudiants</p>
            <Button
              asChild
              variant="outline"
              className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white bg-transparent"
            >
              <Link href="/teacher/statistics">Analyser</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#0A1F44] font-heading mb-2">Gérer les étudiants</h3>
            <p className="text-gray-600 text-sm mb-4">Suivez la progression de vos étudiants</p>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
              onClick={handleManageStudents}
            >
              Gérer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Mes cours</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre du cours</TableHead>
                <TableHead>Nombre d'étudiants inscrits</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière mise à jour</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0A1F44]">{course.title}</p>
                      <p className="text-sm text-gray-500">Créé le {course.createdDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {course.students}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        course.status === "Publié" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{course.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditCourse(course.id)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewStatistics(course.id)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Stats
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewCourse(course.id)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      {course.status === "Brouillon" && (
                        <Button
                          size="sm"
                          className="bg-[#F18A00] hover:bg-[#E07A00] text-white"
                          onClick={() => handlePublishCourse(course.id)}
                        >
                          Publier
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
