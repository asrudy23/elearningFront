"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import {
  Play,
  Pause,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  BookOpen,
  Clock,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react"

interface CourseViewPageProps {
  courseId: string
}

const courseData = {
  id: "1",
  title: "Introduction au JavaScript",
  instructor: "Prof. Martin Dubois",
  description: "Apprenez les bases du JavaScript moderne avec des projets pratiques.",
  progress: 75,
  totalLessons: 24,
  completedLessons: 18,
  chapters: [
    {
      id: 1,
      title: "Introduction et Configuration",
      lessons: [
        {
          id: 1,
          title: "Qu'est-ce que JavaScript ?",
          duration: "8 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        {
          id: 2,
          title: "Configuration de l'environnement",
          duration: "12 min",
          completed: true,
          videoUrl: "https://youtu.be/R4_-vNnFfCM?si=NBl52ikM7Xrv5VOA",
        },
        {
          id: 3,
          title: "Premier programme",
          duration: "15 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        },
      ],
    },
    {
      id: 2,
      title: "Variables et Types de Données",
      lessons: [
        {
          id: 4,
          title: "Déclaration de variables",
          duration: "10 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        },
        {
          id: 5,
          title: "Types primitifs",
          duration: "14 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        },
        {
          id: 6,
          title: "Objets et tableaux",
          duration: "18 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        },
      ],
    },
    {
      id: 3,
      title: "Fonctions",
      lessons: [
        {
          id: 7,
          title: "Déclaration de fonctions",
          duration: "12 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        },
        {
          id: 8,
          title: "Paramètres et arguments",
          duration: "16 min",
          completed: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        },
        {
          id: 9,
          title: "Fonctions fléchées",
          duration: "14 min",
          completed: false,
          current: true,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Subaru.mp4",
        },
        {
          id: 10,
          title: "Portée des variables",
          duration: "20 min",
          completed: false,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        },
      ],
    },
    {
      id: 4,
      title: "Manipulation du DOM",
      lessons: [
        {
          id: 11,
          title: "Sélection d'éléments",
          duration: "15 min",
          completed: false,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        },
        {
          id: 12,
          title: "Modification du contenu",
          duration: "18 min",
          completed: false,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        },
        {
          id: 13,
          title: "Gestion des événements",
          duration: "22 min",
          completed: false,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        },
      ],
    },
  ],
}

export function CourseViewPage({ courseId }: CourseViewPageProps) {
  const [openChapters, setOpenChapters] = useState<number[]>([3]) // Chapter 3 open by default
  const [showChatbot, setShowChatbot] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState(9)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Bonjour ! Comment puis-je vous aider avec ce cours ?", sender: "bot" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleChapter = (chapterId: number) => {
    setOpenChapters((prev) => (prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]))
  }

  const allLessons = courseData.chapters.flatMap((chapter) => chapter.lessons)
  const currentLesson = allLessons.find((lesson) => lesson.id === currentLessonId)
  const currentChapter = courseData.chapters.find((chapter) =>
    chapter.lessons.some((lesson) => lesson.id === currentLessonId),
  )

  const selectLesson = (lessonId: number) => {
    setCurrentLessonId(lessonId)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const goToNextLesson = () => {
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === currentLessonId)
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id)
      setIsPlaying(false)
    }
  }

  const goToPreviousLesson = () => {
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === currentLessonId)
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id)
      setIsPlaying(false)
    }
  }

  const markAsCompleted = () => {
    // Simulate marking lesson as completed
    alert("Leçon marquée comme terminée !")
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now(), text: newMessage, sender: "user" },
        { id: Date.now() + 1, text: "Je comprends votre question. Pouvez-vous être plus spécifique ?", sender: "bot" },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar - Course Navigation */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 epg-shadow transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-80",
        )}
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-lg font-semibold text-[#0A1F44] font-heading mb-2">{courseData.title}</h2>
                <p className="text-sm text-gray-600 mb-4">Par {courseData.instructor}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {!sidebarCollapsed && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progression</span>
                <span className="font-medium text-[#F18A00]">{courseData.progress}%</span>
              </div>
              <Progress value={courseData.progress} className="h-2" />
              <p className="text-xs text-gray-500">
                {courseData.completedLessons} sur {courseData.totalLessons} leçons terminées
              </p>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <div className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {courseData.chapters.map((chapter) => (
              <Collapsible
                key={chapter.id}
                open={openChapters.includes(chapter.id)}
                onOpenChange={() => toggleChapter(chapter.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                  <span className="font-medium text-[#0A1F44]">{chapter.title}</span>
                  {openChapters.includes(chapter.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 ml-4">
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => selectLesson(lesson.id)}
                      className={cn(
                        "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                        lesson.id === currentLessonId
                          ? "bg-[#F18A00] text-white"
                          : lesson.completed
                            ? "hover:bg-green-50"
                            : "hover:bg-gray-50",
                      )}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : lesson.id === currentLessonId ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <div className="flex-1">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            lesson.id === currentLessonId
                              ? "text-white"
                              : lesson.completed
                                ? "text-gray-900"
                                : "text-gray-700",
                          )}
                        >
                          {lesson.title}
                        </p>
                        <p
                          className={cn("text-xs", lesson.id === currentLessonId ? "text-orange-100" : "text-gray-500")}
                        >
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="bg-black aspect-video relative group">
          {currentLesson?.videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={currentLesson.videoUrl}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
              />

              {/* Custom Video Controls */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPreviousLesson}
                    className="text-white hover:bg-white/20"
                    disabled={allLessons.findIndex((l) => l.id === currentLessonId) === 0}
                  >
                    <SkipBack className="w-6 h-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlayPause}
                    className="text-white hover:bg-white/20 w-16 h-16 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToNextLesson}
                    className="text-white hover:bg-white/20"
                    disabled={allLessons.findIndex((l) => l.id === currentLessonId) === allLessons.length - 1}
                  >
                    <SkipForward className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Video Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center space-x-4 text-white">
                  <Button variant="ghost" size="sm" onClick={togglePlayPause} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1 bg-white/30 h-1 rounded-full">
                    <div className="bg-[#F18A00] h-1 rounded-full w-1/3"></div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center text-white h-full">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg">Lecteur vidéo</p>
                <p className="text-sm opacity-80">{currentLesson ? currentLesson.title : "Sélectionnez une leçon"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#0A1F44] font-heading mb-2">
                  {currentLesson ? currentLesson.title : "Sélectionnez une leçon"}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentLesson ? currentLesson.duration : "0 min"}
                  </div>
                  <Badge variant="secondary">{currentChapter?.title}</Badge>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={markAsCompleted}
                  className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white bg-transparent"
                >
                  Marquer comme terminé
                </Button>
                <Button className="bg-[#F18A00] hover:bg-[#E07A00] text-white">Passer au quiz</Button>
              </div>
            </div>

            {/* Lesson Content */}
            <Card className="bg-white epg-shadow">
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#0A1F44] mb-4">À propos de cette leçon</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Dans cette leçon, nous allons explorer les fonctions fléchées en JavaScript, une syntaxe moderne et
                    concise pour déclarer des fonctions. Vous apprendrez quand et comment les utiliser efficacement dans
                    vos projets.
                  </p>

                  <h4 className="text-md font-semibold text-[#0A1F44] mb-3">Objectifs d'apprentissage</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Comprendre la syntaxe des fonctions fléchées</li>
                    <li>Identifier les différences avec les fonctions classiques</li>
                    <li>Savoir quand utiliser chaque type de fonction</li>
                    <li>Maîtriser le contexte (this) dans les fonctions fléchées</li>
                  </ul>

                  <h4 className="text-md font-semibold text-[#0A1F44] mb-3">Ressources supplémentaires</h4>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Documentation
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Exercices pratiques
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 rounded-full bg-[#F18A00] hover:bg-[#E07A00] text-white shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chatbot Window */}
      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg epg-shadow-lg border z-50">
          <div className="flex items-center justify-between p-4 border-b bg-[#0A1F44] text-white rounded-t-lg">
            <h3 className="font-semibold">Assistant IA EPG</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChatbot(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4 p-3 rounded-lg max-w-[80%]",
                  message.sender === "bot" ? "bg-gray-100 text-gray-700" : "bg-[#F18A00] text-white ml-auto",
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Tapez votre question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F18A00]"
              />
              <Button size="sm" onClick={sendMessage} className="bg-[#F18A00] hover:bg-[#E07A00] text-white">
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
