"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, Trash2, Plus, Upload, Video, FileText, File } from "lucide-react"

interface EditCoursePageProps {
  courseId: string
}

interface Lesson {
  id: number
  title: string
  type: "video" | "document" | "text"
  content: string
  file?: File | null
}

interface Quiz {
  id: number
  question: string
  answers: string[]
  correctAnswer: number
}

interface Chapter {
  id: number
  title: string
  description: string
  lessons: Lesson[]
  quiz: Quiz[]
}

const courseData = {
  javascript: {
    title: "Introduction au JavaScript",
    description: "Apprenez les bases du JavaScript moderne avec des exemples pratiques et des exercices interactifs.",
    category: "Programmation",
    status: "Publié",
    students: 245,
    chapters: [
      {
        id: 1,
        title: "Les bases du JavaScript",
        description: "Introduction aux concepts fondamentaux",
        lessons: [
          {
            id: 1,
            title: "Introduction au JavaScript",
            type: "text" as const,
            content: "Découvrez l'histoire et les bases du JavaScript...",
          },
          { id: 2, title: "Variables et types de données", type: "video" as const, content: "", file: null },
        ],
        quiz: [
          {
            id: 1,
            question: "Qu'est-ce que JavaScript ?",
            answers: ["Un langage de programmation", "Un framework", "Une base de données", "Un serveur"],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Fonctions et objets",
        description: "Approfondissement des concepts avancés",
        lessons: [
          { id: 3, title: "Les fonctions", type: "text" as const, content: "Maîtrisez les fonctions en JavaScript..." },
          { id: 4, title: "Les objets", type: "document" as const, content: "", file: null },
        ],
        quiz: [
          {
            id: 2,
            question: "Comment déclarer une fonction ?",
            answers: ["function myFunc()", "var myFunc()", "let myFunc()", "const myFunc()"],
            correctAnswer: 0,
          },
        ],
      },
    ],
    finalQuiz: [
      {
        id: 1,
        question: "JavaScript est-il un langage compilé ?",
        answers: ["Oui", "Non", "Parfois", "Ça dépend"],
        correctAnswer: 1,
      },
    ],
  },
}

const categories = ["Programmation", "Design", "Marketing", "Finance", "Créatif", "Management", "Langues"]

export function EditCoursePage({ courseId }: EditCoursePageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const course = courseData[courseId as keyof typeof courseData] || courseData.javascript

  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    category: course.category,
    status: course.status,
    chapters: course.chapters,
    finalQuiz: course.finalQuiz,
  })

  const handleSave = async () => {
    try {
      toast({
        title: "Cours mis à jour !",
        description: "Les modifications ont été sauvegardées avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      })
    }
  }

  const handlePreview = () => {
    router.push(`/student/course/${courseId}`)
  }

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ? Cette action est irréversible.")) {
      try {
        toast({
          title: "Cours supprimé",
          description: "Le cours a été supprimé avec succès.",
        })
        router.push("/teacher/courses")
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression",
          variant: "destructive",
        })
      }
    }
  }

  const addChapter = () => {
    setFormData((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          id: prev.chapters.length + 1,
          title: "",
          description: "",
          lessons: [{ id: 1, title: "", type: "text" as const, content: "", file: null }],
          quiz: [{ id: 1, question: "", answers: ["", "", "", ""], correctAnswer: 0 }],
        },
      ],
    }))
  }

  const removeChapter = (chapterId: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((chapter) => chapter.id !== chapterId),
    }))
  }

  const addLesson = (chapterId: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: [
                ...chapter.lessons,
                {
                  id: chapter.lessons.length + 1,
                  title: "",
                  type: "text" as const,
                  content: "",
                  file: null,
                },
              ],
            }
          : chapter,
      ),
    }))
  }

  const removeLesson = (chapterId: number, lessonId: number) => {
    setFormData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : chapter,
      ),
    }))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} className="text-[#0A1F44] hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#0A1F44] font-heading">Modifier le cours</h1>
            <p className="text-gray-600">
              {course.students} étudiants inscrits • {formData.chapters.length} chapitres
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="border-[#F18A00] text-[#F18A00] hover:bg-[#F18A00] hover:text-white bg-transparent"
          >
            <Eye className="w-4 h-4 mr-2" />
            Prévisualiser
          </Button>
          <Button onClick={handleSave} className="bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Course Status */}
      <Card className="bg-white epg-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge
                className={
                  formData.status === "Publié" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }
              >
                {formData.status}
              </Badge>
              <span className="text-gray-600">{course.students} étudiants inscrits</span>
              <span className="text-gray-600">{formData.chapters.length} chapitres</span>
            </div>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer le cours
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Management Tabs */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        {/* Course Information Tab */}
        <TabsContent value="info">
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Informations du cours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-[#0A1F44] font-medium">
                  Titre du cours
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-[#0A1F44] font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[#0A1F44] font-medium">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#0A1F44] font-medium">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brouillon">Brouillon</SelectItem>
                      <SelectItem value="Publié">Publié</SelectItem>
                      <SelectItem value="Archivé">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-[#0A1F44] font-medium">Image de couverture</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F18A00] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Cliquez pour télécharger une nouvelle image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Structure Tab */}
        <TabsContent value="structure">
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0A1F44] font-heading">Structure du cours</CardTitle>
                <Button onClick={addChapter} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un chapitre
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.chapters.map((chapter, chapterIndex) => (
                <Card key={chapter.id} className="border-2 border-[#F18A00]/20">
                  <CardHeader className="bg-[#F18A00]/5">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#F18A00] text-white">Chapitre {chapterIndex + 1}</Badge>
                      {formData.chapters.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChapter(chapter.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#0A1F44] font-medium">Titre du chapitre</Label>
                        <Input
                          value={chapter.title}
                          onChange={(e) => {
                            const updatedChapters = formData.chapters.map((c) =>
                              c.id === chapter.id ? { ...c, title: e.target.value } : c,
                            )
                            setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                          }}
                          placeholder="Ex: Les bases du JavaScript"
                          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#0A1F44] font-medium">Description</Label>
                        <Input
                          value={chapter.description}
                          onChange={(e) => {
                            const updatedChapters = formData.chapters.map((c) =>
                              c.id === chapter.id ? { ...c, description: e.target.value } : c,
                            )
                            setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                          }}
                          placeholder="Description du chapitre"
                          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <h4 className="font-medium text-[#0A1F44]">Leçons ({chapter.lessons.length})</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(chapter.id)}
                        className="border-[#F18A00] text-[#F18A00] hover:bg-[#F18A00] hover:text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une leçon
                      </Button>
                    </div>

                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <Card key={lesson.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">Leçon {lessonIndex + 1}</Badge>
                              <Badge variant="outline">
                                {lesson.type === "video" && <Video className="w-4 h-4 mr-1" />}
                                {lesson.type === "document" && <FileText className="w-4 h-4 mr-1" />}
                                {lesson.type === "text" && <File className="w-4 h-4 mr-1" />}
                                {lesson.type === "video" ? "Vidéo" : lesson.type === "document" ? "Document" : "Texte"}
                              </Badge>
                            </div>
                            {chapter.lessons.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLesson(chapter.id, lesson.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-[#0A1F44] font-medium">Titre de la leçon</Label>
                                <Input
                                  value={lesson.title}
                                  onChange={(e) => {
                                    const updatedChapters = formData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            lessons: c.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                            ),
                                          }
                                        : c,
                                    )
                                    setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                                  }}
                                  placeholder="Ex: Variables et types de données"
                                  className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                                />
                              </div>
                              <div>
                                <Label className="text-[#0A1F44] font-medium">Type de contenu</Label>
                                <Select
                                  value={lesson.type}
                                  onValueChange={(value: "video" | "document" | "text") => {
                                    const updatedChapters = formData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            lessons: c.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, type: value } : l,
                                            ),
                                          }
                                        : c,
                                    )
                                    setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                                  }}
                                >
                                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">
                                      <div className="flex items-center">
                                        <Video className="w-4 h-4 mr-2" />
                                        Vidéo
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="document">
                                      <div className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Document (PDF)
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="text">
                                      <div className="flex items-center">
                                        <File className="w-4 h-4 mr-2" />
                                        Texte
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content">
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Gestion du contenu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.chapters.map((chapter, chapterIndex) => (
                <Card key={chapter.id} className="border-2 border-[#F18A00]/20">
                  <CardHeader className="bg-[#F18A00]/5">
                    <CardTitle className="text-[#0A1F44]">
                      Chapitre {chapterIndex + 1}: {chapter.title || "Sans titre"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-[#0A1F44]">
                            Leçon {lessonIndex + 1}: {lesson.title || "Sans titre"}
                          </h4>
                          <Badge variant="outline">
                            {lesson.type === "video" && <Video className="w-4 h-4 mr-1" />}
                            {lesson.type === "document" && <FileText className="w-4 h-4 mr-1" />}
                            {lesson.type === "text" && <File className="w-4 h-4 mr-1" />}
                            {lesson.type === "video" ? "Vidéo" : lesson.type === "document" ? "Document" : "Texte"}
                          </Badge>
                        </div>

                        {lesson.type === "video" && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F18A00] transition-colors">
                            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Téléchargez ou remplacez la vidéo</p>
                            <p className="text-xs text-gray-500 mt-1">MP4, MOV jusqu'à 500MB</p>
                          </div>
                        )}

                        {lesson.type === "document" && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F18A00] transition-colors">
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Téléchargez ou remplacez le document</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX jusqu'à 50MB</p>
                          </div>
                        )}

                        {lesson.type === "text" && (
                          <div>
                            <Label className="text-[#0A1F44] font-medium">Contenu de la leçon</Label>
                            <Textarea
                              value={lesson.content}
                              onChange={(e) => {
                                const updatedChapters = formData.chapters.map((c) =>
                                  c.id === chapter.id
                                    ? {
                                        ...c,
                                        lessons: c.lessons.map((l) =>
                                          l.id === lesson.id ? { ...l, content: e.target.value } : l,
                                        ),
                                      }
                                    : c,
                                )
                                setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                              }}
                              placeholder="Rédigez le contenu de votre leçon..."
                              rows={6}
                              className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Management Tab */}
        <TabsContent value="quiz">
          <div className="space-y-6">
            <Tabs defaultValue="chapter-quiz" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chapter-quiz">Quiz par chapitre</TabsTrigger>
                <TabsTrigger value="final-quiz">Quiz final</TabsTrigger>
              </TabsList>

              <TabsContent value="chapter-quiz" className="space-y-6">
                {formData.chapters.map((chapter, chapterIndex) => (
                  <Card key={chapter.id} className="border-2 border-[#F18A00]/20">
                    <CardHeader className="bg-[#F18A00]/5">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-[#0A1F44]">
                          Quiz - Chapitre {chapterIndex + 1}: {chapter.title || "Sans titre"}
                        </CardTitle>
                        <Button
                          onClick={() => {
                            const updatedChapters = formData.chapters.map((c) =>
                              c.id === chapter.id
                                ? {
                                    ...c,
                                    quiz: [
                                      ...c.quiz,
                                      {
                                        id: c.quiz.length + 1,
                                        question: "",
                                        answers: ["", "", "", ""],
                                        correctAnswer: 0,
                                      },
                                    ],
                                  }
                                : c,
                            )
                            setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                          }}
                          className="bg-[#F18A00] hover:bg-[#E07A00] text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter une question
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {chapter.quiz.map((question, questionIndex) => (
                        <Card key={question.id} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <Badge variant="secondary">Question {questionIndex + 1}</Badge>
                              {chapter.quiz.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const updatedChapters = formData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            quiz: c.quiz.filter((q) => q.id !== question.id),
                                          }
                                        : c,
                                    )
                                    setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                                  }}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-[#0A1F44] font-medium">Question</Label>
                                <Input
                                  value={question.question}
                                  onChange={(e) => {
                                    const updatedChapters = formData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            quiz: c.quiz.map((q) =>
                                              q.id === question.id ? { ...q, question: e.target.value } : q,
                                            ),
                                          }
                                        : c,
                                    )
                                    setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                                  }}
                                  placeholder="Posez votre question..."
                                  className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {question.answers.map((answer, answerIndex) => (
                                  <div key={answerIndex}>
                                    <Label className="text-[#0A1F44] font-medium">
                                      Réponse {answerIndex + 1}
                                      {question.correctAnswer === answerIndex && (
                                        <Badge className="ml-2 bg-green-100 text-green-800">Correcte</Badge>
                                      )}
                                    </Label>
                                    <Input
                                      value={answer}
                                      onChange={(e) => {
                                        const updatedChapters = formData.chapters.map((c) =>
                                          c.id === chapter.id
                                            ? {
                                                ...c,
                                                quiz: c.quiz.map((q) =>
                                                  q.id === question.id
                                                    ? {
                                                        ...q,
                                                        answers: q.answers.map((a, i) =>
                                                          i === answerIndex ? e.target.value : a,
                                                        ),
                                                      }
                                                    : q,
                                                ),
                                              }
                                            : c,
                                        )
                                        setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                                      }}
                                      placeholder={`Réponse ${answerIndex + 1}`}
                                      className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div>
                                <Label className="text-[#0A1F44] font-medium">Bonne réponse</Label>
                                <Select
                                  value={question.correctAnswer.toString()}
                                  onValueChange={(value) => {
                                    const updatedChapters = formData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            quiz: c.quiz.map((q) =>
                                              q.id === question.id
                                                ? { ...q, correctAnswer: Number.parseInt(value) }
                                                : q,
                                            ),
                                          }
                                        : c,
                                    )
                                    setFormData((prev) => ({ ...prev, chapters: updatedChapters }))
                                  }}
                                >
                                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {question.answers.map((_, answerIndex) => (
                                      <SelectItem key={answerIndex} value={answerIndex.toString()}>
                                        Réponse {answerIndex + 1}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="final-quiz" className="space-y-6">
                <Card className="border-2 border-[#0A1F44]/20">
                  <CardHeader className="bg-[#0A1F44]/5">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#0A1F44]">Quiz final du cours</CardTitle>
                      <Button
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            finalQuiz: [
                              ...prev.finalQuiz,
                              {
                                id: prev.finalQuiz.length + 1,
                                question: "",
                                answers: ["", "", "", ""],
                                correctAnswer: 0,
                              },
                            ],
                          }))
                        }}
                        className="bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une question
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {formData.finalQuiz.map((question, questionIndex) => (
                      <Card key={question.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="secondary">Question {questionIndex + 1}</Badge>
                            {formData.finalQuiz.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    finalQuiz: prev.finalQuiz.filter((q) => q.id !== question.id),
                                  }))
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-[#0A1F44] font-medium">Question</Label>
                              <Input
                                value={question.question}
                                onChange={(e) => {
                                  const updatedFinalQuiz = formData.finalQuiz.map((q) =>
                                    q.id === question.id ? { ...q, question: e.target.value } : q,
                                  )
                                  setFormData((prev) => ({ ...prev, finalQuiz: updatedFinalQuiz }))
                                }}
                                placeholder="Posez votre question..."
                                className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex}>
                                  <Label className="text-[#0A1F44] font-medium">
                                    Réponse {answerIndex + 1}
                                    {question.correctAnswer === answerIndex && (
                                      <Badge className="ml-2 bg-green-100 text-green-800">Correcte</Badge>
                                    )}
                                  </Label>
                                  <Input
                                    value={answer}
                                    onChange={(e) => {
                                      const updatedFinalQuiz = formData.finalQuiz.map((q) =>
                                        q.id === question.id
                                          ? {
                                              ...q,
                                              answers: q.answers.map((a, i) =>
                                                i === answerIndex ? e.target.value : a,
                                              ),
                                            }
                                          : q,
                                      )
                                      setFormData((prev) => ({ ...prev, finalQuiz: updatedFinalQuiz }))
                                    }}
                                    placeholder={`Réponse ${answerIndex + 1}`}
                                    className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              <Label className="text-[#0A1F44] font-medium">Bonne réponse</Label>
                              <Select
                                value={question.correctAnswer.toString()}
                                onValueChange={(value) => {
                                  const updatedFinalQuiz = formData.finalQuiz.map((q) =>
                                    q.id === question.id ? { ...q, correctAnswer: Number.parseInt(value) } : q,
                                  )
                                  setFormData((prev) => ({ ...prev, finalQuiz: updatedFinalQuiz }))
                                }}
                              >
                                <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {question.answers.map((_, answerIndex) => (
                                    <SelectItem key={answerIndex} value={answerIndex.toString()}>
                                      Réponse {answerIndex + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
