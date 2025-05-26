import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Wallet, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const benefits = [
    { icon: Clock, title: "Flexible Hours", description: "Work anytime, anywhere at your convenience" },
    { icon: Wallet, title: "Fast Payouts", description: "Withdraw earnings instantly to UPI or bank account" },
    { icon: Shield, title: "Zero Joining Fee", description: "Start earning immediately with no upfront costs" },
    { icon: Star, title: "Verified Tasks", description: "All tasks are verified and legitimate" },
  ]

  const steps = [
    {
      step: "01",
      title: "Register & Verify",
      description: "Sign up and verify your UPI or Bank Account for secure payments",
    },
    {
      step: "02",
      title: "Browse Tasks",
      description: "Choose from surveys, data entry, image labeling, and content review tasks",
    },
    {
      step: "03",
      title: "Submit & Earn",
      description: "Complete tasks and earn money directly to your wallet balance",
    },
    {
      step: "04",
      title: "Withdraw Earnings",
      description: "Cash out your earnings with free or premium withdrawal options",
    },
  ]

  const taskTypes = [
    { name: "Survey Completion", payout: "₹15-50", time: "5-15 min" },
    { name: "Data Entry", payout: "₹20-80", time: "10-30 min" },
    { name: "Image Labeling", payout: "₹5-25", time: "2-8 min" },
    { name: "Content Review", payout: "₹30-100", time: "15-45 min" },
    { name: "Product Research", payout: "₹40-120", time: "20-60 min" },
    { name: "Translation Tasks", payout: "₹60-200", time: "30-90 min" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">🇮🇳 Made for India</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Earn from Home with <span className="text-blue-600">Simple Tasks</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Indians earning extra income through verified micro-tasks. No experience required,
            flexible hours, instant payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <Link href="/register">Register Now - It's Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/tasks">Browse Tasks</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>50,000+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>₹2.5Cr+ Paid Out</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TaskGen?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've designed the perfect platform for Indians to earn money from home with complete flexibility and
            security.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start earning in just 4 simple steps. No complex procedures, no hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Task Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Task Types</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from a variety of tasks that match your skills and available time.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskTypes.map((task, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.name}</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {task.payout}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{task.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Link href="/register">Start Earning Today</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join TaskGen today and start your work-from-home journey with India's most trusted micro-task platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              <Link href="/pricing">View Premium Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
