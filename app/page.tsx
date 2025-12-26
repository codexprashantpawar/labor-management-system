"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole") || "admin"

    if (!token) {
      router.push("/login")
    } else {
      router.push(`/${role}/dashboard`)
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}
