"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
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
import { ArrowLeft, Users, Award, Clock, TrendingUp, Edit } from "lucide-react"

interface CourseStatisticsPageProps {
  courseId: string
}

const courseData = {
  javascript: {
    title: "Introduction au JavaScript",
    students: 245,
    completion: 87,
    avgScore: 84,
    avgTime: "4.2h",
  },
  react: {
    title: "React pour Débutants",
    students: 189,
    completion: 72,
    avgScore: 78,
    avgTime: "3.8h",
  },
  nodejs: {
    title: "Node.js et Express",
    students: 156,
    completion: 91,
    avgScore: 89,
    avgTime: "5.1h",
  },
}

const chapterData = [
  { chapter: "Introduction", views: 95, completion: 92, avgScore: 88 },
  { chapter: "Variables", views: 88, completion: 85, avgScore: 82 },
  { chapter: "Fonctions", views: 82, completion: 78, avgScore: 79 },
  { chapter: "DOM", views: 75, completion: 70, avgScore: 75 },
  { chapter: "Événements", views: 68, completion: 65, avgScore: 71 },
]

const progressData = [
  { week: "S1", enrolled: 50, completed: 45 },
  { week: "S2", enrolled: 120, completed: 98 },
  { week: "S3", enrolled: 180, completed: 145 },
  { week: "S4", enrolled: 245, completed: 213 },
]

const scoreDistribution = [
  { name: "Excellent (90-100%)", value: 35, color: "#10B981" },
  { name: "Bien (80-89%)", value: 40, color: "#F18A00" },
  { name: "Moyen (70-79%)", value: 20, color: "#F59E0B" },
  { name: "À améliorer (<70%)", value: 5, color: "#EF4444" },
]

export function CourseStatisticsPage({ courseId }: CourseStatisticsPageProps) {
  const router = useRouter()
  const course = courseData[courseId as keyof typeof courseData] || courseData.javascript

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} className="text-[#0A1F44] hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#0A1F44] font-heading">{course.title}</h1>
            <p className="text-gray-600">Statistiques détaillées du cours</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/teacher/courses/${courseId}/edit`)}
          className="bg-[#F18A00] hover:bg-[#E07A00] text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier le cours
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-[#0A1F44] to-[#1E3A8A] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Étudiants inscrits</p>
                <p className="text-3xl font-bold">{course.students}</p>
                <p className="text-sm text-blue-200 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15% ce mois
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#F18A00] to-[#E07A00] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Taux de complétion</p>
                <p className="text-3xl font-bold">{course.completion}%</p>
                <p className="text-sm text-orange-200 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8% ce mois
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Score moyen</p>
                <p className="text-3xl font-bold">{course.avgScore}%</p>
                <p className="text-sm text-green-200 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2% ce mois
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
                <p className="text-purple-100">Temps moyen</p>
                <p className="text-3xl font-bold">{course.avgTime}</p>
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Progress Over Time */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading">Progression dans le temps</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="enrolled" stroke="#0A1F44" strokeWidth={2} name="Inscrits" />
                <Line type="monotone" dataKey="completed" stroke="#F18A00" strokeWidth={2} name="Terminé" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <CardTitle className="text-[#0A1F44] font-heading">Répartition des scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Chapter Performance */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Performance par chapitre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {chapterData.map((chapter, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#0A1F44]">{chapter.chapter}</span>
                <div className="flex space-x-4 text-sm">
                  <span className="text-gray-600">{chapter.views}% vues</span>
                  <span className="text-[#F18A00] font-medium">{chapter.completion}% terminé</span>
                  <Badge className="bg-green-100 text-green-800">Score: {chapter.avgScore}%</Badge>
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
  )
}
