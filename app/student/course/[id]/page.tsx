import { CourseViewPage } from "@/components/student/course-view-page"
import { AIChatbot } from "@/components/shared/ai-chatbot"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <>
      <CourseViewPage courseId={params.id} />
      <AIChatbot />
    </>
  )
}
