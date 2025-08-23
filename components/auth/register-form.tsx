"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

const interests = [
  "Programmation",
  "Musique",
  "Design",
  "Jeux vidéo",
  "Finance",
  "Marketing",
  "Photographie",
  "Langues",
]

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // --- Ajout du champ téléphone dans l'état ---
    phone: "",
    password: "",
    role: "student",
    interests: [] as string[],
  })

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Registration data:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-[#0A1F44] font-medium">
            Prénom
          </Label>
          <Input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
            className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-[#0A1F44] font-medium">
            Nom
          </Label>
          <Input
            id="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
            className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
            placeholder="Votre nom"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-[#0A1F44] font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
          placeholder="votre.email@exemple.com"
        />
      </div>

      {/* --- NOUVEAU : Champ Téléphone --- */}
      <div>
        <Label htmlFor="phone" className="text-[#0A1F44] font-medium">
          Téléphone (Optionnel)
        </Label>
        <Input
          id="phone"
          type="tel" // type="tel" est plus sémantique pour les numéros de téléphone
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
          placeholder="06 12 34 56 78"
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="text-[#0A1F44] font-medium">
          Mot de passe
        </Label>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]"
          placeholder="Choisissez un mot de passe sécurisé"
        />
      </div>

      {/* Role Selection */}
      <div>
        <Label className="text-[#0A1F44] font-medium mb-3 block">Je suis un(e)</Label>
        <RadioGroup
          value={formData.role}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" className="border-[#0A1F44] text-[#F18A00]" />
            <Label htmlFor="student" className="text-gray-700 cursor-pointer">
              Étudiant
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teacher" id="teacher" className="border-[#0A1F44] text-[#F18A00]" />
            <Label htmlFor="teacher" className="text-gray-700 cursor-pointer">
              Enseignant
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Interests */}
      <div>
        <Label className="text-[#0A1F44] font-medium mb-3 block">Quels sont vos centres d'intérêt ?</Label>
        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest) => (
            <Card
              key={interest}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                formData.interests.includes(interest)
                  ? "border-[#F18A00] bg-[#F18A00]/5"
                  : "border-gray-200 hover:border-[#F18A00]/50"
              }`}
            >
              {/* --- MODIFICATION : padding réduit de p-3 à p-2 --- */}
              <CardContent className="p-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                    className="border-[#0A1F44] data-[state=checked]:bg-[#F18A00] data-[state=checked]:border-[#F18A00]"
                  />
                  <Label htmlFor={interest} className="text-sm text-gray-700 cursor-pointer">
                    {interest}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white py-3 text-lg font-semibold">
        S'inscrire
      </Button>
    </form>
  )
}