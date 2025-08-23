import { QuizPage } from "@/components/quiz/quiz-page"

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function StudentQuizPage({ params }: QuizPageProps) {
  return <QuizPage quizId={params.id} />
}
