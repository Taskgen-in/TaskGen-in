"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";

export default function AccountVerifyPage() {
  const router = useRouter();
  // Simulate current status; you should fetch from `/api/user/profile`
  const [status, setStatus] = useState({
    emailVerified: false,
    mobileVerified: false,
    kycCompleted: false,
    paymentSetup: false,
  });

  // Example: handle (re-)send or start verification
  const handleVerify = (field: string) => {
    alert(`Begin verification for: ${field}`);
    // Here, add your real logic (e.g., open OTP modal, start KYC process, redirect, etc.)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Complete Your Account Verification</CardTitle>
          <CardDescription>
            Please finish all steps to unlock full access to TaskGen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Verification */}
          <div className="flex items-center justify-between">
            <span>Email Verified</span>
            {status.emailVerified ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleVerify("email")}
              >
                Verify
              </Button>
            )}
          </div>
          {/* Mobile Verification */}
          <div className="flex items-center justify-between">
            <span>Mobile Verified</span>
            {status.mobileVerified ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleVerify("mobile")}
              >
                Verify
              </Button>
            )}
          </div>
          {/* KYC Completion */}
          <div className="flex items-center justify-between">
            <span>KYC Completed</span>
            {status.kycCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleVerify("kyc")}
              >
                Complete KYC
              </Button>
            )}
          </div>
          {/* Payment Setup */}
          <div className="flex items-center justify-between">
            <span>Payment Setup</span>
            {status.paymentSetup ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleVerify("payment")}
              >
                Setup
              </Button>
            )}
          </div>

          {/* Done Button */}
          <Button
            className="w-full mt-4"
            disabled={!status.emailVerified || !status.mobileVerified || !status.kycCompleted || !status.paymentSetup}
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
