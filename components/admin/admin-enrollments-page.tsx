"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, CheckCircle, XCircle, Clock, Eye, Filter, Mail } from "lucide-react"

const enrollmentRequests = [
  {
    id: 1,
    studentName: "Marie Dubois",
    studentEmail: "marie.dubois@email.com",
    studentAvatar: "/student-avatar.png",
    courseTitle: "Marketing Digital",
    courseInstructor: "Pierre Moreau",
    requestDate: "2024-11-15",
    status: "pending",
    motivation: "Je souhaite développer mes compétences en marketing digital pour mon projet entrepreneurial.",
  },
  {
    id: 2,
    studentName: "Thomas Martin",
    studentEmail: "thomas.martin@email.com",
    studentAvatar: "/male-student-avatar.png",
    courseTitle: "Python pour Data Science",
    courseInstructor: "Dr. Claire Rousseau",
    requestDate: "2024-11-14",
    status: "pending",
    motivation: "Passionné par l'analyse de données, je veux approfondir mes connaissances en Python.",
  },
  {
    id: 3,
    studentName: "Sophie Laurent",
    studentEmail: "sophie.laurent@email.com",
    studentAvatar: "/student-avatar.png",
    courseTitle: "Photographie Professionnelle",
    courseInstructor: "Sophie Laurent",
    requestDate: "2024-11-13",
    status: "approved",
    motivation: "Je veux perfectionner mes techniques photographiques pour mon portfolio.",
  },
  {
    id: 4,
    studentName: "Jean Moreau",
    studentEmail: "jean.moreau@email.com",
    studentAvatar: "/male-student-avatar.png",
    courseTitle: "Gestion de Projet Agile",
    courseInstructor: "Jean-Luc Petit",
    requestDate: "2024-11-12",
    status: "pending",
    motivation: "En tant que chef de projet, je veux maîtriser les méthodologies agiles.",
  },
  {
    id: 5,
    studentName: "Emma Wilson",
    studentEmail: "emma.wilson@email.com",
    studentAvatar: "/student-avatar.png",
    courseTitle: "Intelligence Artificielle",
    courseInstructor: "Dr. Ahmed Hassan",
    requestDate: "2024-11-11",
    status: "rejected",
    motivation: "Intéressée par l'IA pour mon futur métier dans la tech.",
    rejectionReason: "Prérequis en programmation non satisfaits",
  },
  {
    id: 6,
    studentName: "Lucas Petit",
    studentEmail: "lucas.petit@email.com",
    studentAvatar: "/male-student-avatar.png",
    courseTitle: "UX Research",
    courseInstructor: "Laura Martinez",
    requestDate: "2024-11-10",
    status: "pending",
    motivation: "Designer UI/UX, je veux approfondir mes compétences en recherche utilisateur.",
  },
]

export function AdminEnrollmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [requests, setRequests] = useState(enrollmentRequests)

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approuvée</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Refusée</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleApproveRequest = (requestId: number) => {
    const request = requests.find((r) => r.id === requestId)
    if (
      request &&
      confirm(`Approuver la demande d'inscription de ${request.studentName} au cours "${request.courseTitle}" ?`)
    ) {
      setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "approved" } : r)))
      alert("Demande approuvée avec succès ! L'étudiant a été notifié.")
    }
  }

  const handleRejectRequest = (requestId: number) => {
    const request = requests.find((r) => r.id === requestId)
    const reason = prompt("Raison du refus (sera envoyée à l'étudiant) :")

    if (request && reason && confirm(`Refuser la demande de ${request.studentName} ?`)) {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "rejected", rejectionReason: reason } : r)),
      )
      alert("Demande refusée. L'étudiant a été notifié avec la raison du refus.")
    }
  }

  const handleViewDetails = (requestId: number) => {
    const request = requests.find((r) => r.id === requestId)
    if (request) {
      alert(
        `Détails de la demande:\n\nÉtudiant: ${request.studentName}\nEmail: ${request.studentEmail}\nCours: ${request.courseTitle}\nMotivation: ${request.motivation}${request.rejectionReason ? `\n\nRaison du refus: ${request.rejectionReason}` : ""}`,
      )
    }
  }

  const handleSendMessage = (requestId: number) => {
    const request = requests.find((r) => r.id === requestId)
    if (request) {
      const message = prompt(`Envoyer un message à ${request.studentName}:`)
      if (message) {
        alert("Message envoyé avec succès !")
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Demandes d'inscription</h1>
        <p className="text-gray-600">Gérez les demandes d'inscription aux cours des étudiants</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total demandes</p>
                <p className="text-2xl font-bold text-[#0A1F44]">{requests.length}</p>
              </div>
              <div className="w-10 h-10 bg-[#0A1F44] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{requests.length}</span>
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
                  {requests.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Approuvées</p>
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter((r) => r.status === "approved").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Refusées</p>
                <p className="text-2xl font-bold text-red-600">
                  {requests.filter((r) => r.status === "rejected").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-white" />
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
                  placeholder="Rechercher par étudiant, cours ou email..."
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
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvées</SelectItem>
                <SelectItem value="rejected">Refusées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0A1F44] font-heading">
              Demandes d'inscription ({filteredRequests.length})
            </CardTitle>
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
                <TableHead>Étudiant</TableHead>
                <TableHead>Cours demandé</TableHead>
                <TableHead>Enseignant</TableHead>
                <TableHead>Date de demande</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={request.studentAvatar || "/placeholder.svg"} alt={request.studentName} />
                        <AvatarFallback className="bg-[#F18A00] text-white">
                          {request.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#0A1F44]">{request.studentName}</p>
                        <p className="text-sm text-gray-500">{request.studentEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#0A1F44]">{request.courseTitle}</p>
                  </TableCell>
                  <TableCell className="text-gray-600">{request.courseInstructor}</TableCell>
                  <TableCell className="text-gray-600">{request.requestDate}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 bg-transparent"
                        onClick={() => handleViewDetails(request.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-red-50 border-red-300 text-red-600 bg-transparent"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-50 bg-transparent"
                        onClick={() => handleSendMessage(request.id)}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune demande trouvée avec ces critères.</p>
        </div>
      )}
    </div>
  )
}
