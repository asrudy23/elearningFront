import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AIChatbot } from "@/components/shared/ai-chatbot"

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
      <AIChatbot />
    </AdminLayout>
  )
}
