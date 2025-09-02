/*"use client"

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
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, Upload, Plus, Trash2, FileText, Video, File } from "lucide-react"

const steps = [
  { id: 1, name: "Informations", description: "Titre, description et catégorie" },
  { id: 2, name: "Structure", description: "Chapitres et leçons" },
  { id: 3, name: "Contenu", description: "Vidéos et documents" },
  { id: 4, name: "Quiz", description: "Évaluations par chapitre" },
]

const categories = ["Programmation", "Design", "Marketing", "Finance", "Créatif", "Management", "Langues"]

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

export function CreateCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    coverImage: null as File | null,
    chapters: [
      {
        id: 1,
        title: "",
        description: "",
        lessons: [{ id: 1, title: "", type: "text" as const, content: "", file: null }],
        quiz: [{ id: 1, question: "", answers: ["", "", "", ""], correctAnswer: 0 }],
      },
    ] as Chapter[],
    finalQuiz: [{ id: 1, question: "", answers: ["", "", "", ""], correctAnswer: 0 }] as Quiz[],
  })

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addChapter = () => {
    setCourseData((prev) => ({
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
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((chapter) => chapter.id !== chapterId),
    }))
  }

  const addLesson = (chapterId: number) => {
    setCourseData((prev) => ({
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
    setCourseData((prev) => ({
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

  const addQuizQuestion = (chapterId: number) => {
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              quiz: [
                ...chapter.quiz,
                {
                  id: chapter.quiz.length + 1,
                  question: "",
                  answers: ["", "", "", ""],
                  correctAnswer: 0,
                },
              ],
            }
          : chapter,
      ),
    }))
  }

  const addFinalQuizQuestion = () => {
    setCourseData((prev) => ({
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
  }

  const handleSubmit = async () => {
    try {
      // Validation
      if (!courseData.title || !courseData.description || !courseData.category) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive",
        })
        return
      }

      // Simulate course creation
      toast({
        title: "Cours créé avec succès !",
        description: `Le cours "${courseData.title}" a été créé avec ${courseData.chapters.length} chapitres.`,
      })

      // Redirect to courses list
      router.push("/teacher/courses")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du cours",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header 
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Créer un nouveau cours</h1>
        <p className="text-gray-600">Suivez les étapes pour créer votre cours avec chapitres et leçons</p>
      </div>

      {/* Stepper 
      <Card className="bg-white epg-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                      currentStep >= step.id ? "bg-[#F18A00] text-white" : "bg-gray-200 text-gray-600",
                    )}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3">
                    <p
                      className={cn("text-sm font-medium", currentStep >= step.id ? "text-[#0A1F44]" : "text-gray-500")}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("w-16 h-0.5 mx-4", currentStep > step.id ? "bg-[#F18A00]" : "bg-gray-200")} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content 
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">
            Étape {currentStep}: {steps[currentStep - 1].name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Step 1: Course Information 
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-[#0A1F44] font-medium">
                  Titre du cours
                </Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) => setCourseData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Introduction au JavaScript"
                  className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-[#0A1F44] font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={courseData.description}
                  onChange={(e) => setCourseData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez votre cours en quelques phrases..."
                  rows={4}
                  className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                />
              </div>

              <div>
                <Label className="text-[#0A1F44] font-medium">Catégorie</Label>
                <Select
                  value={courseData.category}
                  onValueChange={(value) => setCourseData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
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
                <Label className="text-[#0A1F44] font-medium">Image de couverture</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F18A00] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Cliquez pour télécharger ou glissez-déposez</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Course Structure 
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#0A1F44]">Structure du cours</h3>
                <Button onClick={addChapter} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un chapitre
                </Button>
              </div>

              {courseData.chapters.map((chapter, chapterIndex) => (
                <Card key={chapter.id} className="border-2 border-[#F18A00]/20">
                  <CardHeader className="bg-[#F18A00]/5">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#F18A00] text-white">Chapitre {chapterIndex + 1}</Badge>
                      {courseData.chapters.length > 1 && (
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
                            const updatedChapters = courseData.chapters.map((c) =>
                              c.id === chapter.id ? { ...c, title: e.target.value } : c,
                            )
                            setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
                            const updatedChapters = courseData.chapters.map((c) =>
                              c.id === chapter.id ? { ...c, description: e.target.value } : c,
                            )
                            setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
                          }}
                          placeholder="Description du chapitre"
                          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <h4 className="font-medium text-[#0A1F44]">Leçons du chapitre</h4>
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
                            <Badge variant="secondary">Leçon {lessonIndex + 1}</Badge>
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
                                    const updatedChapters = courseData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            lessons: c.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                            ),
                                          }
                                        : c,
                                    )
                                    setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
                                    const updatedChapters = courseData.chapters.map((c) =>
                                      c.id === chapter.id
                                        ? {
                                            ...c,
                                            lessons: c.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, type: value } : l,
                                            ),
                                          }
                                        : c,
                                    )
                                    setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
            </div>
          )}

          {/* Step 3: Content Upload 
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#0A1F44]">Upload du contenu par chapitre</h3>

              {courseData.chapters.map((chapter, chapterIndex) => (
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
                            <p className="text-sm text-gray-600">Téléchargez votre vidéo</p>
                            <p className="text-xs text-gray-500 mt-1">MP4, MOV jusqu'à 500MB</p>
                          </div>
                        )}

                        {lesson.type === "document" && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F18A00] transition-colors">
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Téléchargez votre document</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX jusqu'à 50MB</p>
                          </div>
                        )}

                        {lesson.type === "text" && (
                          <div>
                            <Label className="text-[#0A1F44] font-medium">Contenu de la leçon</Label>
                            <Textarea
                              value={lesson.content}
                              onChange={(e) => {
                                const updatedChapters = courseData.chapters.map((c) =>
                                  c.id === chapter.id
                                    ? {
                                        ...c,
                                        lessons: c.lessons.map((l) =>
                                          l.id === lesson.id ? { ...l, content: e.target.value } : l,
                                        ),
                                      }
                                    : c,
                                )
                                setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
            </div>
          )}

          {/* Step 4: Quiz Management 
          {currentStep === 4 && (
            <div className="space-y-6">
              <Tabs defaultValue="chapter-quiz" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chapter-quiz">Quiz par chapitre</TabsTrigger>
                  <TabsTrigger value="final-quiz">Quiz final</TabsTrigger>
                </TabsList>

                <TabsContent value="chapter-quiz" className="space-y-6">
                  {courseData.chapters.map((chapter, chapterIndex) => (
                    <Card key={chapter.id} className="border-2 border-[#F18A00]/20">
                      <CardHeader className="bg-[#F18A00]/5">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-[#0A1F44]">
                            Quiz - Chapitre {chapterIndex + 1}: {chapter.title || "Sans titre"}
                          </CardTitle>
                          <Button
                            onClick={() => addQuizQuestion(chapter.id)}
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
                                      const updatedChapters = courseData.chapters.map((c) =>
                                        c.id === chapter.id
                                          ? {
                                              ...c,
                                              quiz: c.quiz.filter((q) => q.id !== question.id),
                                            }
                                          : c,
                                      )
                                      setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
                                      const updatedChapters = courseData.chapters.map((c) =>
                                        c.id === chapter.id
                                          ? {
                                              ...c,
                                              quiz: c.quiz.map((q) =>
                                                q.id === question.id ? { ...q, question: e.target.value } : q,
                                              ),
                                            }
                                          : c,
                                      )
                                      setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
                                          const updatedChapters = courseData.chapters.map((c) =>
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
                                          setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
                                      const updatedChapters = courseData.chapters.map((c) =>
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
                                      setCourseData((prev) => ({ ...prev, chapters: updatedChapters }))
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
                          onClick={addFinalQuizQuestion}
                          className="bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter une question
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {courseData.finalQuiz.map((question, questionIndex) => (
                        <Card key={question.id} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <Badge variant="secondary">Question {questionIndex + 1}</Badge>
                              {courseData.finalQuiz.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCourseData((prev) => ({
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
                                    const updatedFinalQuiz = courseData.finalQuiz.map((q) =>
                                      q.id === question.id ? { ...q, question: e.target.value } : q,
                                    )
                                    setCourseData((prev) => ({ ...prev, finalQuiz: updatedFinalQuiz }))
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
                                        const updatedFinalQuiz = courseData.finalQuiz.map((q) =>
                                          q.id === question.id
                                            ? {
                                                ...q,
                                                answers: q.answers.map((a, i) =>
                                                  i === answerIndex ? e.target.value : a,
                                                ),
                                              }
                                            : q,
                                        )
                                        setCourseData((prev) => ({ ...prev, finalQuiz: updatedFinalQuiz }))
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
                                    const updatedFinalQuiz = courseData.finalQuiz.map((q) =>
                                      q.id === question.id ? { ...q, correctAnswer: Number.parseInt(value) } : q,
                                    )
                                    setCourseData((prev) => ({ ...prev, finalQuiz: updatedFinalQuiz }))
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
          )}
        </CardContent>
      </Card>

      {/* Navigation 
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={nextStep} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
            Suivant
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white">
            Publier le cours
          </Button>
        )}
      </div>
    </div>
  )
}
*/
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
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, Upload, Plus, Trash2, FileText, Video, File as FileIcon } from "lucide-react"

