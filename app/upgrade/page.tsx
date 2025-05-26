"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
import { CheckCircle, Star, Shield, ArrowLeft, Copy, Smartphone, CreditCard, Clock } from "lucide-react"
import Link from "next/link"

export default function UpgradePage() {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [transactionId, setTransactionId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  // Countdown timer for payment
  useEffect(() => {
    if (timeLeft > 0 && !isPaymentComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isPaymentComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!transactionId.trim()) {
    alert("Please enter the transaction ID");
    return;
  }

  setIsSubmitting(true);

  //   // Simulate payment verification
  //   await new Promise((resolve) => setTimeout(resolve, 3000))

  //   // Store premium status
  //   localStorage.setItem("isPremium", "true")
  //   localStorage.setItem("premiumActivatedAt", new Date().toISOString())
  //   localStorage.setItem("premiumExpiresAt", new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString())

  //   setIsPaymentComplete(true)
  //   setIsSubmitting(false)
  // }

const data = await res.json();
  if (data.success) {
    setIsPaymentComplete(true);
    // Optionally set localStorage for UI changes
    localStorage.setItem("isPremium", "true");
    localStorage.setItem("premiumActivatedAt", new Date().toISOString());
    localStorage.setItem(
      "premiumExpiresAt",
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    );
  } else {
    alert(data.error || "Could not submit payment, please try again.");
  }

  setIsSubmitting(false);
};

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const premiumFeatures = [
    { icon: "🚀", title: "Unlimited Withdrawals", description: "No monthly limits or restrictions" },
    { icon: "💎", title: "Premium Tasks Access", description: "Higher paying exclusive tasks" },
    { icon: "⚡", title: "Priority Support", description: "WhatsApp & email priority support" },
    { icon: "📊", title: "Advanced Analytics", description: "Detailed earnings and performance insights" },
    { icon: "🎯", title: "Higher Task Limits", description: "Access to more tasks simultaneously" },
    { icon: "🔔", title: "Early Access", description: "First access to new features and tasks" },
    { icon: "👑", title: "Premium Badge", description: "Stand out with premium member status" },
    { icon: "💰", title: "Bonus Earnings", description: "Extra rewards and referral bonuses" },
  ]

  if (isPaymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/*<Header />*/}

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-green-800 mb-4">🎉 Welcome to Premium!</h1>

                <p className="text-green-700 mb-6 text-lg">
                  Your Premium membership has been activated successfully! You now have access to all premium features.
                </p>

                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Your Premium Benefits:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Unlimited withdrawals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Premium tasks access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Advanced analytics</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/tasks">Browse Premium Tasks</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/*<Header />*/}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
           {/*Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upgrade to Premium</h1>
              <p className="text-gray-600">Unlock unlimited earning potential for just ₹199/year</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Premium Features */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-6 w-6 text-orange-500" />
                    <CardTitle className="text-xl">Premium Benefits</CardTitle>
                  </div>
                  <CardDescription>Everything you get with Premium membership</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-lg">{feature.icon}</span>
                        <div>
                          <h4 className="font-medium text-sm">{feature.title}</h4>
                          <p className="text-xs text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">₹199</div>
                      <div className="text-sm text-gray-600">per year</div>
                      <div className="text-xs text-green-600 mt-1">Save ₹1,189 vs monthly!</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Complete Your Payment
                    <Badge className="bg-orange-100 text-orange-800">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(timeLeft)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Choose your preferred payment method and complete the transaction</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Payment Method Selection */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "upi" ? "ring-2 ring-orange-500 bg-orange-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setPaymentMethod("upi")}
                    >
                      <CardContent className="p-4 text-center">
                        <Smartphone className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <h3 className="font-semibold">UPI Payment</h3>
                        <p className="text-sm text-gray-600">Instant & Secure</p>
                        <Badge className="mt-2 bg-green-100 text-green-800">Recommended</Badge>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "bank" ? "ring-2 ring-orange-500 bg-orange-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <CardContent className="p-4 text-center">
                        <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <h3 className="font-semibold">Bank Transfer</h3>
                        <p className="text-sm text-gray-600">Direct Transfer</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* UPI Payment */}
                  {paymentMethod === "upi" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Scan QR Code to Pay ₹199</h3>

                        {/* QR Code */}
                         <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                          <img
                            src="/images/QrCode.jpeg"
                            alt="TaskGen Payment QR Code"
                            className="w-64 h-auto rounded-lg mx-auto"
                          />
                        </div>

                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-600">Or pay directly to UPI ID:</p>
                          <div className="flex items-center justify-center gap-2">
                            <code className="bg-gray-100 px-3 py-1 rounded text-sm">taskgen@paytm</code>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard("taskgen@paytm")}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <Shield className="h-4 w-4 inline mr-1" />
                            Amount: ₹199 | Reference: PREMIUM-{Date.now().toString().slice(-6)}
                          </p>
                        </div>
                      </div>

                      {/* Transaction ID Input */}
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="transactionId">Transaction ID / UTR Number</Label>
                          <Input
                            id="transactionId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction ID after payment"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Enter the transaction ID you received after making the payment
                          </p>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting || !transactionId.trim()}
                          className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                          {isSubmitting ? "Verifying Payment..." : "Verify Payment & Activate Premium"}
                        </Button>
                      </form>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {paymentMethod === "bank" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Bank Transfer Details</h3>

                        <Card className="text-left">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Account Name:</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">TaskGen INDIA SOLUTIONS</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard("TaskGen Technologies")}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Account Number:</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">201013426397</span>
                                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("201013426397")}>
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">IFSC Code:</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">INDB0000859</span>
                                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("INDB0000859")}>
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Bank Name:</span>
                                <span className="font-medium">INDUSIND Bank</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium text-orange-600">₹199</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <Clock className="h-4 w-4 inline mr-1" />
                            Bank transfers may take 1-2 business days to process
                          </p>
                        </div>
                      </div>

                      {/* Transaction ID Input */}
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="bankTransactionId">Transaction Reference Number</Label>
                          <Input
                            id="bankTransactionId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter bank transaction reference number"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Enter the reference number from your bank transfer receipt
                          </p>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting || !transactionId.trim()}
                          className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                          {isSubmitting ? "Verifying Payment..." : "Submit Payment Details"}
                        </Button>
                      </form>
                    </div>
                  )}

                  {/* Support Information */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Need Help?</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📧 Email: info@taskgen.in</p>
                      <p>📱 WhatsApp: +91 9344759416</p>
                      <p>⏰ Support Hours: 9 AM - 6 PM (Mon-Sat)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="mt-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Secure Payment</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Your payment information is encrypted and secure</li>
                    <li>• Premium membership is activated instantly after verification</li>
                    <li>• 30-day money-back guarantee if not satisfied</li>
                    <li>• All transactions are processed through secure banking channels</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/*<Footer />*/}
    </div>
  )
}
