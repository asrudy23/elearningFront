"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, BookOpen, Trophy, Edit2 } from "lucide-react"

export function StudentProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  if (!user) return <div>Chargement...</div>

  const enrolledCourses = [
    { id: 1, title: "JavaScript Avancé", progress: 75, status: "En cours" },
    { id: 2, title: "Design avec Figma", progress: 100, status: "Terminé" },
    { id: 3, title: "Photographie", progress: 45, status: "En cours" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A1F44]">Mon Profil</h1>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#F18A00] hover:bg-[#E07A00]">
          <Edit2 className="w-4 h-4 mr-2" />
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informations personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#0A1F44] text-white text-lg">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" value={user.firstName} disabled={!isEditing} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" value={user.lastName} disabled={!isEditing} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled={!isEditing} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="joinDate">Date d'inscription</Label>
                  <Input id="joinDate" value="15 janvier 2024" disabled className="mt-1" />
                </div>
              </div>

              {user.interests && (
                <div>
                  <Label>Centres d'intérêt</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.interests.map((interest: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {isEditing && <Button className="bg-[#F18A00] hover:bg-[#E07A00]">Sauvegarder les modifications</Button>}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Statistiques</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F18A00]">3</div>
                <div className="text-sm text-gray-600">Cours suivis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0A1F44]">1</div>
                <div className="text-sm text-gray-600">Cours terminés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">73%</div>
                <div className="text-sm text-gray-600">Progression moyenne</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Mes cours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <Progress value={course.progress} className="flex-1 max-w-xs" />
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                    <Badge variant={course.status === "Terminé" ? "default" : "secondary"}>{course.status}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {course.status === "Terminé" ? "Revoir" : "Continuer"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
