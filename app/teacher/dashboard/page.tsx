import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { TeacherDashboard } from "@/components/teacher/teacher-dashboard"
import { AIChatbot } from "@/components/shared/ai-chatbot"

export default function TeacherDashboardPage() {
  return (
    <TeacherLayout>
      <TeacherDashboard />
      <AIChatbot />
    </TeacherLayout>
  )
}
