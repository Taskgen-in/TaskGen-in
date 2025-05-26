"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    agreeTerms: false,
  })
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"register" | "verify">("register")
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registerEmail, setRegisterEmail] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setInfo("")
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStep("verify")
        setRegisterEmail(formData.email)
        setInfo("Registration successful! Please check your email for the OTP.")
      } else {
        setError(data.error || "Registration failed.")
      }
    } catch (err) {
      setError("Server error. Please try again later.")
    }
    setIsLoading(false)
  }

const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setInfo("")
  setIsLoading(true)
  try {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: registerEmail, otp }),
    })
    const data = await res.json()
    if (data.success) {
      // Set session for the user (for demo: localStorage; use cookies/JWT for production)
      // localStorage.setItem("currentUser", registerEmail)
      // localStorage.setItem("userRole", "user")
      setInfo("Email verified! Redirecting to dashboard...")
      setTimeout(() => (window.location.href = "/dashboard"), 1500)
    } else {
      setError(data.error || "OTP verification failed.")
    }
  } catch (err) {
    setError("Server error. Please try again later.")
  }
  setIsLoading(false)
}

  const benefits = [
    "Start earning immediately after verification",
    "Access to 500+ daily tasks",
    "Instant UPI/Bank withdrawals",
    "24/7 customer support",
    "No hidden fees or charges",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Join TaskGen Today</h1>
            <p className="text-gray-600">Create your free account and start earning from home</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Registration or OTP Form */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  {step === "register" ? "Create Your Account" : "Verify Your Email"}
                </CardTitle>
                <CardDescription>
                  {step === "register"
                    ? "Fill in your details to get started. It only takes 2 minutes!"
                    : `Enter the OTP sent to your email (${registerEmail})`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "register" ? (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
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
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreeTerms: checked as boolean })
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {error && (
                      <div className="text-sm text-red-600 rounded bg-red-50 border border-red-100 p-2">
                        {error}
                      </div>
                    )}
                    {info && (
                      <div className="text-sm text-green-700 rounded bg-green-50 border border-green-100 p-2">
                        {info}
                      </div>
                    )}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account - It's Free"}
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-600 hover:underline">
                        Login here
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                      />
                    </div>
                    {error && (
                      <div className="text-sm text-red-600 rounded bg-red-50 border border-red-100 p-2">
                        {error}
                      </div>
                    )}
                    {info && (
                      <div className="text-sm text-green-700 rounded bg-green-50 border border-green-100 p-2">
                        {info}
                      </div>
                    )}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <div className="text-center text-sm text-gray-600 mt-2">
                      Didn't get the OTP? Check your spam or <b>wait a minute and try again.</b>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="space-y-6">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Why Join TaskGen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Next Steps After Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <span className="text-blue-700">Verify your email and mobile number</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span className="text-blue-700">Complete KYC with documents and payment details</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <span className="text-blue-700">Start browsing and completing tasks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
