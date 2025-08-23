import { QuizResultsPage } from "@/components/quiz/quiz-results-page"

interface QuizResultsPageProps {
  params: {
    id: string
  }
}

export default function StudentQuizResultsPage({ params }: QuizResultsPageProps) {
  return <QuizResultsPage quizId={params.id} />
}
