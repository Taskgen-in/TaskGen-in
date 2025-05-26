import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle, Shield, Wallet, Users, Clock } from "lucide-react"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: Users,
      color: "bg-blue-100 text-blue-800",
      faqs: [
        {
          question: "How do I create an account on TaskGen?",
          answer:
            "Simply click 'Register' and fill in your basic details - name, email, mobile number, and create a password. It takes less than 2 minutes!",
        },
        {
          question: "Is TaskGen really free to join?",
          answer:
            "Yes! Creating an account is completely free. You can start earning immediately after verification without any joining fees.",
        },
        {
          question: "What documents do I need to get started?",
          answer:
            "For KYC verification, you need: Aadhaar card, PAN card, a clear selfie, and either a UPI ID or bank account details for payments. All documents should be clear and readable.",
        },
        {
          question: "Why do I need to complete KYC?",
          answer:
            "KYC (Know Your Customer) verification is mandatory for secure payments and compliance with Indian regulations. It includes identity verification and payment setup in one process.",
        },
        {
          question: "How long does KYC verification take?",
          answer:
            "KYC verification typically takes 24-48 hours. Once approved, you can immediately start completing tasks and withdrawing earnings to your verified payment method.",
        },
        {
          question: "How quickly can I start earning?",
          answer:
            "Once your email and mobile are verified (usually within minutes), you can immediately start browsing and completing tasks.",
        },
      ],
    },
    {
      title: "Tasks & Earnings",
      icon: Wallet,
      color: "bg-green-100 text-green-800",
      faqs: [
        {
          question: "What types of tasks are available?",
          answer:
            "We offer surveys, data entry, image labeling, content review, product research, and translation tasks. New task types are added regularly.",
        },
        {
          question: "How much can I earn per task?",
          answer:
            "Earnings vary by task type: Surveys (₹15-50), Data Entry (₹20-80), Image Labeling (₹5-25), Content Review (₹30-100), and more.",
        },
        {
          question: "How many tasks can I complete per day?",
          answer:
            "There's no daily limit! You can complete as many tasks as available. Premium users get access to more high-paying tasks.",
        },
        {
          question: "What if I make a mistake in a task?",
          answer:
            "Don't worry! Most tasks have clear instructions and examples. If a task is rejected, we provide feedback so you can improve.",
        },
      ],
    },
    {
      title: "Payments & Withdrawals",
      icon: Wallet,
      color: "bg-orange-100 text-orange-800",
      faqs: [
        {
          question: "How do I withdraw my earnings?",
          answer:
            "Go to your dashboard, click 'Withdraw Earnings', enter the amount, and choose UPI or bank transfer. Payments are processed within 24 hours.",
        },
        {
          question: "What are the withdrawal limits?",
          answer:
            "Free users can withdraw up to ₹500 per month. Premium users have unlimited withdrawals. Minimum withdrawal is ₹100.",
        },
        {
          question: "Are there any withdrawal fees?",
          answer:
            "No! All withdrawals are completely free for both Free and Premium users. We don't charge any processing fees.",
        },
        {
          question: "How long does it take to receive payments?",
          answer:
            "UPI payments are instant. Bank transfers take 1-2 business days. All payments are processed within 24 hours of request.",
        },
      ],
    },
    {
      title: "Account & Security",
      icon: Shield,
      color: "bg-purple-100 text-purple-800",
      faqs: [
        {
          question: "Is my personal information safe?",
          answer:
            "We use bank-grade encryption and never share your personal information with third parties. Your data is completely secure.",
        },
        {
          question: "Why do I need to verify my UPI/bank account?",
          answer:
            "Verification ensures secure payments and prevents fraud. It's a one-time process required before your first withdrawal.",
        },
        {
          question: "Can I change my UPI ID or bank account later?",
          answer:
            "Yes, you can update your payment details anytime from your account settings. Re-verification may be required for security.",
        },
        {
          question: "What if I forget my password?",
          answer:
            "Click 'Forgot Password' on the login page. We'll send a reset link to your registered email address.",
        },
      ],
    },
    {
      title: "Premium Account",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
      faqs: [
        {
          question: "What are the benefits of Premium account?",
          answer:
            "Premium users get unlimited withdrawals, access to higher-paying tasks, priority support, and advanced analytics for ₹199/year.",
        },
        {
          question: "How much more can I earn with Premium?",
          answer:
            "Premium users typically earn 3-5x more due to access to exclusive high-paying tasks and no withdrawal limits.",
        },
        {
          question: "Can I cancel my Premium subscription?",
          answer:
            "Premium is a one-time annual payment, not a subscription. If you don't renew, your account automatically becomes Free after one year.",
        },
        {
          question: "Do I get a refund if I'm not satisfied?",
          answer:
            "We offer a 30-day money-back guarantee for Premium accounts. Contact support if you're not completely satisfied.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <HelpCircle className="h-4 w-4 mr-1" />
            Help Center
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about TaskGen, earnings, payments, and account management
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="grid gap-4">
                {category.faqs.map((faq, faqIndex) => (
                  <Card key={faqIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="p-4">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-2">Get help via email</p>
                <p className="text-blue-600 font-medium">support@taskgen.in</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-center">
                <h3 className="font-semibold mb-2">WhatsApp Support</h3>
                <p className="text-sm text-gray-600 mb-2">Chat with us instantly</p>
                <p className="text-green-600 font-medium">+91 98765 43210</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
