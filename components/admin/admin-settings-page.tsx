"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Mail, Shield, Database, Globe, Save } from "lucide-react"

export function AdminSettingsPage() {
  const [platformSettings, setPlatformSettings] = useState({
    siteName: "EPG – École",
    siteDescription: "Plateforme d'apprentissage en ligne moderne et intuitive",
    allowRegistration: true,
    requireEmailVerification: true,
    enableCourseReviews: true,
    enableCertificates: true,
    maintenanceMode: false,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.epg-ecole.fr",
    smtpPort: "587",
    smtpUsername: "noreply@epg-ecole.fr",
    smtpPassword: "",
    fromEmail: "noreply@epg-ecole.fr",
    fromName: "EPG École",
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    allowGoogleAuth: true,
  })

  const [systemInfo] = useState({
    version: "2.1.0",
    database: "PostgreSQL 14.2",
    storage: "85% utilisé (42.5 GB / 50 GB)",
    uptime: "15 jours, 8 heures",
    lastBackup: "Aujourd'hui à 03:00",
  })

  const handleSavePlatform = () => {
    alert("Paramètres de la plateforme sauvegardés !")
  }

  const handleSaveEmail = () => {
    alert("Configuration email sauvegardée !")
  }

  const handleSaveSecurity = () => {
    alert("Paramètres de sécurité sauvegardés !")
  }

  const handleBackup = () => {
    alert("Sauvegarde lancée ! Vous recevrez une notification une fois terminée.")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Paramètres de la plateforme</h1>
        <p className="text-gray-600">Configuration générale et administration système</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="platform" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Plateforme</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Système</span>
          </TabsTrigger>
        </TabsList>

        {/* Platform Tab */}
        <TabsContent value="platform">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Configuration générale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName" className="text-[#0A1F44] font-medium">
                    Nom du site
                  </Label>
                  <Input
                    id="siteName"
                    value={platformSettings.siteName}
                    onChange={(e) => setPlatformSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription" className="text-[#0A1F44] font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="siteDescription"
                    value={platformSettings.siteDescription}
                    onChange={(e) => setPlatformSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <Button onClick={handleSavePlatform} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Fonctionnalités</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#0A1F44]">Inscriptions ouvertes</p>
                    <p className="text-sm text-gray-600">Permettre aux nouveaux utilisateurs de s'inscrire</p>
                  </div>
                  <Switch
                    checked={platformSettings.allowRegistration}
                    onCheckedChange={(checked) =>
                      setPlatformSettings((prev) => ({ ...prev, allowRegistration: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#0A1F44]">Vérification email</p>
                    <p className="text-sm text-gray-600">Exiger la vérification de l'email</p>
                  </div>
                  <Switch
                    checked={platformSettings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      setPlatformSettings((prev) => ({ ...prev, requireEmailVerification: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#0A1F44]">Avis sur les cours</p>
                    <p className="text-sm text-gray-600">Permettre aux étudiants de noter les cours</p>
                  </div>
                  <Switch
                    checked={platformSettings.enableCourseReviews}
                    onCheckedChange={(checked) =>
                      setPlatformSettings((prev) => ({ ...prev, enableCourseReviews: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#0A1F44]">Certificats</p>
                    <p className="text-sm text-gray-600">Générer des certificats de réussite</p>
                  </div>
                  <Switch
                    checked={platformSettings.enableCertificates}
                    onCheckedChange={(checked) =>
                      setPlatformSettings((prev) => ({ ...prev, enableCertificates: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#0A1F44]">Mode maintenance</p>
                    <p className="text-sm text-gray-600">Désactiver temporairement le site</p>
                  </div>
                  <Switch
                    checked={platformSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setPlatformSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email">
          <div className="max-w-2xl">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Configuration SMTP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost" className="text-[#0A1F44] font-medium">
                      Serveur SMTP
                    </Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpHost: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort" className="text-[#0A1F44] font-medium">
                      Port
                    </Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpPort: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="smtpUsername" className="text-[#0A1F44] font-medium">
                    Nom d'utilisateur
                  </Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpUsername: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword" className="text-[#0A1F44] font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpPassword: e.target.value }))}
                    className="mt-1"
                    placeholder="••••••••"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromEmail" className="text-[#0A1F44] font-medium">
                      Email expéditeur
                    </Label>
                    <Input
                      id="fromEmail"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, fromEmail: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName" className="text-[#0A1F44] font-medium">
                      Nom expéditeur
                    </Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings((prev) => ({ ...prev, fromName: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleSaveEmail} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline">Tester la configuration</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="max-w-2xl">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Paramètres de sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#0A1F44] mb-4">Politique des mots de passe</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="passwordMinLength" className="text-[#0A1F44] font-medium">
                        Longueur minimale
                      </Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            passwordMinLength: Number.parseInt(e.target.value),
                          }))
                        }
                        className="mt-1 max-w-xs"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Caractères spéciaux requis</p>
                        <p className="text-sm text-gray-600">Exiger au moins un caractère spécial</p>
                      </div>
                      <Switch
                        checked={securitySettings.requireSpecialChars}
                        onCheckedChange={(checked) =>
                          setSecuritySettings((prev) => ({ ...prev, requireSpecialChars: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0A1F44] mb-4">Sessions et connexions</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sessionTimeout" className="text-[#0A1F44] font-medium">
                        Expiration de session (heures)
                      </Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings((prev) => ({ ...prev, sessionTimeout: Number.parseInt(e.target.value) }))
                        }
                        className="mt-1 max-w-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxLoginAttempts" className="text-[#0A1F44] font-medium">
                        Tentatives de connexion max
                      </Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            maxLoginAttempts: Number.parseInt(e.target.value),
                          }))
                        }
                        className="mt-1 max-w-xs"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Authentification à deux facteurs</p>
                        <p className="text-sm text-gray-600">Activer 2FA pour tous les utilisateurs</p>
                      </div>
                      <Switch
                        checked={securitySettings.enableTwoFactor}
                        onCheckedChange={(checked) =>
                          setSecuritySettings((prev) => ({ ...prev, enableTwoFactor: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#0A1F44]">Connexion Google</p>
                        <p className="text-sm text-gray-600">Permettre la connexion via Google</p>
                      </div>
                      <Switch
                        checked={securitySettings.allowGoogleAuth}
                        onCheckedChange={(checked) =>
                          setSecuritySettings((prev) => ({ ...prev, allowGoogleAuth: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSecurity} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les paramètres
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Informations système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0A1F44]">Version</span>
                    <Badge variant="outline">{systemInfo.version}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0A1F44]">Base de données</span>
                    <span className="text-gray-600">{systemInfo.database}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0A1F44]">Stockage</span>
                    <span className="text-gray-600">{systemInfo.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0A1F44]">Uptime</span>
                    <span className="text-gray-600">{systemInfo.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0A1F44]">Dernière sauvegarde</span>
                    <span className="text-gray-600">{systemInfo.lastBackup}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white epg-shadow">
              <CardHeader>
                <CardTitle className="text-[#0A1F44] font-heading">Actions système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button onClick={handleBackup} className="w-full bg-[#F18A00] hover:bg-[#E07A00] text-white">
                    <Database className="w-4 h-4 mr-2" />
                    Lancer une sauvegarde
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Globe className="w-4 h-4 mr-2" />
                    Vider le cache
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Exporter les données utilisateurs
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Logs de sécurité
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
