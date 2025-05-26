"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Search,
  Filter,
  Clock,
  Star,
  TrendingUp,
  Users,
  Brain,
  ImageIcon,
  MessageSquare,
  FileText,
  Mic,
  Eye,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("payout")

  const taskCategories = [
    { value: "all", label: "All Categories" },
    { value: "survey", label: "Surveys" },
    { value: "data-entry", label: "Data Entry" },
    { value: "ai-training", label: "AI Training" },
    { value: "content-review", label: "Content Review" },
    { value: "translation", label: "Translation" },
    { value: "research", label: "Research" },
  ]

  const tasks = [
    {
      id: 1,
      title: "Product Review Survey - Electronics",
      description: "Share your opinions about electronic products and shopping preferences",
      category: "survey",
      payout: 35,
      timeEstimate: "12-15 min",
      difficulty: "Easy",
      icon: MessageSquare,
      requirements: ["Age 18-45", "Online shopping experience"],
      tasksAvailable: 150,
      completionRate: 94,
      featured: true,
    },
    {
      id: 2,
      title: "Image Labeling for AI Training",
      description: "Label objects and scenes in street photography for autonomous vehicle AI",
      category: "ai-training",
      payout: 20,
      timeEstimate: "5-8 min",
      difficulty: "Easy",
      icon: ImageIcon,
      requirements: ["Good eyesight", "Attention to detail"],
      tasksAvailable: 500,
      completionRate: 96,
      featured: false,
    },
    {
      id: 3,
      title: "Content Moderation - Social Media",
      description: "Review user-generated content for policy compliance and safety",
      category: "content-review",
      payout: 45,
      timeEstimate: "15-20 min",
      difficulty: "Medium",
      icon: Eye,
      requirements: ["Good judgment", "Policy understanding"],
      tasksAvailable: 75,
      completionRate: 89,
      featured: false,
    },
    {
      id: 4,
      title: "Hindi to English Translation",
      description: "Translate short marketing content from Hindi to English",
      category: "translation",
      payout: 60,
      timeEstimate: "20-30 min",
      difficulty: "Medium",
      icon: FileText,
      requirements: ["Fluent in Hindi & English", "Cultural awareness"],
      tasksAvailable: 25,
      completionRate: 92,
      featured: true,
    },
    {
      id: 5,
      title: "Audio Transcription - Customer Calls",
      description: "Convert customer service audio recordings to accurate text",
      category: "data-entry",
      payout: 40,
      timeEstimate: "25-35 min",
      difficulty: "Medium",
      icon: Mic,
      requirements: ["Good hearing", "Fast typing", "English fluency"],
      tasksAvailable: 100,
      completionRate: 91,
      featured: false,
    },
    {
      id: 6,
      title: "Market Research Survey - Food Delivery",
      description: "Answer questions about food delivery app usage and preferences",
      category: "survey",
      payout: 25,
      timeEstimate: "8-12 min",
      difficulty: "Easy",
      icon: MessageSquare,
      requirements: ["Food delivery app user", "Age 18-35"],
      tasksAvailable: 200,
      completionRate: 95,
      featured: false,
    },
    {
      id: 7,
      title: "AI Chatbot Response Evaluation",
      description: "Rate the quality and helpfulness of AI chatbot responses",
      category: "ai-training",
      payout: 50,
      timeEstimate: "18-25 min",
      difficulty: "Medium",
      icon: Brain,
      requirements: ["Critical thinking", "Communication skills"],
      tasksAvailable: 80,
      completionRate: 88,
      featured: true,
    },
    {
      id: 8,
      title: "E-commerce Product Data Entry",
      description: "Enter product details from images into structured database format",
      category: "data-entry",
      payout: 30,
      timeEstimate: "10-15 min",
      difficulty: "Easy",
      icon: FileText,
      requirements: ["Attention to detail", "Basic computer skills"],
      tasksAvailable: 300,
      completionRate: 93,
      featured: false,
    },
  ]

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
      const matchesDifficulty = difficultyFilter === "all" || task.difficulty.toLowerCase() === difficultyFilter

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      if (sortBy === "payout") return b.payout - a.payout
      if (sortBy === "time") return Number.parseInt(a.timeEstimate) - Number.parseInt(b.timeEstimate)
      if (sortBy === "difficulty") {
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      }
      return 0
    })

  const stats = [
    { icon: Users, label: "Active Tasks", value: "1,200+" },
    { icon: TrendingUp, label: "Avg. Hourly Rate", value: "₹180" },
    { icon: CheckCircle, label: "Success Rate", value: "94%" },
    { icon: Clock, label: "Avg. Task Time", value: "15 min" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Available Tasks</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from hundreds of verified tasks and start earning money from home today
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter & Search Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {taskCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payout">Highest Payout</SelectItem>
                  <SelectItem value="time">Shortest Time</SelectItem>
                  <SelectItem value="difficulty">Easiest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{filteredTasks.length} Tasks Available</h2>
            <Badge variant="secondary" className="text-sm">
              Updated 5 minutes ago
            </Badge>
          </div>

          <div className="grid gap-6">
            {filteredTasks.map((task) => (
              <Card
                key={task.id}
                className={`hover:shadow-lg transition-shadow ${task.featured ? "ring-2 ring-blue-200 bg-blue-50/30" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <task.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                            {task.featured && <Badge className="bg-orange-100 text-orange-800 text-xs">Featured</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="capitalize">{task.category.replace("-", " ")}</span>
                            <span>•</span>
                            <span>{task.tasksAvailable} available</span>
                            <span>•</span>
                            <span>{task.completionRate}% success rate</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{task.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{task.timeEstimate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-gray-400" />
                          <span>{task.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{task.tasksAvailable} tasks</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">₹{task.payout}</div>
                      <div className="text-sm text-gray-500 mb-4">per task</div>
                      <Button className="bg-blue-600 hover:bg-blue-700 mb-2 w-full">Start Task</Button>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">Create your free account and start completing tasks within minutes</p>
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
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