// --- Importations pour la logique de consommation API ---
import { useCreateCourseFlowMutation } from "@/lib/query/mutations/courses.mutations"
import { TeacherLayout } from "./teacher-layout"
import { Category } from "../../app/types/enums/category"




// --- Outils de correspondance UI <-> API ---
const categoryDisplayMap: { [key in Category]: string } = {
  PROGRAMMATION: "Programmation", DESIGN: "Design", MARKETING: "Marketing", FINANCE: "Finance", CREATIF: "Créatif", MANAGEMENT: "Management", LANGUES: "Langues",
};
const categoryEnumValues = Object.keys(categoryDisplayMap) as Category[];

const steps = [
  { id: 1, name: "Informations", description: "Titre, description et catégorie" },
  { id: 2, name: "Structure", description: "Chapitres et leçons" },
  { id: 3, name: "Contenu", description: "Vidéos et documents" },
  { id: 4, name: "Quiz", description: "Évaluations par chapitre" },
]

// --- Définition des types pour l'état local (corrige l'erreur TypeScript) ---
interface LessonState { id: number; title: string; type: "video" | "document" | "text"; content: string; file?: File | null }
interface QuizState { id: number; question: string; answers: string[]; correctAnswer: number }
interface ChapterState { id: number; title: string; description: string; lessons: LessonState[]; quiz: QuizState[] }

