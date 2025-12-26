"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError("")

    try {
      // JWT placeholder: In production, call actual API endpoint
      // const response = await auth.login(data.email, data.password)
      // const token = response.token

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Store token (in production, use secure HTTP-only cookies)
      localStorage.setItem("token", "jwt-token-placeholder")
      localStorage.setItem("userRole", "admin") // For demo purposes

      // Redirect based on role
      const role = localStorage.getItem("userRole")
      router.push(`/${role}/dashboard`)
    } catch (err) {
      setError("Invalid email or password. Please try again.")
      console.error("Login error:", err)
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
          <h1 className="mb-2 text-3xl font-bold text-foreground">Labor Management System</h1>
          <p className="text-muted-foreground">Manage your workforce efficiently</p>
        </div>
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}
