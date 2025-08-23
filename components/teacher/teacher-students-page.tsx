"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, TrendingUp } from "lucide-react"
import { useState } from "react"

const students = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie.dupont@email.com",
    course: "Introduction au JavaScript",
    progress: 75,
    lastActivity: "Il y a 2 heures",
    status: "Actif",
    grade: 85,
  },
  {
    id: 2,
    name: "Pierre Martin",
    email: "pierre.martin@email.com",
    course: "JavaScript Avancé",
    progress: 45,
    lastActivity: "Il y a 1 jour",
    status: "Actif",
    grade: 78,
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    course: "React pour Débutants",
    progress: 90,
    lastActivity: "Il y a 30 minutes",
    status: "Actif",
    grade: 92,
  },
  {
    id: 4,
    name: "Thomas Dubois",
    email: "thomas.dubois@email.com",
    course: "Node.js et Express",
    progress: 20,
    lastActivity: "Il y a 5 jours",
    status: "Inactif",
    grade: 65,
  },
]

export function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const courses = [
    "all",
    "Introduction au JavaScript",
    "JavaScript Avancé",
    "React pour Débutants",
    "Node.js et Express",
  ]
  const statuses = ["all", "Actif", "Inactif"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  const handleContactStudent = (studentId: number) => {
    alert(`Contacter l'étudiant ${studentId}`)
  }

  const handleViewProgress = (studentId: number) => {
    window.location.href = `/teacher/student/${studentId}/progress`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Gestion des étudiants</h1>
        <p className="text-gray-600">Suivez la progression de vos étudiants</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-[#0A1F44] to-[#1E3A8A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Étudiants totaux</p>
                <p className="text-3xl font-bold">{students.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Étudiants actifs</p>
                <p className="text-3xl font-bold">{students.filter((s) => s.status === "Actif").length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#F18A00] to-[#E07A00] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Progression moyenne</p>
                <p className="text-3xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Note moyenne</p>
                <p className="text-3xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.grade, 0) / students.length)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
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
                  placeholder="Rechercher un étudiant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les cours</SelectItem>
                {courses.slice(1).map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {statuses.slice(1).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Liste des étudiants ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0A1F44]">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{student.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#F18A00] h-2 rounded-full" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        student.grade >= 80
                          ? "bg-green-100 text-green-800"
                          : student.grade >= 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {student.grade}/100
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        student.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{student.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleContactStudent(student.id)}>
                        <Mail className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewProgress(student.id)}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Progrès
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
  )
}
