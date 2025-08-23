"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CheckCircle, XCircle, Trash2, Eye, Filter } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Introduction au JavaScript",
    teacher: "Prof. Martin Dubois",
    category: "Programmation",
    submittedDate: "2024-10-15",
    status: "validated",
    students: 1250,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Machine Learning avec Python",
    teacher: "Dr. Sarah Chen",
    category: "Programmation",
    submittedDate: "2024-11-15",
    status: "pending",
    students: 0,
    rating: null,
  },
  {
    id: 3,
    title: "Design UX/UI avec Figma",
    teacher: "Prof. Sophie Laurent",
    category: "Design",
    submittedDate: "2024-09-20",
    status: "validated",
    students: 890,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Design Thinking Avancé",
    teacher: "Prof. Marc Dubois",
    category: "Design",
    submittedDate: "2024-11-14",
    status: "pending",
    students: 0,
    rating: null,
  },
  {
    id: 5,
    title: "Marketing Digital Avancé",
    teacher: "Prof. Thomas Martin",
    category: "Marketing",
    submittedDate: "2024-08-10",
    status: "validated",
    students: 650,
    rating: 4.7,
  },
  {
    id: 6,
    title: "Stratégies de Marketing B2B",
    teacher: "Marie Rousseau",
    category: "Marketing",
    submittedDate: "2024-11-13",
    status: "pending",
    students: 0,
    rating: null,
  },
  {
    id: 7,
    title: "Analyse Financière",
    teacher: "Prof. Marie Rousseau",
    category: "Finance",
    submittedDate: "2024-07-25",
    status: "validated",
    students: 420,
    rating: 4.6,
  },
  {
    id: 8,
    title: "Blockchain et Cryptomonnaies",
    teacher: "Prof. Jean Martin",
    category: "Finance",
    submittedDate: "2024-11-12",
    status: "pending",
    students: 0,
    rating: null,
  },
  {
    id: 9,
    title: "Photographie Numérique",
    teacher: "Prof. Jean Moreau",
    category: "Créatif",
    submittedDate: "2024-06-15",
    status: "rejected",
    students: 0,
    rating: null,
  },
]

export function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [coursesData, setCoursesData] = useState(courses)

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-green-100 text-green-800">Validé</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Refusé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const categories = ["all", "Programmation", "Design", "Marketing", "Finance", "Créatif"]

  const handleViewCourse = (courseId: number) => {
    window.location.href = `/admin/courses/${courseId}`
  }

  const handleValidateCourse = (courseId: number) => {
    const course = coursesData.find((c) => c.id === courseId)
    if (course && confirm(`Valider le cours "${course.title}" ?`)) {
      setCoursesData((prev) => prev.map((c) => (c.id === courseId ? { ...c, status: "validated" } : c)))
      alert("Cours validé avec succès!")
    }
  }

  const handleRejectCourse = (courseId: number) => {
    const course = coursesData.find((c) => c.id === courseId)
    const reason = prompt("Raison du refus (optionnel):")

    if (course && confirm(`Refuser le cours "${course.title}" ?`)) {
      setCoursesData((prev) => prev.map((c) => (c.id === courseId ? { ...c, status: "rejected" } : c)))
      alert("Cours refusé avec succès!")
    }
  }

  const handleDeleteCourse = (courseId: number) => {
    const course = coursesData.find((c) => c.id === courseId)
    if (course && confirm(`Êtes-vous sûr de vouloir supprimer "${course.title}" ?`)) {
      setCoursesData((prev) => prev.filter((c) => c.id !== courseId))
      alert("Cours supprimé avec succès!")
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Gestion des cours</h1>
          <p className="text-gray-600">Validez, refusez ou gérez les cours de la plateforme</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total cours</p>
                  <p className="text-2xl font-bold text-[#0A1F44]">{coursesData.length}</p>
                </div>
                <div className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{coursesData.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Cours validés</p>
                  <p className="text-2xl font-bold text-green-600">
                    {coursesData.filter((c) => c.status === "validated").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {coursesData.filter((c) => c.status === "validated").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {coursesData.filter((c) => c.status === "pending").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {coursesData.filter((c) => c.status === "pending").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Cours refusés</p>
                  <p className="text-2xl font-bold text-red-600">
                    {coursesData.filter((c) => c.status === "rejected").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {coursesData.filter((c) => c.status === "rejected").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher par titre ou enseignant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="validated">Validés</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="rejected">Refusés</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par catégorie" />
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
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0A1F44] font-heading">Cours ({filteredCourses.length})</CardTitle>
              <Button className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                <Filter className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre du cours</TableHead>
                  <TableHead>Enseignant associé</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date de soumission</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Étudiants</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <p className="font-medium text-[#0A1F44]">{course.title}</p>
                    </TableCell>
                    <TableCell className="text-gray-600">{course.teacher}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{course.category}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{course.submittedDate}</TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                    <TableCell className="text-gray-600">{course.students}</TableCell>
                    <TableCell className="text-gray-600">{course.rating ? `${course.rating}/5` : "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 bg-transparent"
                          onClick={() => handleViewCourse(course.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {course.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleValidateCourse(course.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-red-50 border-red-300 text-red-600 bg-transparent"
                              onClick={() => handleRejectCourse(course.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 border-red-300 text-red-600 bg-transparent"
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
      </div>
    </AdminLayout>
  )
}
