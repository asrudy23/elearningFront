import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-2xl font-bold text-[#0A1F44] font-heading">EPG – École</span>
          </Link>
          <h2 className="text-3xl font-bold text-[#0A1F44] font-heading">Mot de passe oublié</h2>
          <p className="mt-2 text-gray-600">Entrez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 epg-shadow rounded-lg">
          <ForgotPasswordForm />
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link href="/login" className="text-[#F18A00] hover:text-[#E07A00] font-medium">
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