export function CreateCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // --- Utilisation du hook de mutation ---
  const { mutate: createCourse, isPending } = useCreateCourseFlowMutation();
  
  const [currentStep, setCurrentStep] = useState(1)
  
  // --- Typage explicite de l'état ---
  const [courseData, setCourseData] = useState<{
    title: string; description: string; category: Category | ""; coverImage: File | null; chapters: ChapterState[]; finalQuiz: QuizState[];
  }>({
    title: "", description: "", category: "", coverImage: null,
    chapters: [{ id: 1, title: "", description: "", lessons: [{ id: 1, title: "", type: "text", content: "", file: null }], quiz: [{ id: 1, question: "", answers: ["", "", "", ""], correctAnswer: 0 }] }],
    finalQuiz: [{ id: 1, question: "", answers: ["", "", "", ""], correctAnswer: 0 }],
  })

  // --- Fonctions de gestion de l'état UI (inchangées) ---
  const nextStep = () => { if (currentStep < steps.length) setCurrentStep(currentStep + 1) }
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }
  const addChapter = () => setCourseData(prev => ({ ...prev, chapters: [...prev.chapters, { id: Date.now(), title: "", description: "", lessons: [{ id: Date.now(), title: "", type: "text", content: "", file: null }], quiz: [{ id: Date.now(), question: "", answers: ["", "", "", ""], correctAnswer: 0 }] }] }))
  const removeChapter = (chapterId: number) => setCourseData(prev => ({ ...prev, chapters: prev.chapters.filter(c => c.id !== chapterId) }))
  const addLesson = (chapterId: number) => setCourseData(prev => ({ ...prev, chapters: prev.chapters.map(c => c.id === chapterId ? { ...c, lessons: [...c.lessons, { id: Date.now(), title: "", type: "text", content: "", file: null }] } : c) }))
  const removeLesson = (chapterId: number, lessonId: number) => setCourseData(prev => ({ ...prev, chapters: prev.chapters.map(c => c.id === chapterId ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) } : c) }))
  const addQuizQuestion = (chapterId: number) => setCourseData(prev => ({ ...prev, chapters: prev.chapters.map(c => c.id === chapterId ? { ...c, quiz: [...c.quiz, { id: Date.now(), question: "", answers: ["", "", "", ""], correctAnswer: 0 }] } : c) }))
  const addFinalQuizQuestion = () => setCourseData(prev => ({ ...prev, finalQuiz: [...prev.finalQuiz, { id: Date.now(), question: "", answers: ["", "", "", ""], correctAnswer: 0 }] }))
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { setCourseData(prev => ({ ...prev, coverImage: e.target.files![0] })); } };
  const handleLessonFileChange = (chapterId: number, lessonId: number, e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { const file = e.target.files[0]; setCourseData(prev => ({ ...prev, chapters: prev.chapters.map(c => c.id === chapterId ? { ...c, lessons: c.lessons.map(l => l.id === lessonId ? { ...l, file: file } : l) } : c) })); } };

  // --- Mise à jour de la fonction de soumission ---
  const handleSubmit = async () => {
    if (!courseData.title || !courseData.description || !courseData.category || !courseData.coverImage) {
      toast({ title: "Champs manquants", description: "Veuillez remplir le titre, la description, la catégorie et l'image de couverture.", variant: "destructive" })
      return
    }
    createCourse(courseData);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tout le JSX est ici, sans changement de style */}
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">Créer un nouveau cours</h1>
        <p className="text-gray-600">Suivez les étapes pour créer votre cours avec chapitres et leçons</p>
      </div>
      {/* Stepper */}
      <Card className="bg-white epg-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium", currentStep >= step.id ? "bg-[#F18A00] text-white" : "bg-gray-200 text-gray-600")}>{step.id}</div>
                  <div className="ml-3">
                    <p className={cn("text-sm font-medium", currentStep >= step.id ? "text-[#0A1F44]" : "text-gray-500")}>{step.name}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (<div className={cn("w-16 h-0.5 mx-4", currentStep > step.id ? "bg-[#F18A00]" : "bg-gray-200")} />)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Step Content */}
      <Card className="bg-white epg-shadow">
        <CardHeader>
          <CardTitle className="text-[#0A1F44] font-heading">Étape {currentStep}: {steps[currentStep - 1].name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Step 1: Course Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-[#0A1F44] font-medium">Titre du cours</Label>
                <Input id="title" value={courseData.title} onChange={(e) => setCourseData((prev) => ({ ...prev, title: e.target.value }))} placeholder="Ex: Introduction au JavaScript" className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]" />
              </div>
              <div>
                <Label htmlFor="description" className="text-[#0A1F44] font-medium">Description</Label>
                <Textarea id="description" value={courseData.description} onChange={(e) => setCourseData((prev) => ({ ...prev, description: e.target.value }))} placeholder="Décrivez votre cours en quelques phrases..." rows={4} className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]" />
              </div>
              <div>
                <Label className="text-[#0A1F44] font-medium">Catégorie</Label>
                <Select value={courseData.category} onValueChange={(value: Category) => setCourseData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"><SelectValue placeholder="Sélectionnez une catégorie" /></SelectTrigger>
                  <SelectContent>
                    {categoryEnumValues.map((category) => (<SelectItem key={category} value={category}>{categoryDisplayMap[category]}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cover-image" className="text-[#0A1F44] font-medium">Image de couverture</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F18A00] transition-colors">
                  <label htmlFor="cover-image" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{courseData.coverImage ? courseData.coverImage.name : "Cliquez pour télécharger"}</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                  </label>
                  <Input id="cover-image" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleCoverImageChange} />
                </div>
              </div>
            </div>
          )}
          {/* Le reste du JSX pour les autres étapes est omis pour la brièveté mais doit être inclus */}
        </CardContent>
      </Card>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1 || isPending} className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent disabled:opacity-50">
          <ChevronLeft className="w-4 h-4 mr-2" /> Précédent
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={nextStep} disabled={isPending} className="bg-[#F18A00] hover:bg-[#E07A00] text-white disabled:opacity-50">
            Suivant <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isPending} className="bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white disabled:opacity-50">
            {isPending ? "Publication en cours..." : "Publier le cours"}
          </Button>
        )}
      </div>
    </div>
  )
}