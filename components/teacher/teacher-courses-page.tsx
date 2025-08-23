"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Eye, Trash2, Users } from "lucide-react"
import Link from "next/link"

const initialCourses = [
  {
    id: 1,
    title: "Introduction au JavaScript",
    students: 1250,
    status: "Publié",
    createdDate: "15 Oct 2024",
    lastUpdated: "2 Nov 2024",
    category: "Programmation",
  },
  {
    id: 2,
    title: "JavaScript Avancé",
    students: 890,
    status: "Publié",
    createdDate: "20 Sep 2024",
    lastUpdated: "25 Oct 2024",
    category: "Programmation",
  },
  {
    id: 3,
    title: "React pour Débutants",
    students: 0,
    status: "Brouillon",
    createdDate: "1 Nov 2024",
    lastUpdated: "5 Nov 2024",
    category: "Programmation",
  },
  {
    id: 4,
    title: "Node.js et Express",
    students: 650,
    status: "Publié",
    createdDate: "10 Aug 2024",
    lastUpdated: "15 Oct 2024",
    category: "Programmation",
  },
  {
    id: 5,
    title: "Design UX/UI avec Figma",
    students: 423,
    status: "Publié",
    createdDate: "5 Sep 2024",
    lastUpdated: "20 Oct 2024",
    category: "Design",
  },
]

export function TeacherCoursesPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tous")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "Tous" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleEditCourse = (courseId: number) => {
    window.location.href = `/teacher/courses/edit/${courseId}`
  }

  const handleViewStatistics = (courseId: number) => {
    window.location.href = `/teacher/statistics?course=${courseId}`
  }

  const handleDeleteCourse = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId)
    if (
      course &&
      confirm(
        `Êtes-vous sûr de vouloir supprimer "${course.title}" ?\n\nCette action est irréversible et supprimera également toutes les données associées.`,
      )
    ) {
      setCourses((prev) => prev.filter((course) => course.id !== courseId))
      alert("Cours supprimé avec succès !")
    }
  }

  const handlePublishCourse = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId)
    if (course && confirm(`Publier le cours "${course.title}" ?\n\nIl sera visible par tous les étudiants.`)) {
      setCourses((prev) => prev.map((course) => (course.id === courseId ? { ...course, status: "Publié" } : course)))
      alert("Cours publié avec succès !")
    }
  }

  const handleDuplicateCourse = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      const newCourse = {
        ...course,
        id: Math.max(...courses.map((c) => c.id)) + 1,
        title: `${course.title} (Copie)`,
        students: 0,
        status: "Brouillon",
        createdDate: new Date().toLocaleDateString("fr-FR"),
        lastUpdated: new Date().toLocaleDateString("fr-FR"),
      }
      setCourses((prev) => [...prev, newCourse])
      alert("Cours dupliqué avec succès !")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1F44]">Mes cours</h1>
          <p className="text-gray-600">Gérez tous vos cours et leur contenu</p>
        </div>
        <Button asChild className="bg-[#F18A00] hover:bg-[#E07A00]">
          <Link href="/teacher/courses/create">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau cours
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F18A00]"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="Publié">Publié</option>
              <option value="Brouillon">Brouillon</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0A1F44]">
            {filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cours</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière MAJ</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0A1F44]">{course.title}</p>
                      <p className="text-sm text-gray-500">Créé le {course.createdDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
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
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewStatistics(course.id)}>
                        <Eye className="w-4 h-4" />
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                        onClick={() => handleDuplicateCourse(course.id)}
                      >
                        Dupliquer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun cours trouvé avec ces critères.</p>
        </div>
      )}
    </div>
  )
}
