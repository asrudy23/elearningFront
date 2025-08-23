"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { CheckCircle, XCircle, Trophy, RotateCcw, BookOpen, Download, Share2 } from "lucide-react"
import Link from "next/link"

interface QuizResultsPageProps {
  quizId: string
}

export function QuizResultsPage({ quizId }: QuizResultsPageProps) {
  const [resultsData, setResultsData] = useState<any>(null)
  const [showDetailedAnswers, setShowDetailedAnswers] = useState(false)

  useEffect(() => {
    const savedResults = localStorage.getItem(`quiz-results-${quizId}`)
    if (savedResults) {
      setResultsData(JSON.parse(savedResults))
    } else {
      // Fallback data if no results found
      setResultsData({
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        timeSpent: "12 minutes",
        course: "Introduction au JavaScript",
        quizTitle: "Quiz JavaScript - Fonctions",
        completedAt: new Date().toLocaleString("fr-FR"),
        answers: [],
      })
    }
  }, [quizId])

  if (!resultsData) {
    return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">Chargement...</div>
  }

  const chartData = [
    { name: "Correctes", value: resultsData.score, color: "#10B981" },
    { name: "Incorrectes", value: resultsData.totalQuestions - resultsData.score, color: "#EF4444" },
  ]

  const getGradeMessage = (percentage: number) => {
    if (percentage >= 90) return { message: "Excellent travail !", color: "text-green-600", icon: Trophy }
    if (percentage >= 80) return { message: "Très bien !", color: "text-blue-600", icon: Trophy }
    if (percentage >= 70) return { message: "Bien joué !", color: "text-yellow-600", icon: Trophy }
    return { message: "Continuez vos efforts !", color: "text-orange-600", icon: RotateCcw }
  }

  const gradeInfo = getGradeMessage(resultsData.percentage)
  const GradeIcon = gradeInfo.icon
  const isPassed = resultsData.percentage >= 70

  const generateCertificate = () => {
    if (isPassed) {
      alert("Certificat généré ! (Fonctionnalité à implémenter)")
    }
  }

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `Résultats du quiz: ${resultsData.quizTitle}`,
        text: `J'ai obtenu ${resultsData.percentage}% au quiz "${resultsData.quizTitle}" !`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `J'ai obtenu ${resultsData.percentage}% au quiz "${resultsData.quizTitle}" ! ${window.location.href}`,
      )
      alert("Lien copié dans le presse-papiers !")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isPassed ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-[#F18A00] to-[#E07A00]"
            }`}
          >
            <GradeIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#0A1F44] font-heading mb-2">Résultats du Quiz</h1>
          <p className="text-xl text-gray-600">
            {isPassed ? "Félicitations, vous avez réussi !" : "Continuez vos efforts !"}
          </p>
        </div>

        {/* Score Card */}
        <Card className="bg-white epg-shadow mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-[#0A1F44] mb-2">
                {resultsData.score}/{resultsData.totalQuestions}
              </div>
              <div className={`text-2xl font-semibold mb-2 ${isPassed ? "text-green-600" : "text-[#F18A00]"}`}>
                {resultsData.percentage}%
              </div>
              <p className={`text-lg font-medium ${gradeInfo.color}`}>{gradeInfo.message}</p>
              {isPassed && <Badge className="mt-2 bg-green-100 text-green-800 border-green-300">Quiz réussi !</Badge>}
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-600">Quiz</p>
                <p className="font-semibold text-[#0A1F44]">{resultsData.quizTitle}</p>
              </div>
              <div>
                <p className="text-gray-600">Temps passé</p>
                <p className="font-semibold text-[#0A1F44]">{resultsData.timeSpent}</p>
              </div>
              <div>
                <p className="text-gray-600">Terminé le</p>
                <p className="font-semibold text-[#0A1F44]">{resultsData.completedAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Résumé des performances</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Réponses correctes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Réponses incorrectes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white epg-shadow">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Statistiques détaillées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Réponses correctes</p>
                    <p className="text-sm text-green-600">Bien maîtrisé</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">{resultsData.score}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Réponses incorrectes</p>
                    <p className="text-sm text-red-600">À revoir</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-red-600">{resultsData.totalQuestions - resultsData.score}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Score final</p>
                    <p className="text-sm text-blue-600">Sur 100%</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">{resultsData.percentage}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toggle Detailed Answers */}
        {resultsData.answers && resultsData.answers.length > 0 && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowDetailedAnswers(!showDetailedAnswers)}
              className="w-full border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
            >
              {showDetailedAnswers ? "Masquer" : "Afficher"} la révision des réponses
            </Button>
          </div>
        )}

        {/* Detailed Answers */}
        {showDetailedAnswers && resultsData.answers && (
          <Card className="bg-white epg-shadow mb-8">
            <CardHeader>
              <CardTitle className="text-[#0A1F44] font-heading">Révision des réponses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resultsData.answers.map((answer: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    answer.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {answer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-[#0A1F44] mb-2">Question {index + 1}</p>
                      <p className="text-gray-700 mb-3">{answer.question}</p>
                      {answer.options && (
                        <div className="space-y-2 mb-3">
                          {answer.options.map((option: string, optionIndex: number) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded text-sm ${
                                optionIndex === answer.correctAnswer
                                  ? "bg-green-100 text-green-800 font-medium"
                                  : optionIndex === answer.userAnswer && !answer.isCorrect
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-50 text-gray-600"
                              }`}
                            >
                              {optionIndex === answer.correctAnswer && "✓ "}
                              {optionIndex === answer.userAnswer && optionIndex !== answer.correctAnswer && "✗ "}
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <Badge className={answer.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {answer.isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                        {!answer.isCorrect && answer.userAnswer !== -1 && (
                          <p className="text-sm text-gray-600">Votre réponse : {answer.options[answer.userAnswer]}</p>
                        )}
                        {answer.userAnswer === -1 && <p className="text-sm text-gray-600">Aucune réponse donnée</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={shareResults}
            className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager mes résultats
          </Button>
          <Button className="bg-[#F18A00] hover:bg-[#E07A00] text-white" asChild>
            <Link href="/student/courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Retourner au cours
            </Link>
          </Button>
          {isPassed && (
            <Button onClick={generateCertificate} className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le certificat
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
