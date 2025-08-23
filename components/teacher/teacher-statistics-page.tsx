"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Award, Clock, Target, Eye, Edit } from "lucide-react"

const completionData = [
  { course: "JavaScript", completion: 85 },
  { course: "React", completion: 72 },
  { course: "Node.js", completion: 91 },
  { course: "HTML/CSS", completion: 95 },
]

const engagementData = [
  { month: "Jan", students: 120 },
  { month: "Fév", students: 150 },
  { month: "Mar", students: 180 },
  { month: "Avr", students: 220 },
  { month: "Mai", students: 280 },
  { month: "Jun", students: 320 },
]

const quizData = [
  { name: "Excellent (90-100%)", value: 35, color: "#10B981" },
  { name: "Bien (80-89%)", value: 40, color: "#F18A00" },
  { name: "Moyen (70-79%)", value: 20, color: "#F59E0B" },
  { name: "À améliorer (<70%)", value: 5, color: "#EF4444" },
]

const chapterEngagement = [
  { chapter: "Introduction", views: 95, completion: 92 },
  { chapter: "Variables", views: 88, completion: 85 },
  { chapter: "Fonctions", views: 82, completion: 78 },
  { chapter: "DOM", views: 75, completion: 70 },
  { chapter: "Événements", views: 68, completion: 65 },
]

export function TeacherStatisticsPage() {
  const router = useRouter()

  const handleViewCourseStats = (courseId: string) => {
    router.push(`/teacher/courses/${courseId}/statistics`)
  }

  const handleEditCourse = (courseId: string) => {
    router.push(`/teacher/courses/${courseId}/edit`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Statistiques</h1>
          <p className="text-gray-600">Analysez les performances de vos cours et l'engagement de vos étudiants</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sélectionner un cours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les cours</SelectItem>
            <SelectItem value="javascript">Introduction au JavaScript</SelectItem>
            <SelectItem value="react">React pour Débutants</SelectItem>
            <SelectItem value="nodejs">Node.js et Express</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-[#0A1F44] to-[#1E3A8A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Taux de complétion moyen</p>
                <p className="text-3xl font-bold">87%</p>
                <p className="text-sm text-blue-200 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5% ce mois
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#F18A00] to-[#E07A00] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Étudiants actifs</p>
                <p className="text-3xl font-bold">2,790</p>
                <p className="text-sm text-orange-200 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% ce mois
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Score moyen aux quiz</p>
                <p className="text-3xl font-bold">84%</p>
                <p className="text-sm text-green-200 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3% ce mois
                </p>
              </div>
              <Award className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Temps moyen par cours</p>
                <p className="text-3xl font-bold">4.2h</p>
                <p className="text-sm text-purple-200 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  Stable
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Management Section */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Gestion des cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "javascript", title: "Introduction au JavaScript", students: 245, completion: 87 },
              { id: "react", title: "React pour Débutants", students: 189, completion: 72 },
              { id: "nodejs", title: "Node.js et Express", students: 156, completion: 91 },
            ].map((course) => (
              <Card key={course.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#0A1F44] mb-2">{course.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Étudiants inscrits</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taux de complétion</span>
                      <span className="font-medium">{course.completion}%</span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewCourseStats(course.id)}
                      className="flex-1 border-[#F18A00] text-[#F18A00] hover:bg-[#F18A00] hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Stats
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEditCourse(course.id)}
                      className="flex-1 bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Completion Rates */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading">Taux de complétion par cours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completion" fill="#F18A00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading">Évolution des inscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#0A1F44"
                  strokeWidth={3}
                  dot={{ fill: "#F18A00", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quiz Results */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading">Répartition des résultats aux quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={quizData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {quizData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chapter Engagement */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading">Engagement par chapitre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {chapterEngagement.map((chapter, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#0A1F44]">{chapter.chapter}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-gray-600">{chapter.views}% vues</span>
                    <span className="text-[#F18A00] font-medium">{chapter.completion}% terminé</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={chapter.views} className="h-2" />
                  <Progress value={chapter.completion} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                student: "Marie Dubois",
                action: "a terminé",
                course: "Introduction au JavaScript",
                time: "Il y a 2h",
                score: 95,
              },
              {
                student: "Thomas Martin",
                action: "a commencé",
                course: "React pour Débutants",
                time: "Il y a 4h",
                score: null,
              },
              {
                student: "Sophie Laurent",
                action: "a obtenu",
                course: "Node.js et Express",
                time: "Il y a 6h",
                score: 88,
              },
              {
                student: "Jean Moreau",
                action: "a terminé le quiz",
                course: "Introduction au JavaScript",
                time: "Il y a 1 jour",
                score: 92,
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#F18A00] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {activity.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0A1F44]">
                      {activity.student} {activity.action} {activity.course}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                {activity.score && <Badge className="bg-green-100 text-green-800">Score: {activity.score}%</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
