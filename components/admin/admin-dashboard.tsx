"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, GraduationCap, BookOpen, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"

const registrationData = [
  { month: "Jan", students: 120, teachers: 8 },
  { month: "Fév", students: 150, teachers: 12 },
  { month: "Mar", students: 180, teachers: 15 },
  { month: "Avr", students: 220, teachers: 18 },
  { month: "Mai", students: 280, teachers: 22 },
  { month: "Jun", students: 320, teachers: 25 },
]

const pendingCourses = [
  {
    id: 1,
    title: "Machine Learning avec Python",
    teacher: "Dr. Sarah Chen",
    submittedDate: "2024-11-15",
    category: "Programmation",
    status: "En attente",
  },
  {
    id: 2,
    title: "Design Thinking Avancé",
    teacher: "Prof. Marc Dubois",
    submittedDate: "2024-11-14",
    category: "Design",
    status: "En attente",
  },
  {
    id: 3,
    title: "Stratégies de Marketing B2B",
    teacher: "Marie Rousseau",
    submittedDate: "2024-11-13",
    category: "Marketing",
    status: "En attente",
  },
  {
    id: 4,
    title: "Blockchain et Cryptomonnaies",
    teacher: "Prof. Jean Martin",
    submittedDate: "2024-11-12",
    category: "Finance",
    status: "En attente",
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1F44] font-heading mb-2">Dashboard Administrateur</h1>
        <p className="text-gray-600">Vue d'ensemble de la plateforme EPG École</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-r from-[#0A1F44] to-[#1E3A8A] text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Étudiants totaux</p>
                <p className="text-2xl sm:text-3xl font-bold">2,847</p>
                <p className="text-xs sm:text-sm text-blue-200 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +12% ce mois
                </p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#F18A00] to-[#E07A00] text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Enseignants</p>
                <p className="text-2xl sm:text-3xl font-bold">127</p>
                <p className="text-xs sm:text-sm text-orange-200 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +8% ce mois
                </p>
              </div>
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Cours publiés</p>
                <p className="text-2xl sm:text-3xl font-bold">456</p>
                <p className="text-xs sm:text-sm text-green-200 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +15% ce mois
                </p>
              </div>
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Cours en attente</p>
                <p className="text-2xl sm:text-3xl font-bold">{pendingCourses.length}</p>
                <p className="text-xs sm:text-sm text-purple-200 flex items-center mt-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />À valider
                </p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Chart and Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Registration Chart */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading text-lg sm:text-xl">Évolution des inscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#0A1F44"
                  strokeWidth={3}
                  name="Étudiants"
                  dot={{ fill: "#0A1F44", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="teachers"
                  stroke="#F18A00"
                  strokeWidth={3}
                  name="Enseignants"
                  dot={{ fill: "#F18A00", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading text-lg sm:text-xl">Statistiques rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[#0A1F44] text-sm sm:text-base">Utilisateurs actifs (7j)</p>
                  <p className="text-xs sm:text-sm text-gray-600">Connexions récentes</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 flex-shrink-0">1,847</p>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F18A00] rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[#0A1F44] text-sm sm:text-base">Cours terminés (30j)</p>
                  <p className="text-xs sm:text-sm text-gray-600">Certifications délivrées</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#F18A00] flex-shrink-0">892</p>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[#0A1F44] text-sm sm:text-base">Taux de satisfaction</p>
                  <p className="text-xs sm:text-sm text-gray-600">Note moyenne des cours</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-600 flex-shrink-0">4.8/5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Courses */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-[#0A1F44] font-heading text-lg sm:text-xl">
              Cours en attente de validation
            </CardTitle>
            <Badge className="bg-purple-100 text-purple-800 w-fit">{pendingCourses.length} en attente</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Titre du cours</TableHead>
                  <TableHead className="min-w-[150px]">Enseignant</TableHead>
                  <TableHead className="min-w-[100px]">Catégorie</TableHead>
                  <TableHead className="min-w-[120px]">Date de soumission</TableHead>
                  <TableHead className="min-w-[80px]">Statut</TableHead>
                  <TableHead className="min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <p className="font-medium text-[#0A1F44]">{course.title}</p>
                    </TableCell>
                    <TableCell className="text-gray-600">{course.teacher}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{course.category}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{course.submittedDate}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">{course.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Valider</span>
                          <span className="sm:hidden">✓</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Refuser</span>
                          <span className="sm:hidden">✗</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
