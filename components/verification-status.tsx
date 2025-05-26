"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function VerificationStatus() {
  const [steps, setSteps] = useState([
    { id: "email", title: "Email Verification", description: "Verify your email address to receive important updates", status: "pending", link: "/verify-email" },
    { id: "mobile", title: "Mobile Verification", description: "Verify your mobile number for SMS notifications", status: "pending", link: "/verify-mobile" },
    { id: "kyc", title: "KYC Verification", description: "Complete identity verification with documents", status: "pending", link: "/kyc-verification" },
    { id: "payment", title: "Payment Setup", description: "Configure your payment method to receive earnings", status: "pending", link: "/payment-setup" }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      setLoading(true);
      const res = await fetch("/api/user/profile", { credentials: "include" });
      if (!res.ok) return; // handle 401 etc.
      const data = await res.json();

      setSteps([
        {
          id: "email",
          title: "Email Verification",
          description: "Verify your email address to receive important updates",
          status: data.emailVerified ? "completed" : "required",
          link: "/verify-email",
        },
        {
          id: "mobile",
          title: "Mobile Verification",
          description: "Verify your mobile number for SMS notifications",
          status: data.mobileVerified
            ? "completed"
            : data.emailVerified
            ? "required"
            : "pending",
          link: "/verify-mobile",
        },
        {
          id: "kyc",
          title: "KYC Verification",
          description: "Complete identity verification with documents",
          status: data.kycCompleted
            ? "completed"
            : data.emailVerified && data.mobileVerified
            ? "required"
            : "pending",
          link: "/kyc-verification",
        },
        {
          id: "payment",
          title: "Payment Setup",
          description: "Configure your payment method to receive earnings",
          status: data.paymentSetup
            ? "completed"
            : data.kycCompleted
            ? "required"
            : "pending",
          link: "/payment-setup",
        },
      ]);
      setLoading(false);
    }
    fetchStatus();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "required":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "required":
        return <Badge className="bg-red-100 text-red-800">Required</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-600">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600">Pending</Badge>;
    }
  };

  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const totalSteps = steps.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Account Verification</span>
          <Badge variant="outline">
            {completedSteps}/{totalSteps} Complete
          </Badge>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(step.status)}
                {step.status === "required" && (
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Link href={step.link}>
                      Start
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        {completedSteps === totalSteps && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800">All Verifications Complete!</h3>
            <p className="text-sm text-green-700">
              You can now access all platform features and start earning from tasks.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
