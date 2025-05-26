"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin"
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (in a real app, this would check tokens/session)
    const currentUser = localStorage.getItem("currentUser")
    const currentRole = localStorage.getItem("userRole")

    if (currentUser && currentRole) {
      setIsAuthenticated(true)
      setUserRole(currentRole)

      // Check if user has required role
      if (requiredRole && currentRole !== requiredRole) {
        router.push("/login")
        return
      }
    } else {
      router.push("/login")
      return
    }
  }, [requiredRole, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
