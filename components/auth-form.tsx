"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form-input"
import { Card } from "@/components/ui/card"

interface AuthFormProps {
  type: "login" | "register"
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
  error?: string
}

export function AuthForm({ type, onSubmit, isLoading = false, error }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    role: "labor",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (type === "register") {
      if (!formData.name) newErrors.name = "Name is required"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      if (type === "login") {
        await onSubmit({ email: formData.email, password: formData.password })
      } else {
        await onSubmit({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        })
      }
    } catch (err) {
      console.error("Form submission error:", err)
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="mb-2 text-2xl font-bold text-foreground">{type === "login" ? "Sign In" : "Create Account"}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {type === "login" ? "Enter your credentials to access your account" : "Create a new account to get started"}
      </p>

      {error && <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <FormInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            required
          />
        )}

        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
          error={errors.password}
          required
        />

        {type === "register" && (
          <>
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
              error={errors.confirmPassword}
              required
            />

            <FormInput
              label="Role"
              type="select"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Administrator</option>
              <option value="manager">Manager</option>
              <option value="labor">Labor</option>
            </FormInput>
          </>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : type === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {type === "login" ? "Don't have an account? " : "Already have an account? "}
        <a href={type === "login" ? "/register" : "/login"} className="font-medium text-primary hover:underline">
          {type === "login" ? "Sign up" : "Sign in"}
        </a>
      </p>
    </Card>
  )
}
