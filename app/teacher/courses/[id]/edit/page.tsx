import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { EditCoursePage } from "@/components/teacher/edit-course-page"

export default function EditCourse({ params }: { params: { id: string } }) {
  return (
    <TeacherLayout>
      <EditCoursePage courseId={params.id} />
    </TeacherLayout>
  )
}
