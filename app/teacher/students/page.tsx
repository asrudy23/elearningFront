import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { TeacherStudentsPage } from "@/components/teacher/teacher-students-page"

export default function StudentsPage() {
  return (
    <TeacherLayout>
      <TeacherStudentsPage />
    </TeacherLayout>
  )
}
