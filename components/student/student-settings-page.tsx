"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Bell, HelpCircle, Camera, Save, Mail, Phone, MessageSquare, BookOpen } from "lucide-react"

export function StudentSettingsPage() {
  const [profileData, setProfileData] = useState({
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    bio: "Étudiante passionnée par le développement web et le design UX/UI.",
    avatar: "/student-avatar.png",
    interests: ["JavaScript", "Design", "Photographie"],
  })

  const [notifications, setNotifications] = useState({
    emailCourses: true,
    emailQuiz: true,
    emailMessages: false,
    emailNewsletter: true,
    pushCourses: true,
    pushQuiz: true,
    pushMessages: true,
    pushReminders: false,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressVisible: false,
    achievementsVisible: true,
  })

  const handleSaveProfile = () => {
    alert("Profil sauvegardé avec succès !")
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !")
      return
    }
    alert("Mot de passe modifié avec succès !")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleSaveNotifications = () => {
    alert("Préférences de notifications sauvegardées !")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Paramètres</h1>
        <p className="text-gray-600">Gérez votre compte et vos préférences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Compte</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Aide</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white epg-shadow">
                <CardHeader>
                  <CardTitle className="text-[#0A1F44] font-heading">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#0A1F44] text-white text-lg">
                        {profileData.firstName[0]}
                        {profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      className="border-[#F18A00] text-[#F18A00] hover:bg-[#F18A00] hover:text-white bg-transparent"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Changer la photo
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[#0A1F44] font-medium">
                        Prénom
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[#0A1F44] font-medium">
                        Nom
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-[#0A1F44] font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[#0A1F44] font-medium">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-[#0A1F44] font-medium">
                      Biographie
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="text-[#0A1F44] font-medium">Centres d'intérêt</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="border-[#F18A00] text-[#F18A00]">
                          {interest}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                        + Ajouter
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder les modifications
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Privacy Settings */}
            <div>
              <Card className="bg-white epg-shadow">
                <CardHeader>
                  <CardTitle className="text-[#0A1F44] font-heading">Confidentialité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#0A1F44]">Profil visible</p>
                      <p className="text-sm text-gray-600">Autres utilisateurs peuvent voir votre profil</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, profileVisible: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#0A1F44]">Progression visible</p>
                      <p className="text-sm text-gray-600">Afficher votre progression aux autres</p>
                    </div>
                    <Switch
                      checked={privacy.progressVisible}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, progressVisible: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#0A1F44]">Réussites visibles</p>
                      <p className="text-sm text-gray-600">Partager vos certificats et badges</p>
                    </div>
                    <Switch
                      checked={privacy.achievementsVisible}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, achievementsVisible: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="max-w-2xl">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Changer le mot de passe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-[#0A1F44] font-medium">
                    Mot de passe actuel
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-[#0A1F44] font-medium">
                    Nouveau mot de passe
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                    className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-[#0A1F44] font-medium">
                    Confirmer le nouveau mot de passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                  />
                </div>
                <Button onClick={handleChangePassword} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white epg-shadow mt-6">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Sessions actives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-[#0A1F44]">Session actuelle</p>
                      <p className="text-sm text-gray-600">Chrome sur Windows • Paris, France</p>
                      <p className="text-xs text-gray-500">Dernière activité : maintenant</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Actuelle</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-[#0A1F44]">Mobile</p>
                      <p className="text-sm text-gray-600">Safari sur iPhone • Paris, France</p>
                      <p className="text-xs text-gray-500">Dernière activité : il y a 2 heures</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                    >
                      Déconnecter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="max-w-2xl">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Préférences de notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#0A1F44] mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Notifications par email
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Nouveaux cours</p>
                        <p className="text-sm text-gray-600">Recevoir des notifications pour les nouveaux cours</p>
                      </div>
                      <Switch
                        checked={notifications.emailCourses}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailCourses: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Quiz et évaluations</p>
                        <p className="text-sm text-gray-600">Rappels pour les quiz à venir</p>
                      </div>
                      <Switch
                        checked={notifications.emailQuiz}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailQuiz: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Messages</p>
                        <p className="text-sm text-gray-600">Nouveaux messages des enseignants</p>
                      </div>
                      <Switch
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailMessages: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Newsletter</p>
                        <p className="text-sm text-gray-600">Actualités et conseils d'apprentissage</p>
                      </div>
                      <Switch
                        checked={notifications.emailNewsletter}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, emailNewsletter: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0A1F44] mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications push
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Nouveaux cours</p>
                        <p className="text-sm text-gray-600">Notifications instantanées sur votre appareil</p>
                      </div>
                      <Switch
                        checked={notifications.pushCourses}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushCourses: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Quiz et évaluations</p>
                        <p className="text-sm text-gray-600">Rappels push pour les échéances</p>
                      </div>
                      <Switch
                        checked={notifications.pushQuiz}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushQuiz: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Messages</p>
                        <p className="text-sm text-gray-600">Notifications instantanées des messages</p>
                      </div>
                      <Switch
                        checked={notifications.pushMessages}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushMessages: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Rappels d'étude</p>
                        <p className="text-sm text-gray-600">Rappels pour continuer vos cours</p>
                      </div>
                      <Switch
                        checked={notifications.pushReminders}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushReminders: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les préférences
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Help Tab */}
        <TabsContent value="help">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Centre d'aide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#" className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-3" />
                      Guide de démarrage
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#" className="flex items-center">
                      <HelpCircle className="w-4 h-4 mr-3" />
                      FAQ - Questions fréquentes
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#" className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-3" />
                      Tutoriels vidéo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Contacter le support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full bg-[#F18A00] hover:bg-[#E07A00] text-white" asChild>
                    <a href="mailto:support@epg-ecole.fr" className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-3" />
                      Envoyer un email
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href="tel:+33123456789" className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-3" />
                      Appeler le support
                    </a>
                  </Button>
                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p>Support disponible</p>
                    <p>Lun-Ven : 9h-18h</p>
                    <p>Temps de réponse : 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white epg-shadow mt-8">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Informations système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-[#0A1F44]">Version de l'application</p>
                  <p className="text-gray-600">v2.1.0</p>
                </div>
                <div>
                  <p className="font-medium text-[#0A1F44]">Dernière mise à jour</p>
                  <p className="text-gray-600">15 novembre 2024</p>
                </div>
                <div>
                  <p className="font-medium text-[#0A1F44]">Navigateur</p>
                  <p className="text-gray-600">Chrome 119.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
