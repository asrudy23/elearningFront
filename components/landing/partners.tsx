const partners = [
  { name: "Microsoft", logo: "/microsoft-logo.png" },
  { name: "Google", logo: "/google-logo.png" },
  { name: "Amazon", logo: "/amazon-logo.png" },
  { name: "Meta", logo: "/meta-logo-abstract.png" },
  { name: "Apple", logo: "/apple-logo.png" },
  { name: "IBM", logo: "/ibm-logo.png" },
]

export function Partners() {
  return (
    <section id="partners" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] font-heading mb-4">Nos partenaires</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous collaborons avec les leaders de l'industrie pour vous offrir les meilleures formations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg epg-shadow hover:epg-shadow-lg transition-all duration-300"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`Logo ${partner.name}`}
                className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
