"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
import {
  Upload,
  CreditCard,
  Smartphone,
  Shield,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function KYCVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Documents
    aadhaarNumber: "",
    panNumber: "",
    aadhaarFile: null,
    panFile: null,
    selfieFile: null,

    // Payment Details
    paymentMethod: "",
    upiId: "",
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
    accountHolderName: "",

    // Agreements
    agreeKYC: false,
    agreeDataUsage: false,
  })

  const steps = [
    {
      number: 1,
      title: "Personal Information",
      description: "Basic details and address",
      icon: FileText,
    },
    {
      number: 2,
      title: "Document Upload",
      description: "Aadhaar, PAN & Selfie",
      icon: Upload,
    },
    {
      number: 3,
      title: "Payment Setup",
      description: "UPI ID or Bank Account",
      icon: CreditCard,
    },
    {
      number: 4,
      title: "Review & Submit",
      description: "Verify all information",
      icon: CheckCircle,
    },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("KYC submission:", formData)
    // Handle KYC submission
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/*<Header />*/}

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Shield className="h-4 w-4 mr-1" />
            Secure Verification
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your KYC Verification</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify your identity and add payment details to start earning. This is a one-time process that ensures
            secure transactions.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= step.number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name (as per Aadhaar)</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Complete Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House number, street, area"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="PIN Code"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Document Upload */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-sm text-yellow-800">
                        Ensure all documents are clear and readable. Supported formats: JPG, PNG, PDF (max 5MB each)
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                      <Input
                        id="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                        placeholder="XXXX XXXX XXXX"
                        maxLength={14}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Upload Aadhaar Card</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">Front and back side (JPG, PNG, PDF - Max 5MB)</p>
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" multiple />
                      </div>
                    </div>

                    <div>
                      <Label>Upload PAN Card</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">Clear image of PAN card (JPG, PNG, PDF - Max 5MB)</p>
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
                      </div>
                    </div>

                    <div>
                      <Label>Upload Selfie</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Take a clear selfie or upload photo</p>
                        <p className="text-xs text-gray-500">
                          Hold your Aadhaar card next to your face (JPG, PNG - Max 5MB)
                        </p>
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Setup */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label>Choose Payment Method</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card
                        className={`cursor-pointer transition-all ${
                          formData.paymentMethod === "upi" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                        }`}
                        onClick={() => setFormData({ ...formData, paymentMethod: "upi" })}
                      >
                        <CardContent className="p-4 text-center">
                          <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <h3 className="font-semibold">UPI Payment</h3>
                          <p className="text-sm text-gray-600">Instant payments</p>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          formData.paymentMethod === "bank" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                        }`}
                        onClick={() => setFormData({ ...formData, paymentMethod: "bank" })}
                      >
                        <CardContent className="p-4 text-center">
                          <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <h3 className="font-semibold">Bank Account</h3>
                          <p className="text-sm text-gray-600">1-2 business days</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {formData.paymentMethod === "upi" && (
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
                  )}

                  {formData.paymentMethod === "bank" && (
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
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Review Your Information</h3>
                    <p className="text-sm text-blue-800">
                      Please review all the information below. Once submitted, changes will require re-verification.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Personal Information</h4>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        <p>
                          <strong>Name:</strong> {formData.fullName}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> {formData.dateOfBirth}
                        </p>
                        <p>
                          <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} -{" "}
                          {formData.pincode}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">Documents</h4>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        <p>
                          <strong>Aadhaar:</strong> {formData.aadhaarNumber}
                        </p>
                        <p>
                          <strong>PAN:</strong> {formData.panNumber}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">Payment Details</h4>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        {formData.paymentMethod === "upi" ? (
                          <p>
                            <strong>UPI ID:</strong> {formData.upiId}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>Account Holder:</strong> {formData.accountHolderName}
                            </p>
                            <p>
                              <strong>Account Number:</strong> {formData.bankAccountNumber}
                            </p>
                            <p>
                              <strong>IFSC:</strong> {formData.ifscCode}
                            </p>
                            <p>
                              <strong>Bank:</strong> {formData.bankName}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeKYC"
                        checked={formData.agreeKYC}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeKYC: checked as boolean })}
                      />
                      <Label htmlFor="agreeKYC" className="text-sm">
                        I confirm that all the information provided is accurate and true
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeDataUsage"
                        checked={formData.agreeDataUsage}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeDataUsage: checked as boolean })}
                      />
                      <Label htmlFor="agreeDataUsage" className="text-sm">
                        I agree to the processing of my personal data for KYC verification
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!formData.agreeKYC || !formData.agreeDataUsage}
                  >
                    Submit for Verification
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processing Time Info */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verification Timeline</h3>
                  <p className="text-sm text-gray-600">
                    KYC verification typically takes 24-48 hours. You'll receive an email confirmation once approved.
                    After approval, you can immediately start completing tasks and earning money.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
{/*        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Start Contributing to AI Development</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the AI revolution and earn money while helping build smarter technology for the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/register">Join AI Training Program</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Link href="/tasks">Browse AI Tasks</Link>
            </Button>
          </div>
        </div>*/}
      </div>

      {/*<Footer />*/}
    </div>
  )
}
