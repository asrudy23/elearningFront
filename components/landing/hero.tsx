import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1F44] via-[#1E3A8A] to-[#0A1F44] text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
            Apprenez à votre rythme avec <span className="text-[#F18A00]">l'intelligence artificielle</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Découvrez une nouvelle façon d'apprendre grâce à notre plateforme d'e-learning qui s'adapte à vos besoins et
            vous accompagne dans votre progression.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-[#F18A00] hover:bg-[#E07A00] text-white px-8 py-4 text-lg font-semibold rounded-lg epg-shadow"
            >
              <Link href="/register">Commencer maintenant</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-[#0A1F44] px-8 py-4 text-lg font-semibold rounded-lg bg-transparent"
            >
              <Link href="#features">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#F18A00]/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
    </section>
  )
}
