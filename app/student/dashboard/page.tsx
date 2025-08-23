import { StudentLayout } from "@/components/student/student-layout"
import { StudentDashboard } from "@/components/student/student-dashboard"
import { AIChatbot } from "@/components/shared/ai-chatbot"

export default function StudentDashboardPage() {
  return (
    <StudentLayout>
      <StudentDashboard />
      <AIChatbot />
    </StudentLayout>
  )
}
