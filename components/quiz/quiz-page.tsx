"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface QuizPageProps {
  quizId: string
}

const quizData = {
  id: "1",
  title: "Quiz JavaScript - Fonctions",
  course: "Introduction au JavaScript",
  totalQuestions: 10,
  timeLimit: 15, // minutes
  questions: [
    {
      id: 1,
      question: "Quelle est la syntaxe correcte pour déclarer une fonction en JavaScript ?",
      options: ["function myFunction() {}", "def myFunction() {}", "func myFunction() {}", "function: myFunction() {}"],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Comment appelle-t-on une fonction qui se retourne elle-même ?",
      options: ["Une fonction callback", "Une fonction récursive", "Une fonction anonyme", "Une fonction fléchée"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Que retourne une fonction JavaScript si aucun return n'est spécifié ?",
      options: ["null", "0", "undefined", "false"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Quelle est la différence principale entre 'function' et '=>' ?",
      options: [
        "Aucune différence",
        "Les fonctions fléchées n'ont pas leur propre 'this'",
        "Les fonctions fléchées sont plus lentes",
        "Les fonctions classiques ne peuvent pas avoir de paramètres",
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Comment passer un nombre variable d'arguments à une fonction ?",
      options: ["Avec ...args", "Avec *args", "Avec &args", "Avec @args"],
      correctAnswer: 0,
    },
    {
      id: 6,
      question: "Quelle méthode permet de lier le contexte 'this' à une fonction ?",
      options: ["bind()", "call()", "apply()", "Toutes les réponses"],
      correctAnswer: 3,
    },
    {
      id: 7,
      question: "Qu'est-ce qu'une closure en JavaScript ?",
      options: [
        "Une fonction qui ferme le navigateur",
        "Une fonction qui a accès aux variables de son scope parent",
        "Une fonction sans paramètres",
        "Une fonction qui ne retourne rien",
      ],
      correctAnswer: 1,
    },
    {
      id: 8,
      question: "Comment déclarer une fonction fléchée avec un seul paramètre ?",
      options: ["(x) => x * 2", "x => x * 2", "Les deux sont correctes", "Aucune n'est correcte"],
      correctAnswer: 2,
    },
    {
      id: 9,
      question: "Que signifie 'hoisting' en JavaScript ?",
      options: [
        "L'élévation des déclarations en haut du scope",
        "La suppression des variables",
        "L'optimisation du code",
        "La compilation du code",
      ],
      correctAnswer: 0,
    },
    {
      id: 10,
      question: "Quelle est la portée d'une variable déclarée avec 'let' ?",
      options: ["Globale", "Fonction", "Bloc", "Module"],
      correctAnswer: 2,
    },
  ],
}

export function QuizPage({ quizId }: QuizPageProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60) // in seconds
  const [showTimeWarning, setShowTimeWarning] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    if (!quizStarted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleSubmit()
          return 0
        }
        if (prev <= 300 && !showTimeWarning) {
          // Show warning when 5 minutes left
          setShowTimeWarning(true)
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, showTimeWarning])

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: Number.parseInt(value),
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const score = Object.entries(answers).reduce((total, [questionIndex, userAnswer]) => {
      const question = quizData.questions[Number.parseInt(questionIndex)]
      return total + (question.correctAnswer === userAnswer ? 1 : 0)
    }, 0)

    const percentage = Math.round((score / quizData.questions.length) * 100)
    const timeSpent = quizData.timeLimit * 60 - timeRemaining

    // Store results in localStorage for the results page
    const results = {
      score,
      totalQuestions: quizData.questions.length,
      percentage,
      timeSpent: Math.floor(timeSpent / 60) + " minutes",
      answers: quizData.questions.map((question, index) => ({
        question: question.question,
        options: question.options,
        userAnswer: answers[index] ?? -1,
        correctAnswer: question.correctAnswer,
        isCorrect: answers[index] === question.correctAnswer,
      })),
      quizTitle: quizData.title,
      course: quizData.course,
      completedAt: new Date().toLocaleString("fr-FR"),
    }

    localStorage.setItem(`quiz-results-${quizId}`, JSON.stringify(results))
    router.push(`/student/quiz/${quizId}/results`)
  }

  const handleSaveAndExit = () => {
    // Save current progress
    localStorage.setItem(`quiz-progress-${quizId}`, JSON.stringify({ answers, currentQuestion, timeRemaining }))
    router.push("/student/courses")
  }

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
  }

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const currentQ = quizData.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quizData.questions.length - 1
  const answeredQuestions = Object.keys(answers).length

  // Format time remaining
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white epg-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[#0A1F44] font-heading mb-4">{quizData.title}</CardTitle>
              <p className="text-gray-600">{quizData.course}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-[#F8F9FA] rounded-lg">
                  <p className="text-2xl font-bold text-[#0A1F44]">{quizData.totalQuestions}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="p-4 bg-[#F8F9FA] rounded-lg">
                  <p className="text-2xl font-bold text-[#F18A00]">{quizData.timeLimit}</p>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#0A1F44]">Instructions :</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Vous avez {quizData.timeLimit} minutes pour compléter ce quiz</li>
                  <li>• Une seule réponse par question</li>
                  <li>• Vous pouvez naviguer entre les questions</li>
                  <li>• Le quiz sera automatiquement soumis à la fin du temps</li>
                  <li>• Vous devez obtenir au moins 70% pour réussir</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/student/courses">Annuler</Link>
                </Button>
                <Button onClick={() => setQuizStarted(true)} className="flex-1 bg-[#F18A00] hover:bg-[#E07A00]">
                  Commencer le quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/student/courses" className="inline-flex items-center text-[#F18A00] hover:text-[#E07A00] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au cours
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A1F44] font-heading mb-2">{quizData.title}</h1>
              <p className="text-gray-600">{quizData.course}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 ${timeRemaining <= 300 ? "text-red-600" : "text-[#F18A00]"}`}
              >
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
                {showTimeWarning && <AlertTriangle className="w-4 h-4 text-red-600" />}
              </div>
              <Badge className="bg-[#0A1F44] text-white">
                Question {currentQuestion + 1} sur {quizData.totalQuestions}
              </Badge>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#0A1F44]">Progression</span>
            <span className="text-sm text-gray-600">
              {answeredQuestions} sur {quizData.totalQuestions} répondues
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {quizData.questions.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 p-0 ${
                  index === currentQuestion
                    ? "bg-[#F18A00] text-white border-[#F18A00]"
                    : answers[index] !== undefined
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white epg-shadow mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-[#0A1F44] font-heading">
              Question {currentQuestion + 1} sur {quizData.totalQuestions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-[#F8F9FA] rounded-lg">
              <p className="text-lg text-[#0A1F44] leading-relaxed">{currentQ.question}</p>
            </div>

            <RadioGroup
              value={answers[currentQuestion]?.toString() || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-[#F18A00] transition-colors cursor-pointer ${
                    answers[currentQuestion] === index ? "border-[#F18A00] bg-orange-50" : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-700">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Précédent
          </Button>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleSaveAndExit}
              className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white bg-transparent"
            >
              Sauvegarder et continuer plus tard
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              className="bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white px-8"
            >
              {isLastQuestion ? "Soumettre le quiz" : "Suivant"}
            </Button>
          </div>
        </div>

        {/* Time Warning */}
        {showTimeWarning && (
          <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="font-medium">Attention ! Il vous reste moins de 5 minutes.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
