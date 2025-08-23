"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Edit, UserX, Trash2, Filter } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    role: "student",
    registrationDate: "2024-01-15",
    lastLogin: "2024-11-15",
    status: "active",
    avatar: "/professional-woman-smiling.png",
  },
  {
    id: 2,
    name: "Prof. Martin Dubois",
    email: "martin.dubois@epg-ecole.fr",
    role: "teacher",
    registrationDate: "2023-09-10",
    lastLogin: "2024-11-14",
    status: "active",
    avatar: "/professional-man-glasses.png",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    role: "student",
    registrationDate: "2024-03-22",
    lastLogin: "2024-11-13",
    status: "active",
    avatar: "/creative-woman-designer.png",
  },
  {
    id: 4,
    name: "Thomas Martin",
    email: "thomas.martin@email.com",
    role: "student",
    registrationDate: "2024-02-08",
    lastLogin: "2024-10-28",
    status: "inactive",
    avatar: null,
  },
  {
    id: 5,
    name: "Dr. Sarah Chen",
    email: "sarah.chen@epg-ecole.fr",
    role: "teacher",
    registrationDate: "2023-11-05",
    lastLogin: "2024-11-15",
    status: "active",
    avatar: null,
  },
  {
    id: 6,
    name: "Jean Moreau",
    email: "jean.moreau@email.com",
    role: "student",
    registrationDate: "2024-04-12",
    lastLogin: "2024-11-12",
    status: "active",
    avatar: null,
  },
  {
    id: 7,
    name: "Prof. Claire Durand",
    email: "claire.durand@epg-ecole.fr",
    role: "teacher",
    registrationDate: "2023-08-20",
    lastLogin: "2024-11-10",
    status: "active",
    avatar: null,
  },
  {
    id: 8,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    role: "student",
    registrationDate: "2024-05-18",
    lastLogin: "2024-09-15",
    status: "inactive",
    avatar: null,
  },
]

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [usersData, setUsersData] = useState(users)

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "student":
        return <Badge className="bg-blue-100 text-blue-800">Étudiant</Badge>
      case "teacher":
        return <Badge className="bg-[#F18A00] bg-opacity-20 text-[#F18A00]">Enseignant</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleEditUser = (userId: number) => {
    const user = usersData.find((u) => u.id === userId)
    if (user) {
      const newName = prompt("Nouveau nom:", user.name)
      const newEmail = prompt("Nouvel email:", user.email)

      if (newName && newEmail) {
        setUsersData((prev) => prev.map((u) => (u.id === userId ? { ...u, name: newName, email: newEmail } : u)))
        alert("Utilisateur modifié avec succès!")
      }
    }
  }

  const handleToggleUserStatus = (userId: number) => {
    const user = usersData.find((u) => u.id === userId)
    if (user) {
      const newStatus = user.status === "active" ? "inactive" : "active"
      const action = newStatus === "inactive" ? "désactiver" : "activer"

      if (confirm(`Êtes-vous sûr de vouloir ${action} cet utilisateur ?`)) {
        setUsersData((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)))
        alert(`Utilisateur ${action === "désactiver" ? "désactivé" : "activé"} avec succès!`)
      }
    }
  }

  const handleDeleteUser = (userId: number) => {
    const user = usersData.find((u) => u.id === userId)
    if (user && confirm(`Êtes-vous sûr de vouloir supprimer ${user.name} ?`)) {
      setUsersData((prev) => prev.filter((u) => u.id !== userId))
      alert("Utilisateur supprimé avec succès!")
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Gérez les étudiants et enseignants de la plateforme</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total utilisateurs</p>
                  <p className="text-2xl font-bold text-[#0A1F44]">{usersData.length}</p>
                </div>
                <div className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{usersData.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Étudiants</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {usersData.filter((u) => u.role === "student").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{usersData.filter((u) => u.role === "student").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Enseignants</p>
                  <p className="text-2xl font-bold text-[#F18A00]">
                    {usersData.filter((u) => u.role === "teacher").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-[#F18A00] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{usersData.filter((u) => u.role === "teacher").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Utilisateurs actifs</p>
                  <p className="text-2xl font-bold text-green-600">
                    {usersData.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{usersData.filter((u) => u.status === "active").length}</span>
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
                    placeholder="Rechercher par nom ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="student">Étudiants</SelectItem>
                  <SelectItem value="teacher">Enseignants</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-white epg-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0A1F44] font-heading">Utilisateurs ({filteredUsers.length})</CardTitle>
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
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-[#F18A00] text-white">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#0A1F44]">{user.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-gray-600">{user.registrationDate}</TableCell>
                    <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 bg-transparent"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-yellow-50 border-yellow-300 text-yellow-600 bg-transparent"
                          onClick={() => handleToggleUserStatus(user.id)}
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 border-red-300 text-red-600 bg-transparent"
                          onClick={() => handleDeleteUser(user.id)}
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
