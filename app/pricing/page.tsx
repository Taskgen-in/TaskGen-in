import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, X, Star, Zap } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free Account",
      price: "₹0",
      period: "Forever",
      description: "Perfect for getting started with TaskGen",
      features: [
        { text: "Access to basic tasks", included: true },
        { text: "₹500 monthly withdrawal limit", included: true },
        { text: "Standard task priority", included: true },
        { text: "Email support", included: true },
        { text: "Premium task access", included: false },
        { text: "Unlimited withdrawals", included: false },
        { text: "Priority support", included: false },
        { text: "Advanced analytics", included: false },
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Premium Account",
      price: "₹199",
      period: "Per Year",
      description: "Unlock your full earning potential",
      features: [
        { text: "Access to ALL tasks", included: true },
        { text: "Unlimited withdrawals", included: true },
        { text: "Premium task priority", included: true },
        { text: "Priority WhatsApp support", included: true },
        { text: "Higher paying tasks", included: true },
        { text: "Advanced dashboard analytics", included: true },
        { text: "Early access to new features", included: true },
        { text: "Dedicated account manager", included: true },
      ],
      cta: "Upgrade to Premium",
      popular: true,
    },
  ]

  const faqs = [
    {
      question: "Can I upgrade from Free to Premium anytime?",
      answer: "Yes! You can upgrade to Premium at any time. Your Premium benefits will be activated immediately.",
    },
    {
      question: "What happens if I don't renew my Premium account?",
      answer:
        "Your account will automatically switch to the Free plan. You'll keep all your earnings but lose Premium benefits.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "No hidden charges! The Premium plan is a one-time annual fee of ₹199. Free users pay no fees.",
    },
    {
      question: "How much more can I earn with Premium?",
      answer: "Premium users typically earn 3-5x more due to access to higher-paying tasks and unlimited withdrawals.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Choose Your Plan</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you're ready to unlock your full earning potential
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-orange-500 shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-600 text-white px-4 py-1">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 mr-3" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-3" />
                      )}
                      <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${plan.popular ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"}`}
                  size="lg"
                >
                  <Link href={plan.popular ? "/upgrade" : "/register"}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Upgrade to Premium?</h2>
            <p className="text-gray-600">Premium users earn significantly more with these exclusive benefits</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Higher Earnings</h3>
              <p className="text-gray-600">Access to premium tasks that pay 2-3x more than basic tasks</p>
            </div>

            <div className="text-center">
              <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Limits</h3>
              <p className="text-gray-600">Unlimited withdrawals with no monthly caps or restrictions</p>
            </div>

            <div className="text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-600">Get priority customer support via WhatsApp and email</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-600 mb-8">Join thousands of Indians already earning from home with TaskGen</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/register">Start Free Account</Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/upgrade">Upgrade to Premium</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
