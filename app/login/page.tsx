"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Eye, EyeOff, User, Shield } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleLogin(e) {
  e.preventDefault();
  setError("");
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  const data = await res.json();
  console.log("Login API response", data);
  if (data.success && data.role) {
    localStorage.setItem("userRole", data.role);
    if (data.role === "admin") {
      router.push("/admin/");
    } else {
      router.push("/dashboard");
    }
  } else {
    setError(data.error || "Login failed");
  }
}


  const fillUserCredentials = () => {
    setFormData({
      email: "user@taskgen.com",
      password: "user123",
    })
  }

  const fillAdminCredentials = () => {
    setFormData({
      email: "admin@taskgen.com",
      password: "admin123",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back</h1>
            <p className="text-gray-600">Login to your TaskGen account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Login to Your Account</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-600 rounded bg-red-50 border border-red-100 p-2">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Login to Dashboard
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Register here
                  </Link>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Demo Credentials
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-600" />
                        <strong className="text-green-700">User Dashboard</strong>
                      </div>
                      <Button size="sm" variant="outline" onClick={fillUserCredentials} className="text-xs">
                        Auto Fill
                      </Button>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        Email: <code className="bg-gray-100 px-1 rounded">user@taskgen.com</code>
                      </div>
                      <div>
                        Password: <code className="bg-gray-100 px-1 rounded">user123</code>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-600" />
                        <strong className="text-red-700">Admin Dashboard</strong>
                      </div>
                      <Button size="sm" variant="outline" onClick={fillAdminCredentials} className="text-xs">
                        Auto Fill
                      </Button>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        Email: <code className="bg-gray-100 px-1 rounded">admin@taskgen.com</code>
                      </div>
                      <div>
                        Password: <code className="bg-gray-100 px-1 rounded">admin123</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-blue-600">
                  💡 Click "Auto Fill" buttons to quickly populate credentials
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
