"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Wallet, TrendingUp, Clock, Filter, Search, Star, CheckCircle, Download, Eye, Calendar,
  Award, Target, Users, Gift, LogOut, User, Settings, Bell, Menu, DollarSign, XCircle
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { VerificationStatus } from "@/components/verification-status"
import { TaskDetailModal } from "@/components/task-detail-modal"


function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  // Always returns YYYY-MM-DD (ISO, no locale difference)
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

export default function UserDashboard() {
  const router = useRouter()
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [accountStatus, setAccountStatus] = useState({
    emailVerified: false,
    mobileVerified: false,
    kycCompleted: false,
    paymentSetup: false,
  })

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);

  // Fetch account status using token after component mounts
  useEffect(() => {
    fetch("/api/user/profile", { credentials: "include" })
      .then(res => {
        if (res.status === 401) {
          router.push("/login");
        }
        return res.json();
      })
      .then(setAccountStatus)
      .catch(() => {});
  }, [router]);

  
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("userRole")
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  }

  const userStats = {
    totalEarned: 12450,
    thisMonth: 3200,
    withdrawn: 9800,
    pending: 650,
    available: 2000,
    tasksCompleted: 156,
    successRate: 94,
    currentStreak: 12,
    level: "Gold",
    nextLevelProgress: 75,
  }

  const allComplete =
    accountStatus.emailVerified &&
    accountStatus.mobileVerified &&
    accountStatus.kycCompleted &&
    accountStatus.paymentSetup;



  const tasks = [
    {
      id: 1,
      title: "E-commerce Product Review Survey",
      description: "Review and rate products based on given criteria. Requires attention to detail.",
      payout: 45,
      timeEstimate: "15-20 min",
      difficulty: "Easy",
      category: "Survey",
      status: "available",
      deadline: "2024-01-20",
      slots: 25,
      completed: 8,
      maxParticipants: 25,
      currentParticipants: 8,
      timeLimit: 3, // hours
      createdAt: "2024-01-17T10:00:00Z",
      expiresAt: "2024-01-20T18:00:00Z",
      isParticipating: false,
      participatedAt: null,
    },
    {
      id: 2,
      title: "AI Training - Image Object Detection",
      description: "Label objects in images for machine learning training. High accuracy required.",
      payout: 35,
      timeEstimate: "8-12 min",
      difficulty: "Medium",
      category: "AI Training",
      status: "available",
      deadline: "2024-01-18",
      slots: 50,
      completed: 32,
      maxParticipants: 50,
      currentParticipants: 32,
      timeLimit: 2, // hours
      createdAt: "2024-01-16T14:00:00Z",
      expiresAt: "2024-01-18T20:00:00Z",
      isParticipating: false,
      participatedAt: null,
    },
    {
      id: 3,
      title: "Content Moderation - Social Media Posts",
      description: "Review user-generated content for policy compliance and safety.",
      payout: 60,
      timeEstimate: "20-25 min",
      difficulty: "Medium",
      category: "Content Review",
      status: "in_progress",
      deadline: "2024-01-17",
      slots: 15,
      completed: 12,
      maxParticipants: 15,
      currentParticipants: 13,
      timeLimit: 4, // hours
      createdAt: "2024-01-15T09:00:00Z",
      expiresAt: "2024-01-17T23:59:59Z",
      isParticipating: true,
      participatedAt: "2024-01-16T15:30:00Z",
    },
    {
      id: 4,
      title: "Hindi to English Translation",
      description: "Translate marketing content from Hindi to English with cultural context.",
      payout: 80,
      timeEstimate: "25-35 min",
      difficulty: "Hard",
      category: "Translation",
      status: "available",
      deadline: "2024-01-22",
      slots: 10,
      completed: 3,
      maxParticipants: 10,
      currentParticipants: 3,
      timeLimit: 6, // hours
      createdAt: "2024-01-17T08:00:00Z",
      expiresAt: "2024-01-22T18:00:00Z",
      isParticipating: false,
      participatedAt: null,
    },
    {
      id: 5,
      title: "Market Research Survey - Food Delivery",
      description: "Complete comprehensive survey about food delivery preferences in India.",
      payout: 55,
      timeEstimate: "18-25 min",
      difficulty: "Easy",
      category: "Survey",
      status: "completed",
      deadline: "2024-01-15",
      slots: 100,
      completed: 100,
      maxParticipants: 100,
      currentParticipants: 100,
      timeLimit: 3, // hours
      createdAt: "2024-01-12T10:00:00Z",
      expiresAt: "2024-01-15T23:59:59Z",
      isParticipating: true,
      participatedAt: "2024-01-14T11:20:00Z",
    },
    {
      id: 6,
      title: "Voice Recording - Regional Accent Data",
      description: "Record voice samples in your regional accent for AI training.",
      payout: 40,
      timeEstimate: "10-15 min",
      difficulty: "Easy",
      category: "AI Training",
      status: "available",
      deadline: "2024-01-19",
      slots: 30,
      completed: 18,
      maxParticipants: 30,
      currentParticipants: 18,
      timeLimit: 1, // hours
      createdAt: "2024-01-17T12:00:00Z",
      expiresAt: "2024-01-19T16:00:00Z",
      isParticipating: false,
      participatedAt: null,
    },
    {
      id: 7,
      title: "Product Photography Review",
      description: "Rate and categorize product images for e-commerce platform.",
      payout: 30,
      timeEstimate: "5-10 min",
      difficulty: "Easy",
      category: "Content Review",
      status: "expired",
      deadline: "2024-01-16",
      slots: 20,
      completed: 8,
      maxParticipants: 20,
      currentParticipants: 8,
      timeLimit: 2, // hours
      createdAt: "2024-01-15T16:00:00Z",
      expiresAt: "2024-01-16T18:00:00Z",
      isParticipating: false,
      participatedAt: null,
    },
  ]

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()
    if (diff <= 0) return "Expired"
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${minutes}m left`
  }
  const getTaskAvailability = (task: any) => {
    const now = new Date()
    const expiry = new Date(task.expiresAt)
    if (now > expiry) return "expired"
    if (task.currentParticipants >= task.maxParticipants) return "full"
    if (task.isParticipating) return "participating"
    return "available"
  }

  const handleTaskAction = (taskId: number, action: string) => {
    // In a real app, this would make an API call
    console.log(`Task ${taskId}: ${action}`)
    if (action === "participate") {
      alert(`You have successfully joined the task! You have ${tasks.find(t => t.id === taskId)?.timeLimit} hours to complete it.`)
    }
  }

  const recentActivity = [
    { task: "Product Review Survey", amount: 45, date: "2024-01-15", status: "completed", rating: 5 },
    { task: "Image Labeling Task", amount: 35, date: "2024-01-14", status: "completed", rating: 4 },
    { task: "Content Moderation", amount: 60, date: "2024-01-13", status: "completed", rating: 5 },
    { task: "Translation Task", amount: 80, date: "2024-01-12", status: "completed", rating: 5 },
    { task: "Data Entry Task", amount: 25, date: "2024-01-11", status: "completed", rating: 4 },
  ]

  const achievements = [
    { title: "First Task Completed", icon: "🎯", earned: true },
    { title: "10 Tasks Milestone", icon: "🏆", earned: true },
    { title: "Perfect Week", icon: "⭐", earned: true },
    { title: "Speed Demon", icon: "⚡", earned: false },
    { title: "Quality Expert", icon: "💎", earned: true },
    { title: "Consistent Performer", icon: "🔥", earned: false },
  ]


  const filteredTasks = tasks.filter((task) => {
    const matchesType = filterType === "all" || task.category.toLowerCase().includes(filterType.toLowerCase())
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "participating":
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "full":
        return "bg-orange-100 text-orange-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"
      case "Medium":
        return "text-orange-600"
      case "Hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

    const formatDate = (date: string | null) =>
    date ? new Date(date).toISOString().slice(0, 10) : ""

    const handlePremiumUpgrade = () => {
  if (allComplete) {
    router.push("/upgrade"); // Change to your upgrade/payment route
  } else {
    router.push("/account/verification");
  }
};

const openTaskModal = (task) => {
  setSelectedTask(task);
  setIsTaskModalOpen(true);
};



  return (
    // <AuthGuard requiredRole="user">
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justifystify-between h-16">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/taskgen-logo.png"
                      alt="TaskGen Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold text-gray-900">TaskGen</span>
                  <Badge className="bg-blue-100 text-blue-800">User Dashboard</Badge>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentUser}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Rahul! 👋</h1>
                <p className="text-gray-600">You're on a {userStats.currentStreak}-day streak! Keep it up!</p>
              </div>
              <div className="text-left lg:text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-lg">{userStats.level} Member</span>
                </div>
                <Progress value={userStats.nextLevelProgress} className="w-full lg:w-32" />
                <p className="text-sm text-gray-500 mt-1">{userStats.nextLevelProgress}% to Platinum</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{userStats.totalEarned.toLocaleString()}</div>
                <p className="text-xs text-gray-500">+₹{userStats.thisMonth} this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <Wallet className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">₹{userStats.available.toLocaleString()}</div>
                <p className="text-xs text-gray-500">Ready to withdraw</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <Target className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{userStats.tasksCompleted}</div>
                <p className="text-xs text-gray-500">{userStats.successRate}% success rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak} days</div>
                <p className="text-xs text-gray-500">Personal best: 18 days</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="tasks">Available Tasks</TabsTrigger>
              <TabsTrigger value="mytasks">My Tasks</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Available Tasks */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle>Available Tasks</CardTitle>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Download className="h-4 w-4 mr-2" />
                          Withdraw ₹{userStats.available}
                        </Button>
                      </div>
                      <CardDescription>
                        {filteredTasks.filter((t) => t.status === "available").length} tasks available • Earn up to ₹
                        {Math.max(...filteredTasks.map((t) => t.payout))} per task
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Filters */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
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
                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger className="w-full sm:w-48">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Tasks</SelectItem>
                            <SelectItem value="survey">Surveys</SelectItem>
                            <SelectItem value="ai training">AI Training</SelectItem>
                            <SelectItem value="content review">Content Review</SelectItem>
                            <SelectItem value="translation">Translation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Task List */}
                      <div className="space-y-4">
                        {filteredTasks.map((task) => {
                          const availability = getTaskAvailability(task)
                          const timeRemaining = getTimeRemaining(task.expiresAt)
                          const participationRate = Math.round((task.currentParticipants / task.maxParticipants) * 100)
                          
                          return (
                            <Card
  key={task.id}
  className={`hover:shadow-md transition-shadow cursor-pointer ${
    availability === "expired" ? "opacity-60 bg-gray-50" : ""
  } ${task.isParticipating ? "ring-2 ring-blue-200 bg-blue-50/30" : ""}`}
  onClick={() => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  }}
>
  <CardContent className="p-4">
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="font-semibold">{task.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {task.category}
          </Badge>
          <Badge className={`text-xs ${getStatusColor(availability)}`}>
            {availability === "participating"
              ? "Participating"
              : availability === "expired"
              ? "Expired"
              : availability === "full"
              ? "Full"
              : "Available"}
          </Badge>
          {task.isParticipating && (
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              Joined {formatDate(task.participatedAt)}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>

        {/* Task Limits and Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Participants</span>
            <span className="font-medium">
              {task.currentParticipants}/{task.maxParticipants}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                participationRate >= 90
                  ? "bg-red-500"
                  : participationRate >= 70
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${participationRate}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{task.timeEstimate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className={getDifficultyColor(task.difficulty)}>
              {task.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {task.currentParticipants}/{task.maxParticipants} joined
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className={availability === "expired" ? "text-red-600" : ""}>
              {availability === "expired" ? "Expired" : timeRemaining}
            </span>
          </div>
          {task.isParticipating && (
            <div className="flex items-center gap-1 text-blue-600">
              <CheckCircle className="h-4 w-4" />
              <span>{task.timeLimit}h to complete</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-left lg:text-right">
        <div className="text-lg font-bold text-green-600 mb-2">
          ₹{task.payout}
        </div>
        <div className="text-xs text-gray-500 mb-3">
          {availability === "expired"
            ? "Task Expired"
            : availability === "full"
            ? "No Slots Left"
            : task.isParticipating
            ? `${task.timeLimit}h limit`
            : `${task.timeLimit}h to complete`}
        </div>

        {availability === "available" ? (
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
            onClick={(e) => {
              e.stopPropagation(); // Prevent Card click
              handleTaskAction(task.id, "participate");
            }}
          >
            Join Task
          </Button>
        ) : availability === "participating" ? (
          <div className="space-y-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 w-full lg:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                handleTaskAction(task.id, "continue");
              }}
            >
              Continue Task
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full lg:w-auto text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleTaskAction(task.id, "submit");
              }}
            >
              Submit Work
            </Button>
          </div>
        ) : availability === "full" ? (
          <Button size="sm" variant="outline" disabled className="w-full lg:w-auto">
            Task Full
          </Button>
        ) : (
          <Button size="sm" variant="outline" disabled className="w-full lg:w-auto">
            Expired
          </Button>
        )}
      </div>
    </div>
  </CardContent>
</Card>

                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 mr-2" />
                        Withdraw Earnings
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Payment History
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Gift className="h-4 w-4 mr-2" />
                        Refer Friends
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Account Status */}
                     <VerificationStatus />
                  {/* Upgrade to Premium */}
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-800">Premium Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-orange-700 mb-4 space-y-1">
                        <li>• Unlimited withdrawals</li>
                        <li>• Access to premium tasks</li>
                        <li>• Priority customer support</li>
                        <li>• Higher task limits</li>
                      </ul>
                      <Button
                          className="w-full bg-orange-600 hover:bg-orange-700"
                          onClick={handlePremiumUpgrade}
                        >
                          Upgrade for ₹199/year
                        </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mytasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Participated Tasks</CardTitle>
                  <CardDescription>
                    Tasks you've joined and their completion status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.filter(task => task.isParticipating).map((task) => {
  const timeRemaining = getTimeRemaining(task.expiresAt)
  const participatedDate = formatDate(task.participatedAt)
  const timeLeft = task.timeLimit
  const availability = getTaskAvailability(task)
  return (
    <Card
      key={task.id}
      className="border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
      }}
    >
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-semibold">{task.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {task.category}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                Joined {participatedDate}
              </Badge>
              {task.status === "completed" && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">₹{task.payout}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{task.timeEstimate}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600">
                <Target className="h-4 w-4" />
                <span>{timeLeft}h time limit</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className={timeRemaining === "Expired" ? "text-red-600" : "text-gray-500"}>
                  {timeRemaining === "Expired" ? "Expired" : `Due: ${timeRemaining}`}
                </span>
              </div>
            </div>
          </div>
          <div className="text-left lg:text-right">
            {task.status === "completed" ? (
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">
                  ✓ Completed
                </Badge>
                <div className="text-sm text-gray-500">
                  Earned ₹{task.payout}
                </div>
              </div>
            ) : timeRemaining === "Expired" ? (
              <div className="space-y-2">
                <Badge className="bg-red-100 text-red-800">
                  ⚠ Expired
                </Badge>
                <div className="text-sm text-red-600">
                  Time limit exceeded
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 w-full lg:w-auto"
                  onClick={e => {
                    e.stopPropagation();
                    handleTaskAction(task.id, "continue");
                  }}
                >
                  Continue Task
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full lg:w-auto"
                  onClick={e => {
                    e.stopPropagation();
                    handleTaskAction(task.id, "submit");
                  }}
                >
                  Submit Work
                </Button>
                <div className="text-xs text-gray-500 mt-1">
                  {timeRemaining}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
})}

                    
                    {tasks.filter(task => task.isParticipating).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">No Participated Tasks</h3>
                        <p>You haven't joined any tasks yet. Browse available tasks to get started!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your task completion history and earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.task}</p>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-semibold">+₹{activity.amount}</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < activity.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                  <CardDescription>Track your progress and unlock rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg text-center ${
                          achievement.earned
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        {achievement.earned ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Earned</Badge>
                        ) : (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Profile Information
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Rahul Kumar</h3>
                        <p className="text-gray-600">Gold Member</p>
                        <Badge className="bg-green-100 text-green-800 mt-1">Verified Account</Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Full Name</span>
                        <span className="font-medium">Rahul Kumar</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Email</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">rahul.kumar@email.com</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Mobile</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">+91 98765 43210</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Date of Birth</span>
                        <span className="font-medium">15/08/1995</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Gender</span>
                        <span className="font-medium">Male</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Address</span>
                        <span className="font-medium text-right">123 MG Road, Bangalore, Karnataka - 560001</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">PAN Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">ABCDE1234F</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Aadhaar Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">XXXX XXXX 5678</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bank Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Payment Information
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Payment
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Primary Payment Method */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-blue-800">Primary Payment Method</h4>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Method</span>
                          <span className="font-medium">UPI</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">UPI ID</span>
                          <span className="font-medium">rahul.kumar@paytm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-green-600">Verified</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Account Details */}
                    <div className="p-4 bg-gray-50 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Bank Account (Backup)</h4>
                        <Badge variant="outline">Verified</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Account Holder</span>
                          <span className="font-medium">Rahul Kumar</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Bank Name</span>
                          <span className="font-medium">State Bank of India</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Account Number</span>
                          <span className="font-medium">XXXX XXXX 1234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">IFSC Code</span>
                          <span className="font-medium">SBIN0001234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Account Type</span>
                          <span className="font-medium">Savings</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Branch</span>
                          <span className="font-medium">MG Road, Bangalore</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment History Summary */}
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">Payment Summary</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">₹12,450</div>
                          <div className="text-sm text-gray-600">Total Earned</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">₹9,800</div>
                          <div className="text-sm text-gray-600">Total Withdrawn</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Security */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">Password</span>
                          <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">Two-Factor Authentication</span>
                          <p className="text-sm text-gray-600">Add extra security to your account</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">Login Sessions</span>
                          <p className="text-sm text-gray-600">Manage your active sessions</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <span className="font-medium">Account Deletion</span>
                          <p className="text-sm text-gray-600">Permanently delete your account</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Verification Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VerificationStatus />
                  </CardContent>
                </Card>

                {/* Account Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">156</div>
                        <div className="text-sm text-gray-600">Tasks Completed</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">94%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">12</div>
                        <div className="text-sm text-gray-600">Current Streak</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">Gold</div>
                        <div className="text-sm text-gray-600">Member Level</div>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-medium">January 2024</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Login</span>
                        <span className="font-medium">Today, 2:30 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Account Status</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Referral Code</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">TG-RK-2024</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            📋
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">Email Notifications</span>
                          <p className="text-sm text-gray-600">Receive task updates via email</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">SMS Notifications</span>
                          <p className="text-sm text-gray-600">Receive important alerts via SMS</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">Marketing Communications</span>
                          <p className="text-sm text-gray-600">Receive promotional offers</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <span className="font-medium">Data Usage</span>
                          <p className="text-sm text-gray-600">Allow usage analytics</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
      </div>
      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskAction={handleTaskAction}
      />
      </div>
  )
}