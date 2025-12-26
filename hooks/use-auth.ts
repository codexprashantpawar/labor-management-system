"use client"

import { useState, useCallback } from "react"

interface AuthState {
  isAuthenticated: boolean
  userRole: "admin" | "manager" | "labor" | null
  userName: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    userName: null,
  })

  const login = useCallback((role: "admin" | "manager" | "labor", name: string) => {
    localStorage.setItem("token", "jwt-token-placeholder")
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", name)
    setAuthState({
      isAuthenticated: true,
      userRole: role,
      userName: name,
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      userName: null,
    })
  }, [])

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole") as "admin" | "manager" | "labor" | null
    const name = localStorage.getItem("userName")

    if (token && role) {
      setAuthState({
        isAuthenticated: true,
        userRole: role,
        userName: name,
      })
    }

    return !!token
  }, [])

  return { ...authState, login, logout, checkAuth }
}
