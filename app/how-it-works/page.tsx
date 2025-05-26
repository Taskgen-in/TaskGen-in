import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  UserPlus,
  Shield,
  Search,
  Play,
  CheckCircle,
  Wallet,
  Clock,
  Star,
  ArrowRight,
  Smartphone,
  CreditCard,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: "Sign Up & Email Verification",
      description: "Create your free account and verify your email",
      details: [
        "Enter your name, email, and mobile number",
        "Verify your email address via confirmation link",
        "Verify your mobile number with OTP",
        "Set up your secure password",
      ],
      timeRequired: "2-3 minutes",
      color: "bg-blue-500",
    },
    {
      step: 2,
      icon: Shield,
      title: "Complete KYC Verification",
      description: "Complete your KYC with documents and payment details",
      details: [
        "Upload Aadhaar card and PAN card for identity verification",
        "Add your UPI ID or bank account details for payments",
        "Take a selfie for identity confirmation",
        "Wait for verification (usually 24-48 hours)",
      ],
      timeRequired: "1-2 days",
      color: "bg-green-500",
    },
    {
      step: 3,
      icon: Search,
      title: "Browse Available Tasks",
      description: "Explore tasks that match your skills and interests",
      details: [
        "Filter tasks by category, payout, and difficulty",
        "Read task descriptions and requirements carefully",
        "Check estimated completion time",
        "Choose tasks that fit your schedule",
      ],
      timeRequired: "5-10 minutes",
      color: "bg-orange-500",
    },
    {
      step: 4,
      icon: Play,
      title: "Complete Tasks",
      description: "Follow instructions and submit your work",
      details: [
        "Read task instructions thoroughly",
        "Complete the task following guidelines",
        "Submit your work before the deadline",
        "Wait for review and approval",
      ],
      timeRequired: "Varies by task",
      color: "bg-purple-500",
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Get Paid",
      description: "Earn money for approved tasks",
      details: [
        "Receive payment once task is approved",
        "Money is added to your TaskGen wallet",
        "Track your earnings in the dashboard",
        "Build your reputation with quality work",
      ],
      timeRequired: "24-48 hours",
      color: "bg-pink-500",
    },
    {
      step: 6,
      icon: Wallet,
      title: "Withdraw Earnings",
      description: "Cash out your earnings to your verified account",
      details: [
        "Request withdrawal from your dashboard",
        "Money sent to your KYC-verified UPI/bank account",
        "Minimum withdrawal amount is ₹100",
        "Receive money within 24 hours",
      ],
      timeRequired: "Instant to 24 hours",
      color: "bg-indigo-500",
    },
  ]

  const taskTypes = [
    {
      icon: Star,
      title: "Survey Completion",
      description: "Share your opinions on products, services, and market research",
      earnings: "₹15-50 per survey",
      time: "5-15 minutes",
      difficulty: "Easy",
      requirements: ["Basic reading skills", "Honest opinions", "Attention to detail"],
    },
    {
      icon: Smartphone,
      title: "Data Entry",
      description: "Input data from images, documents, or websites into forms",
      earnings: "₹20-80 per task",
      time: "10-30 minutes",
      difficulty: "Easy",
      requirements: ["Good typing skills", "Accuracy", "Basic computer knowledge"],
    },
    {
      icon: Award,
      title: "Content Review",
      description: "Review and moderate user-generated content for quality",
      earnings: "₹30-100 per task",
      time: "15-45 minutes",
      difficulty: "Medium",
      requirements: ["Good judgment", "Language skills", "Policy understanding"],
    },
  ]

  const tips = [
    {
      title: "Start Small",
      description: "Begin with easier tasks to build your reputation and understand the platform",
    },
    {
      title: "Read Instructions Carefully",
      description: "Always read task instructions completely before starting to avoid rejections",
    },
    {
      title: "Maintain Quality",
      description: "Focus on quality over quantity to build a good rating and access better tasks",
    },
    {
      title: "Be Consistent",
      description: "Regular participation helps you earn more and get access to premium tasks",
    },
    {
      title: "Track Your Progress",
      description: "Monitor your earnings and performance through the dashboard analytics",
    },
    {
      title: "Upgrade When Ready",
      description: "Consider Premium membership once you're earning consistently",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Clock className="h-4 w-4 mr-1" />
            Step by Step Guide
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How TaskGen Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to start earning money from home with our simple 6-step process. From registration to withdrawal,
            we'll guide you through everything.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Your Journey to Earning</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Step Number and Icon */}
                    <div className="lg:w-1/4 bg-gray-50 p-8 flex flex-col items-center justify-center">
                      <div
                        className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4`}
                      >
                        {step.step}
                      </div>
                      <step.icon className="h-12 w-12 text-gray-600 mb-4" />
                      <Badge variant="secondary" className="text-xs">
                        {step.timeRequired}
                      </Badge>
                    </div>

                    {/* Step Content */}
                    <div className="lg:w-3/4 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{step.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {index < steps.length - 1 && (
                        <div className="flex justify-end mt-6">
                          <ArrowRight className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Task Types Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Types of Tasks Available</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore different types of tasks you can complete to earn money. Each task type has different requirements
            and earning potential.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {taskTypes.map((task, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <task.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{task.title}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Earnings:</span>
                      <Badge className="bg-green-100 text-green-800">{task.earnings}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time:</span>
                      <span className="text-sm font-medium">{task.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Difficulty:</span>
                      <Badge variant="outline">{task.difficulty}</Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {task.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-xs text-gray-600 flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Tips Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Tips for Success</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Follow these proven strategies to maximize your earnings and build a successful profile on TaskGen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Payment Methods</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-6 w-6 text-blue-600 mr-2" />
                  UPI Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Instant payments</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">No processing fees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Available 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Minimum ₹100 withdrawal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                  Bank Transfer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">1-2 business days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">No processing fees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Secure NEFT/IMPS</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Minimum ₹100 withdrawal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indians already earning from home with TaskGen's simple and secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/tasks">Browse Available Tasks</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
