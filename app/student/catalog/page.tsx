import { StudentLayout } from "@/components/student/student-layout"
import { CourseCatalogPage } from "@/components/student/course-catalog-page"

export default function StudentCatalog() {
  return (
    <StudentLayout>
      <CourseCatalogPage />
    </StudentLayout>
  )
}

