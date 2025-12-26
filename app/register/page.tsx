"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (data: { name: string; email: string; password: string; role: string }) => {
    setIsLoading(true)
    setError("")

    try {
      // JWT placeholder: In production, call actual API endpoint
      // const response = await auth.register(data)
      // const token = response.token

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Store token (in production, use secure HTTP-only cookies)
      localStorage.setItem("token", "jwt-token-placeholder")
      localStorage.setItem("userRole", data.role)

      // Redirect based on role
      router.push(`/${data.role}/dashboard`)
    } catch (err) {
      setError("Registration failed. Please try again.")
      console.error("Register error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">LM</span>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground">Join Labor Management System</p>
        </div>
        <AuthForm type="register" onSubmit={handleRegister} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}
