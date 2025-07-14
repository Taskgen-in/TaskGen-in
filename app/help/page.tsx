import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle, Mail, MessageCircle, Phone, Clock } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <HelpCircle className="h-4 w-4 mr-1" />
            Help Center
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Need assistance? Find support resources, contact options, and quick answers below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Help Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/faq" className="block text-blue-600 hover:underline text-lg font-medium">
                Browse FAQ
              </Link>
              <Link href="/contact" className="block text-blue-600 hover:underline text-lg font-medium">
                Contact Support
              </Link>
              <Link href="/dashboard" className="block text-blue-600 hover:underline text-lg font-medium">
                Go to Dashboard
              </Link>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-medium">support@taskgen.in</span>
                <span className="text-gray-500 text-sm">(Email Support)</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">+91 9344759416</span>
                <span className="text-gray-500 text-sm">(WhatsApp Support)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="font-medium">+91 9344759416</span>
                <span className="text-gray-500 text-sm">(Phone Support)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Mon-Fri: 9am-6pm, Sat: 10am-4pm</span>
                <span className="text-gray-500 text-sm">(Support Hours)</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Emergency support available 24/7 for Premium users.</p>
            </CardContent>
          </Card>
        </div>

        {/* Still need help? */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-4">Our support team is here for you. Reach out anytime and we'll respond as soon as possible.</p>
          <Link href="/contact">
            <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Contact Support</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
} 