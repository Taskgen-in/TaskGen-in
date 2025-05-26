"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Smartphone, CreditCard, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

export default function PaymentSetupPage() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [formData, setFormData] = useState({
    upiId: "",
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
    accountHolderName: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const payload = {
    paymentMethod,
    upiId: paymentMethod === "upi" ? formData.upiId : null,
    bankAccount: paymentMethod === "bank"
      ? {
          accountHolderName: formData.accountHolderName,
          bankAccountNumber: formData.bankAccountNumber,
          ifscCode: formData.ifscCode,
          bankName: formData.bankName
        }
      : null
  };


 const res = await fetch("/api/user/payment-method", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();

  if (data.success) {
    setIsSetupComplete(true);
    localStorage.setItem("paymentSetup", "true");
    localStorage.setItem("paymentMethod", paymentMethod);
  } else {
    alert(data.error || "Something went wrong");
  }

  setIsSubmitting(false);
};

    // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000))

  //   setIsSetupComplete(true)
  //   localStorage.setItem("paymentSetup", "true")
  //   localStorage.setItem("paymentMethod", paymentMethod)

  //   setIsSubmitting(false)
  // }

  if (isSetupComplete) {
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
                <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Setup Complete!</h1>
                <p className="text-green-700 mb-6">
                  Your payment method has been successfully configured. You're now ready to start earning!
                </p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard">
                    Go to Dashboard
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Shield className="h-4 w-4 mr-1" />
              Secure Payment Setup
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Payment Method</h1>
            <p className="text-gray-600">
              Configure your preferred payment method to receive earnings from completed tasks
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Select how you'd like to receive your task earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer transition-all ${
                      paymentMethod === "upi" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <CardContent className="p-4 text-center">
                      <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">UPI Payment</h3>
                      <p className="text-sm text-gray-600">Instant payments</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">Recommended</Badge>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all ${
                      paymentMethod === "bank" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Bank Account</h3>
                      <p className="text-sm text-gray-600">1-2 business days</p>
                    </CardContent>
                  </Card>
                </div>

                {/* UPI Form */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        placeholder="yourname@paytm / yourname@gpay"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Enter your UPI ID (e.g., 9876543210@paytm, yourname@gpay)
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Account Form */}
                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountHolderName">Account Holder Name</Label>
                      <Input
                        id="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                        placeholder="As per bank records"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankAccountNumber">Account Number</Label>
                        <Input
                          id="bankAccountNumber"
                          value={formData.bankAccountNumber}
                          onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                          placeholder="Bank account number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          value={formData.ifscCode}
                          onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                          placeholder="IFSC Code"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        placeholder="Bank name"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                {paymentMethod && (
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? "Setting up..." : "Complete Payment Setup"}
                  </Button>
                )}
              </form>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Security & Privacy</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your payment information is encrypted and secure</li>
                  <li>• We never store your complete bank account details</li>
                  <li>• Payments are processed through secure banking channels</li>
                  <li>• You can update your payment method anytime</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
