/*"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { authenticateUser } from "@/lib/mock-users"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = authenticateUser(formData.email, formData.password)

      if (user) {
        // Store user data in localStorage (in a real app, use proper session management)
        localStorage.setItem("currentUser", JSON.stringify(user))

        // Redirect based on user role
        switch (user.role) {
          case "student":
            router.push("/student/dashboard")
            break
          case "teacher":
            router.push("/teacher/dashboard")
            break
          case "admin":
            router.push("/admin/dashboard")
            break
          default:
            router.push("/")
        }
      } else {
        setError("Email ou mot de passe incorrect")
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Handle Google OAuth login
    console.log("Google login initiated")
  }

  const quickLogin = (email: string, password: string) => {
    setFormData({ email, password })
    // Auto-submit after setting the form data
    setTimeout(() => {
      const user = authenticateUser(email, password)
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        switch (user.role) {
          case "student":
            router.push("/student/dashboard")
            break
          case "teacher":
            router.push("/teacher/dashboard")
            break
          case "admin":
            router.push("/admin/dashboard")
            break
        }
      }
    }, 100)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email *//*
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

        {/* Password 
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
            placeholder="Votre mot de passe"
          />
        </div>

        {/* Forgot Password Link 
        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-[#F18A00] hover:text-[#E07A00] font-medium">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Login Button 
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
        >
          {isLoading ? "Connexion..." : "Connexion"}
        </Button>

        {/* Separator 
        <div className="relative">
          <Separator className="bg-gray-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">ou</span>
          </div>
        </div>

        {/* Google Login Button 
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full border-gray-300 hover:bg-gray-50 py-3 text-lg font-semibold bg-transparent"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Connexion avec Google
        </Button>
      </form>

    </div>
  )

}*/

"use client"


import { useLoginMutation } from "@/lib/query/mutations/auth.mutation"
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate: login, isPending, isError, error } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login(formData);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
  };
  
  const errorMessage = error?.response?.data?.message || "Email ou mot de passe incorrect.";

  return (
    <div className="space-y-6">
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-[#0A1F44] font-medium">Email</Label>
          <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]" placeholder="votre.email@exemple.com"/>
        </div>

        <div>
          <Label htmlFor="password" className="text-[#0A1F44] font-medium">Mot de passe</Label>
          <Input id="password" type="password" required value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} className="mt-1 border-gray-300 focus:border-[#F18A00] focus:ring-[#F18A00]" placeholder="Votre mot de passe"/>
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-[#F18A00] hover:text-[#E07A00] font-medium">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" disabled={isPending} className="w-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white py-3 text-lg font-semibold disabled:opacity-50">
          {isPending ? "Connexion..." : "Connexion"}
        </Button>
        
        <div className="relative">
          <Separator className="bg-gray-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">ou</span>
          </div>
        </div>

        <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full border-gray-300 hover:bg-gray-50 py-3 text-lg font-semibold bg-transparent">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Connexion avec Google
        </Button>
      </form>
    </div>
  );
}