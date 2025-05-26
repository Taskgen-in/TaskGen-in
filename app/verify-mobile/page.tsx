"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Smartphone, RefreshCw, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function VerifyMobilePage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isVerified, setIsVerified] = useState(false)
  const [userMobile, setUserMobile] = useState("")
  const [isEditingMobile, setIsEditingMobile] = useState(false)
  const [newMobileNumber, setNewMobileNumber] = useState("")

  useEffect(() => {
    // Get user mobile from localStorage or context
    if (typeof window !== "undefined") {
      setUserMobile(localStorage.getItem("userMobile") || "+91 98765 43210")
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (verificationCode === "123456") {
      setIsVerified(true)
      // Update verification status in localStorage
      localStorage.setItem("mobileVerified", "true")
    } else {
      alert("Invalid verification code. Please try again.")
    }

    setIsVerifying(false)
  }

  const handleResendCode = async () => {
    setIsResending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setTimeLeft(300) // Reset timer
    setIsResending(false)
    alert("SMS verification code sent successfully!")
  }

  const handleChangeMobile = async () => {
    if (!newMobileNumber.trim()) {
      alert("Please enter a valid mobile number")
      return
    }

    setIsResending(true)

    // Simulate API call to update mobile and send new OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update the mobile number
    setUserMobile(newMobileNumber)
    localStorage.setItem("userMobile", newMobileNumber)

    // Reset verification state
    setVerificationCode("")
    setTimeLeft(300)
    setIsEditingMobile(false)
    setIsResending(false)

    alert(`SMS verification code sent to ${newMobileNumber}`)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">Mobile Verified!</h1>
                <p className="text-green-700 mb-6">
                  Your mobile number has been successfully verified. You can now proceed to KYC verification.
                </p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/kyc-verification">
                    Continue to KYC Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Verify Your Mobile</CardTitle>
              <CardDescription>
                {!isEditingMobile ? (
                  <div className="space-y-2">
                    <div>
                      We've sent a 6-digit verification code via SMS to
                      <br />
                      <strong>{userMobile}</strong>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => {
                        setIsEditingMobile(true)
                        setNewMobileNumber(userMobile.replace("+91 ", "").replace(/\s/g, ""))
                      }}
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                    >
                      Change mobile number
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>Enter your mobile number to receive verification code</div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm font-medium">+91</span>
                        <Input
                          type="tel"
                          placeholder="Enter mobile number"
                          value={newMobileNumber}
                          onChange={(e) => setNewMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="flex-1"
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleChangeMobile}
                        disabled={newMobileNumber.length !== 10 || isResending}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isResending ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsEditingMobile(false)
                          setNewMobileNumber("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isEditingMobile && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMS Verification Code</label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    onClick={handleVerify}
                    disabled={verificationCode.length !== 6 || isVerifying}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Mobile"
                    )}
                  </Button>

                  <div className="text-center">
                    {timeLeft > 0 ? (
                      <p className="text-sm text-gray-600">
                        Code expires in <Badge variant="outline">{formatTime(timeLeft)}</Badge>
                      </p>
                    ) : (
                      <p className="text-sm text-red-600">Code has expired</p>
                    )}
                  </div>

                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={handleResendCode}
                      disabled={timeLeft > 0 || isResending}
                      className="w-full"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Resend SMS Code"
                      )}
                    </Button>
                  </div>
                </>
              )}

              <div className="text-center text-sm text-gray-500">
                <p>Didn't receive the SMS? Check your network or</p>
                <Link href="/contact" className="text-blue-600 hover:underline">
                  contact support
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
