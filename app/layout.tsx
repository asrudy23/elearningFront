import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"

// --- VOS IMPORTS EXISTANTS ---
import { Toaster } from "@/components/ui/toaster"

// --- IMPORTS REQUIS AJOUTÉS ---
import QueryProvider from './providers/QueryProvider'
import { AuthProvider } from './context/AuthContext'

const workSans = Work_Sans({ // J'ai renommé la variable pour éviter la confusion avec le type "inter"
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Vous l'avez nommée --font-inter, c'est ok si c'est voulu
})

export const metadata: Metadata = {
  title: "EPG – École | Apprenez à votre rythme avec l'IA",
  description:
    "Une plateforme d'e-learning moderne qui utilise l'intelligence artificielle pour personnaliser votre apprentissage.",
  generator: "EPG École",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${workSans.variable} antialiased`}>
      <body className="font-sans">
        {/*
          Les providers doivent envelopper le contenu de l'application ({children})
          pour que leurs fonctionnalités (cache de données, état d'authentification)
          soient disponibles sur toutes les pages.
        */}
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}