import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#F18A00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold font-heading">EPG – École</span>
            </div>
            <p className="text-blue-100 mb-6 max-w-md leading-relaxed">
              Une plateforme d'e-learning moderne qui utilise l'intelligence artificielle pour personnaliser votre
              apprentissage et vous accompagner vers la réussite.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-200 hover:text-[#F18A00] transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-blue-200 hover:text-[#F18A00] transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-blue-200 hover:text-[#F18A00] transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-blue-200 hover:text-[#F18A00] transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold font-heading mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-blue-200 hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-blue-200 hover:text-white transition-colors">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-blue-200 hover:text-white transition-colors">
                  Cours
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold font-heading mb-4">Contact</h3>
            <ul className="space-y-2 text-blue-200">
              <li>contact@epg-ecole.fr</li>
              <li>+33 1 23 45 67 89</li>
              <li>
                123 Rue de l'Innovation
                <br />
                75001 Paris, France
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
          <p>&copy; 2024 EPG – École. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
