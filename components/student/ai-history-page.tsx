"use client"

import { useState } from "react"
import { StudentLayout } from "@/components/student/student-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MessageCircle, ChevronDown, ChevronRight, Pin, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const aiConversations = [
  {
    id: 1,
    course: "Introduction au JavaScript",
    date: "2024-11-15",
    title: "Questions sur les fonctions fléchées",
    messages: [
      {
        id: 1,
        type: "user",
        content: "Quelle est la différence entre une fonction classique et une fonction fléchée ?",
        timestamp: "14:30",
      },
      {
        id: 2,
        type: "ai",
        content:
          "Excellente question ! Les principales différences sont :\n\n1. **Syntaxe** : Les fonctions fléchées utilisent `=>` au lieu du mot-clé `function`\n2. **Contexte (this)** : Les fonctions fléchées n'ont pas leur propre `this`, elles héritent du contexte parent\n3. **Hoisting** : Les fonctions fléchées ne sont pas hissées (hoisted) contrairement aux fonctions classiques\n\nExemple :\n```javascript\n// Fonction classique\nfunction add(a, b) {\n  return a + b;\n}\n\n// Fonction fléchée\nconst add = (a, b) => a + b;\n```",
        timestamp: "14:30",
        isPinned: true,
      },
      {
        id: 3,
        type: "user",
        content: "Merci ! Et quand dois-je utiliser l'une ou l'autre ?",
        timestamp: "14:32",
      },
      {
        id: 4,
        type: "ai",
        content:
          "Voici mes recommandations :\n\n**Utilisez les fonctions fléchées quand :**\n- Vous écrivez des fonctions courtes et simples\n- Vous travaillez avec des callbacks (map, filter, etc.)\n- Vous voulez préserver le contexte `this` du parent\n\n**Utilisez les fonctions classiques quand :**\n- Vous créez des méthodes d'objet\n- Vous avez besoin du hoisting\n- Vous utilisez `arguments` ou `this` de manière dynamique",
        timestamp: "14:32",
      },
    ],
  },
  {
    id: 2,
    course: "Introduction au JavaScript",
    date: "2024-11-14",
    title: "Aide sur les boucles",
    messages: [
      {
        id: 1,
        type: "user",
        content: "Comment choisir entre for, while et forEach ?",
        timestamp: "16:15",
      },
      {
        id: 2,
        type: "ai",
        content:
          "Chaque type de boucle a ses avantages :\n\n**for** : Idéal quand vous connaissez le nombre d'itérations\n**while** : Parfait pour les conditions dynamiques\n**forEach** : Excellent pour parcourir des tableaux sans modification\n\nVoulez-vous des exemples concrets ?",
        timestamp: "16:15",
      },
    ],
  },
  {
    id: 3,
    course: "Design UX/UI avec Figma",
    date: "2024-11-13",
    title: "Principes de design",
    messages: [
      {
        id: 1,
        type: "user",
        content: "Quels sont les principes fondamentaux du design UX ?",
        timestamp: "10:20",
      },
      {
        id: 2,
        type: "ai",
        content:
          "Les principes fondamentaux du design UX incluent :\n\n1. **Utilisabilité** : L'interface doit être facile à utiliser\n2. **Accessibilité** : Accessible à tous les utilisateurs\n3. **Consistance** : Cohérence dans tous les éléments\n4. **Feedback** : Retour visuel sur les actions\n5. **Hiérarchie visuelle** : Guide l'œil de l'utilisateur\n\nChacun de ces principes contribue à créer une expérience utilisateur optimale.",
        timestamp: "10:20",
        isPinned: true,
      },
    ],
  },
]

export function AIHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openConversations, setOpenConversations] = useState<number[]>([])

  const toggleConversation = (id: number) => {
    setOpenConversations((prev) => (prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]))
  }

  const togglePin = (conversationId: number, messageId: number) => {
    // Logic to toggle pin status
    console.log(`Toggle pin for conversation ${conversationId}, message ${messageId}`)
  }

  const filteredConversations = aiConversations.filter(
    (conversation) =>
      conversation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.messages.some((message) => message.content.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Historique des conversations IA</h1>
          <p className="text-gray-600">Retrouvez toutes vos conversations avec l'assistant IA</p>
        </div>

        {/* Search */}
        <Card className="bg-white epg-shadow">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher dans vos conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total conversations</p>
                  <p className="text-2xl font-bold text-[#0A1F44]">{aiConversations.length}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-[#F18A00]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Messages épinglés</p>
                  <p className="text-2xl font-bold text-[#F18A00]">
                    {aiConversations.reduce(
                      (count, conv) => count + conv.messages.filter((msg) => msg.isPinned).length,
                      0,
                    )}
                  </p>
                </div>
                <Pin className="w-8 h-8 text-[#0A1F44]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white epg-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Cours concernés</p>
                  <p className="text-2xl font-bold text-green-600">
                    {new Set(aiConversations.map((conv) => conv.course)).size}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {new Set(aiConversations.map((conv) => conv.course)).size}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversations */}
        <div className="space-y-4">
          {filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="bg-white epg-shadow">
              <Collapsible
                open={openConversations.includes(conversation.id)}
                onOpenChange={() => toggleConversation(conversation.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {openConversations.includes(conversation.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                        <div className="text-left">
                          <CardTitle className="text-lg text-[#0A1F44] font-heading">{conversation.title}</CardTitle>
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge variant="secondary">{conversation.course}</Badge>
                            <span className="text-sm text-gray-500">{conversation.date}</span>
                            <span className="text-sm text-gray-500">{conversation.messages.length} messages</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.messages.some((msg) => msg.isPinned) && (
                          <Pin className="w-4 h-4 text-[#F18A00]" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Delete conversation logic
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {conversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg relative ${
                              message.type === "user" ? "bg-[#F18A00] text-white" : "bg-gray-100 text-gray-800 border"
                            }`}
                          >
                            {message.type === "ai" && (
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-[#0A1F44]">Assistant IA EPG</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePin(conversation.id, message.id)}
                                  className={`p-1 h-auto ${
                                    message.isPinned ? "text-[#F18A00]" : "text-gray-400 hover:text-[#F18A00]"
                                  }`}
                                >
                                  <Pin className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                            <div
                              className={`text-xs mt-2 ${
                                message.type === "user" ? "text-orange-100" : "text-gray-500"
                              }`}
                            >
                              {message.timestamp}
                            </div>
                            {message.isPinned && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#F18A00] rounded-full flex items-center justify-center">
                                <Pin className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <Card className="bg-white epg-shadow">
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune conversation trouvée</h3>
              <p className="text-gray-500">
                {searchTerm ? "Essayez avec d'autres mots-clés" : "Commencez une conversation avec l'IA !"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
