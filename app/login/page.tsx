import { LoginForm } from "@/components/auth/login-form";
import { TestAccountsInfo } from "@/components/auth/test-accounts-infos";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Login Section */}
          {/* La seule modification est l'ajout de "lg:col-span-2" ici  */}
          <div className="max-w-md w-full mx-auto space-y-8 lg:col-span-2">
            {/* Header */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 mb-8"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-2xl font-bold text-[#0A1F44] font-heading">
                  EPG – École
                </span>
              </Link>
              <h2 className="text-3xl font-bold text-[#0A1F44] font-heading">
                Connexion
              </h2>
              <p className="mt-2 text-gray-600">
                Accédez à votre espace d'apprentissage
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white py-8 px-6 epg-shadow rounded-lg">
              <LoginForm />
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-[#F18A00] hover:text-[#E07A00] font-medium"
                >
                  S'inscrire gratuitement
                </Link>
              </p>
            </div>
          </div>

          {/* Test Accounts Section 
          <div className="w-full">
            <TestAccountsInfo />
          </div>*/}
        </div>
      </div>
    </div>
  );
}