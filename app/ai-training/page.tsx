import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Brain,
  ImageIcon,
  MessageSquare,
  FileText,
  Mic,
  Eye,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Users,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function AITrainingPage() {
  const aiTaskTypes = [
    {
      icon: ImageIcon,
      title: "Image Labeling & Annotation",
      description: "Help train AI models by labeling objects, people, and scenes in images",
      examples: [
        "Identify cars, pedestrians, and traffic signs in street photos",
        "Label products in e-commerce images",
        "Annotate medical images for healthcare AI",
        "Tag emotions and expressions in facial photos",
      ],
      earnings: "₹5-25 per image",
      difficulty: "Easy",
      timeRequired: "2-8 minutes",
      skills: ["Good eyesight", "Attention to detail", "Basic computer skills"],
    },
    {
      icon: MessageSquare,
      title: "Text & Language Processing",
      description: "Improve AI language understanding through text analysis and correction",
      examples: [
        "Correct grammar and spelling in AI-generated text",
        "Rate the quality of chatbot responses",
        "Classify text sentiment (positive/negative/neutral)",
        "Translate text between Indian languages",
      ],
      earnings: "₹10-40 per task",
      difficulty: "Easy to Medium",
      timeRequired: "5-20 minutes",
      skills: ["Good language skills", "Reading comprehension", "Cultural awareness"],
    },
    {
      icon: Mic,
      title: "Audio & Speech Recognition",
      description: "Help AI systems better understand human speech and audio",
      examples: [
        "Transcribe audio recordings to text",
        "Verify accuracy of AI speech-to-text",
        "Record voice samples in regional languages",
        "Identify speakers and emotions in audio clips",
      ],
      earnings: "₹15-50 per task",
      difficulty: "Medium",
      timeRequired: "10-30 minutes",
      skills: ["Good hearing", "Language fluency", "Typing skills"],
    },
    {
      icon: Eye,
      title: "Computer Vision Training",
      description: "Train AI to see and understand visual content like humans do",
      examples: [
        "Draw bounding boxes around objects in videos",
        "Identify defects in manufacturing images",
        "Classify document types and layouts",
        "Verify AI-generated image descriptions",
      ],
      earnings: "₹20-60 per task",
      difficulty: "Medium",
      timeRequired: "15-45 minutes",
      skills: ["Visual perception", "Precision", "Pattern recognition"],
    },
    {
      icon: Brain,
      title: "AI Model Evaluation",
      description: "Test and evaluate AI model performance across different scenarios",
      examples: [
        "Rate AI chatbot conversation quality",
        "Test AI recommendation accuracy",
        "Evaluate AI-generated content for bias",
        "Compare different AI model outputs",
      ],
      earnings: "₹30-100 per evaluation",
      difficulty: "Medium to Hard",
      timeRequired: "20-60 minutes",
      skills: ["Critical thinking", "Domain knowledge", "Analytical skills"],
    },
    {
      icon: FileText,
      title: "Data Collection & Curation",
      description: "Gather and organize high-quality training data for AI systems",
      examples: [
        "Collect images of Indian street scenes",
        "Gather text samples in regional languages",
        "Document cultural practices and traditions",
        "Create datasets for specific industries",
      ],
      earnings: "₹25-80 per dataset",
      difficulty: "Easy to Medium",
      timeRequired: "30-90 minutes",
      skills: ["Research skills", "Cultural knowledge", "Organization"],
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Growing Industry",
      description: "AI is the fastest-growing tech sector with increasing demand for human input",
    },
    {
      icon: Shield,
      title: "Secure & Ethical",
      description: "All AI training tasks follow strict ethical guidelines and data protection",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work on AI training tasks anytime that fits your schedule",
    },
    {
      icon: Star,
      title: "Skill Development",
      description: "Learn about AI technology while earning money from home",
    },
  ]

  const process = [
    {
      step: 1,
      title: "Choose AI Task",
      description: "Browse available AI training tasks based on your interests and skills",
    },
    {
      step: 2,
      title: "Complete Training",
      description: "Watch tutorial videos and complete practice tasks to understand requirements",
    },
    {
      step: 3,
      title: "Start Working",
      description: "Begin with simple tasks and gradually move to more complex AI training work",
    },
    {
      step: 4,
      title: "Quality Review",
      description: "Your work is reviewed for accuracy before payment is processed",
    },
  ]

  const stats = [
    { number: "50,000+", label: "AI Tasks Completed", icon: Target },
    { number: "₹25L+", label: "Paid to Contributors", icon: TrendingUp },
    { number: "500+", label: "Active AI Projects", icon: Brain },
    { number: "95%", label: "Task Approval Rate", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            <Brain className="h-4 w-4 mr-1" />
            AI Training Tasks
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Train the Future of AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contribute to cutting-edge AI development while earning money from home. Your work helps make AI smarter,
            more accurate, and more useful for everyone.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Task Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Types of AI Training Tasks</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore different ways you can contribute to AI development. Each task type offers unique learning
            opportunities and earning potential.
          </p>

          <div className="space-y-8">
            {aiTaskTypes.map((task, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Task Icon and Info */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-purple-50 to-blue-50 p-8">
                      <task.icon className="h-16 w-16 text-purple-600 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{task.title}</h3>
                      <p className="text-gray-600 mb-6">{task.description}</p>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Earnings:</span>
                          <Badge className="bg-green-100 text-green-800">{task.earnings}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Difficulty:</span>
                          <Badge variant="outline">{task.difficulty}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Time:</span>
                          <span className="text-sm font-medium">{task.timeRequired}</span>
                        </div>
                      </div>
                    </div>

                    {/* Task Details */}
                    <div className="lg:w-2/3 p-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Example Tasks:</h4>
                      <div className="grid md:grid-cols-2 gap-3 mb-6">
                        {task.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{example}</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {task.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How AI Training Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose AI Training Tasks?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Getting Started Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  Basic Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Age 18+ with valid ID proof</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Basic computer and internet skills</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Good attention to detail</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                    <span>Reliable internet connection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-6 w-6 text-orange-600 mr-2" />
                  Preferred Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-orange-600 mr-3" />
                    <span>Knowledge of multiple Indian languages</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-orange-600 mr-3" />
                    <span>Experience with technology or AI</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-orange-600 mr-3" />
                    <span>Domain expertise (medical, legal, etc.)</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-orange-600 mr-3" />
                    <span>Strong analytical thinking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-12">
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
        </div>
      </div>

      <Footer />
    </div>
  )
}
