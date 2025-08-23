import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function RegisterPage() {
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
          <h2 className="text-3xl font-bold text-[#0A1F44] font-heading">Créer votre compte</h2>
          <p className="mt-2 text-gray-600">Rejoignez notre communauté d'apprenants</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white py-8 px-6 epg-shadow rounded-lg">
          <RegisterForm />
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-[#F18A00] hover:text-[#E07A00] font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
