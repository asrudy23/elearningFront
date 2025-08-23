"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle forgot password logic here
    console.log("Forgot password for:", email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Un email de réinitialisation a été envoyé à <strong>{email}</strong>. Vérifiez votre boîte de réception et
          suivez les instructions.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-[#0A1F44] font-medium">
          Adresse email
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
          placeholder="votre.email@exemple.com"
        />
      </div>

      <Button type="submit" className="w-full bg-[#F18A00] hover:bg-[#E07A00] text-white py-3 text-lg font-semibold">
        Envoyer le lien de réinitialisation
      </Button>
    </form>
  )
}
