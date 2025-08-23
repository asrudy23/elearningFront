import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { CourseStatisticsPage } from "@/components/teacher/course-statistics-page"

export default function CourseStatistics({ params }: { params: { id: string } }) {
  return (
    <TeacherLayout>
      <CourseStatisticsPage courseId={params.id} />
    </TeacherLayout>
  )
}
