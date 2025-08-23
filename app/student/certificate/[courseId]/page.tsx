import { CertificateTemplate } from "@/components/certificates/certificate-template"

export default function CertificatePage({ params }: { params: { courseId: string } }) {
  // Mock data - in real app, fetch from API
  const certificateData = {
    studentName: "Marie Dupont",
    courseName: "Développement Web avec JavaScript",
    completionDate: "15 Décembre 2024",
    score: "92/100",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CertificateTemplate {...certificateData} />
    </div>
  )
}
