import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Brain, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Inscrivez-vous",
    description: "Créez votre compte en quelques minutes et définissez vos objectifs d'apprentissage.",
  },
  {
    icon: Brain,
    title: "Recevez des recommandations",
    description: "Notre IA analyse vos préférences et vous propose des cours personnalisés.",
  },
  {
    icon: TrendingUp,
    title: "Apprenez et progressez",
    description: "Suivez vos cours, passez des quiz et suivez votre progression en temps réel.",
  },
]

export function HowItWorks() {
  return (
    <section id="features" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] font-heading mb-4">Comment ça marche ?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trois étapes simples pour commencer votre parcours d'apprentissage personnalisé
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300 border-0"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#F18A00] rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#0A1F44] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0A1F44] font-heading mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
