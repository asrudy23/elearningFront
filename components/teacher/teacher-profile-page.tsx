"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, BookOpen, Users, Trophy, Edit2, Save, Camera } from "lucide-react"

export function TeacherProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    specialties: [],
    experience: "",
    education: "",
  })

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      setUser(userData)
      setProfileData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        bio: "Enseignant passionné avec plus de 5 ans d'expérience dans le développement web et la formation.",
        specialties: ["JavaScript", "React", "Node.js", "Design UX/UI"],
        experience: "5 ans d'expérience en développement web et 3 ans en enseignement",
        education: "Master en Informatique, Université de Paris",
      })
    }
  }, [])

  const handleSave = () => {
    setIsEditing(false)
    alert("Profil mis à jour avec succès !")
  }

  if (!user) return <div>Chargement...</div>

  const teachingStats = {
    totalCourses: 8,
    totalStudents: 1247,
    averageRating: 4.8,
    completionRate: 87,
  }

  const courses = [
    { id: 1, title: "JavaScript Avancé", students: 245, rating: 4.9, status: "Publié" },
    { id: 2, title: "React pour débutants", students: 189, rating: 4.7, status: "Publié" },
    { id: 3, title: "Node.js Backend", students: 156, rating: 4.8, status: "Publié" },
    { id: 4, title: "Design UX/UI", students: 203, rating: 4.6, status: "Brouillon" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A1F44]">Mon Profil Enseignant</h1>
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
                  <AvatarImage src={user.avatar || "/teacher-avatar.png"} />
                  <AvatarFallback className="bg-[#0A1F44] text-white text-lg">
                    {profileData.firstName?.[0]}
                    {profileData.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600">{profileData.email}</p>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Changer
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profileData.email} disabled className="mt-1" />
              </div>

              <div>
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="experience">Expérience</Label>
                <Input
                  id="experience"
                  value={profileData.experience}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="education">Formation</Label>
                <Input
                  id="education"
                  value={profileData.education}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, education: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Spécialités</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                      + Ajouter
                    </Button>
                  )}
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="bg-[#F18A00] hover:bg-[#E07A00]">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les modifications
                </Button>
              )}
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
                <div className="text-3xl font-bold text-[#F18A00]">{teachingStats.totalCourses}</div>
                <div className="text-sm text-gray-600">Cours créés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0A1F44]">{teachingStats.totalStudents}</div>
                <div className="text-sm text-gray-600">Étudiants formés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{teachingStats.averageRating}</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{teachingStats.completionRate}%</div>
                <div className="text-sm text-gray-600">Taux de complétion</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Mes cours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} étudiants
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      {course.rating}/5
                    </div>
                    <Badge variant={course.status === "Publié" ? "default" : "secondary"}>{course.status}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
