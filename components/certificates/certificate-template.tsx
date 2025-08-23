"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Award } from "lucide-react"

interface CertificateTemplateProps {
  studentName: string
  courseName: string
  completionDate: string
  score?: string
}

export function CertificateTemplate({ studentName, courseName, completionDate, score }: CertificateTemplateProps) {
  const handleDownloadPDF = () => {
    // Simulate PDF generation
    console.log("Generating PDF certificate...")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-end">
        <Button onClick={handleDownloadPDF} className="bg-[#F18A00] hover:bg-[#F18A00]/90">
          <Download className="h-4 w-4 mr-2" />
          Télécharger PDF
        </Button>
      </div>

      {/* Certificate */}
      <Card className="p-12 bg-white border-4 border-[#0A1F44] relative overflow-hidden">
        {/* Decorative Border */}
        <div className="absolute inset-4 border-2 border-[#F18A00] opacity-20"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-12 w-12 text-[#F18A00] mr-3" />
            <h1 className="text-3xl font-bold text-[#0A1F44]">EPG ÉCOLE</h1>
          </div>
          <div className="w-24 h-1 bg-[#F18A00] mx-auto"></div>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#0A1F44] mb-4">CERTIFICAT DE RÉUSSITE</h2>
          <p className="text-lg text-gray-600">Décerné à</p>
        </div>

        {/* Student Name */}
        <div className="text-center mb-8">
          <h3 className="text-5xl font-bold text-[#0A1F44] border-b-2 border-[#F18A00] pb-2 inline-block">
            {studentName}
          </h3>
        </div>

        {/* Course Details */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700 mb-2">pour avoir complété avec succès le cours</p>
          <h4 className="text-2xl font-semibold text-[#0A1F44] mb-4">"{courseName}"</h4>
          {score && (
            <p className="text-lg text-gray-600">
              avec un score de <span className="font-bold text-[#F18A00]">{score}</span>
            </p>
          )}
        </div>

        {/* Date and Signature */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Date d'achèvement</p>
            <p className="text-lg font-semibold text-[#0A1F44] border-b border-gray-300 pb-1">{completionDate}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Directeur EPG École</p>
            <div className="w-32 border-b border-gray-300 pb-1">
              <p className="text-lg font-semibold text-[#0A1F44]">Dr. Martin Dubois</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Ce certificat atteste de la réussite du programme de formation EPG École
          </p>
        </div>
      </Card>
    </div>
  )
}
