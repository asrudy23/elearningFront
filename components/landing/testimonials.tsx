import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Étudiante en Marketing",
    image: "/professional-woman-smiling.png",
    quote:
      "EPG École a révolutionné ma façon d'apprendre. L'IA comprend vraiment mes besoins et me propose toujours le contenu parfait au bon moment.",
  },
  {
    name: "Thomas Martin",
    role: "Développeur Web",
    image: "/professional-man-glasses.png",
    quote:
      "Les cours sont excellents et l'interface est intuitive. J'ai pu monter en compétences rapidement grâce aux recommandations personnalisées.",
  },
  {
    name: "Sophie Laurent",
    role: "Designer UX/UI",
    image: "/creative-woman-designer.png",
    quote:
      "Une plateforme moderne qui s'adapte vraiment à mon emploi du temps. Les quiz interactifs rendent l'apprentissage ludique et efficace.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] font-heading mb-4">
            Ce que disent nos étudiants
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de ceux qui ont transformé leur apprentissage avec EPG École
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white epg-shadow hover:epg-shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-[#F18A00] text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-[#0A1F44] font-heading">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
