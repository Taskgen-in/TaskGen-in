"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star, Award, TrendingUp, Users, Clock, CheckCircle, Gift, Crown, Zap, Target,
  DollarSign, Calendar, ArrowRight, Play, Trophy, Shield, Sparkles
} from "lucide-react"

interface WelcomeFlowProps {
  onComplete: () => void
}

export function WelcomeFlow({ onComplete }: WelcomeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to TaskGen! 🎉",
      description: "You're about to start your earning journey. Let's show you what's possible!",
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Earning Today!</h2>
            <p className="text-gray-600">Complete your first task and unlock your earning potential</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Quick Start</h3>
                <p className="text-sm text-gray-600">Complete your first task in 10 minutes</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Instant Earnings</h3>
                <p className="text-sm text-gray-600">Get paid immediately after completion</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold">Level Up</h3>
                <p className="text-sm text-gray-600">Unlock higher-paying tasks</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Earnings Potential 💰",
      description: "See how much you can earn with different membership levels",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  Free Member
                </CardTitle>
                <CardDescription>Basic access to tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-gray-900">₹50-200</div>
                <p className="text-sm text-gray-600">Per task</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Access to basic tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    ₹500 monthly withdrawal limit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Standard support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  Gold Member
                  <Badge className="bg-yellow-100 text-yellow-800">Popular</Badge>
                </CardTitle>
                <CardDescription>Premium access with higher earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-yellow-600">₹150-500</div>
                <p className="text-sm text-gray-600">Per task (3x more!)</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Access to premium tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Unlimited withdrawals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Early access to new tasks
                  </li>
                </ul>
                <div className="pt-2">
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    ₹199/year
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Pro Tip</h4>
                <p className="text-sm text-blue-700">
                  Gold members typically earn 3-5x more than free users due to access to higher-paying tasks and unlimited withdrawals.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Task Categories 📋",
      description: "Explore different types of tasks you can complete",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  Surveys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Share your opinions and earn rewards</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earnings:</span>
                  <span className="font-semibold text-green-600">₹30-80</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">10-25 min</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                  AI Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Help train AI models with data labeling</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earnings:</span>
                  <span className="font-semibold text-green-600">₹50-150</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">15-30 min</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Content Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Moderate content for safety and quality</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earnings:</span>
                  <span className="font-semibold text-green-600">₹60-200</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">20-40 min</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-green-600" />
                  Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Translate content between languages</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earnings:</span>
                  <span className="font-semibold text-green-600">₹80-300</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">25-60 min</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Voice Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Record voice samples for AI training</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earnings:</span>
                  <span className="font-semibold text-green-600">₹40-120</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">10-20 min</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Premium Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Exclusive high-paying tasks for Gold members</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earnings:</span>
                  <span className="font-semibold text-green-600">₹150-500</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold">30-90 min</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-2">
                  Gold Only
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Start? 🚀",
      description: "Choose your path and begin earning",
      icon: Play,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
            <p className="text-gray-600">Start with a free task or upgrade to Gold for maximum earnings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-green-600" />
                  Start Free
                </CardTitle>
                <CardDescription>Begin with available tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No upfront cost
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Immediate access to tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Earn ₹50-200 per task
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={onComplete}
                >
                  Start Earning Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  Upgrade to Gold
                </CardTitle>
                <CardDescription>Unlock premium features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Earn 3-5x more per task
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Unlimited withdrawals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Priority support
                  </li>
                </ul>
                <Button 
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => window.location.href = '/upgrade'}
                >
                  Upgrade Now - ₹199/year
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Success Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1 mt-2">
                  <li>• Complete tasks accurately to maintain high ratings</li>
                  <li>• Check for new tasks daily for best opportunities</li>
                  <li>• Upgrade to Gold for maximum earning potential</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepIcon = steps[currentStep].icon

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <CurrentStepIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{steps[currentStep].title}</h1>
                <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {/* Content */}
          <div className="mb-6">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 