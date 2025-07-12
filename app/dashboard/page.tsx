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
  Award, Target, Users, Gift, LogOut, User, Settings, Bell, Menu, DollarSign, XCircle, Sparkles
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { VerificationStatus } from "@/components/verification-status"
import { TaskDetailModal } from "@/components/task-detail-modal"
import { WelcomeFlow } from "@/components/welcome-flow"


function formatDate(dateString: string | null) {
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
const [selectedTask, setSelectedTask] = useState<any>(null);
const [userName, setUserName] = useState("");
const [showWelcomeFlow, setShowWelcomeFlow] = useState(false);
const [userParticipation, setUserParticipation] = useState({
  hasParticipated: false,
  participationCount: 0,
  isNewUser: false,
  userCreatedAt: null
});

  const [myTasks, setMyTasks] = useState<any[]>([]);
  const [myTasksLoading, setMyTasksLoading] = useState(true);
  const [myTasksError, setMyTasksError] = useState<string | null>(null);

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState<string | null>(null);

  const [achievements, setAchievements] = useState<any[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [achievementsError, setAchievementsError] = useState<string | null>(null);

  const [accountData, setAccountData] = useState<any>(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [accountError, setAccountError] = useState<string | null>(null);

  // Add dynamic tasks state
  const [tasks, setTasks] = useState<any[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);

  // Helper functions
  const isExpired = (task: any) => {
    if (!task.deadline) return false;
    const now = new Date();
    const deadline = new Date(task.deadline);
    return deadline < now;
  };
  const isFull = (task: any) => task.currentParticipants >= task.maxParticipants;

  // Only show tasks not joined and not expired in Available Tasks
  const availableTasks = tasks.filter(task => !task.isParticipated && !isExpired(task));
  // Of those, split into available and full
  const joinableTasks = availableTasks.filter(task => !isFull(task));
  const fullTasks = availableTasks.filter(task => isFull(task));

  // My Tasks: only those joined
  const myParticipatedTasks = tasks.filter(task => task.isParticipated);

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

  // Check user participation status
  useEffect(() => {
    fetch("/api/user/participation", { credentials: "include" })
      .then(res => {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUserParticipation(data);
          // Show welcome flow for new users who haven't participated
          if (data.isNewUser && !data.hasParticipated) {
            setShowWelcomeFlow(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching participation data:", error);
      });
  }, [router]);

  // Fetch My Tasks
  useEffect(() => {
    setMyTasksLoading(true);
    fetch("/api/user/mytasks", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setMyTasks(data.mytasks || []);
        setMyTasksLoading(false);
      })
      .catch(err => {
        setMyTasksError("Failed to load tasks");
        setMyTasksLoading(false);
      });
  }, []);

  // Fetch Recent Activity
  useEffect(() => {
    setActivityLoading(true);
    fetch("/api/user/activity", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setRecentActivity(data.activities || []);
        setActivityLoading(false);
      })
      .catch(err => {
        setActivityError("Failed to load activity");
        setActivityLoading(false);
      });
  }, []);

  // Fetch Achievements
  useEffect(() => {
    setAchievementsLoading(true);
    fetch("/api/user/achievements", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setAchievements(data.achievements || []);
        setAchievementsLoading(false);
      })
      .catch(err => {
        setAchievementsError("Failed to load achievements");
        setAchievementsLoading(false);
      });
  }, []);

  // Fetch Account Data
  useEffect(() => {
    setAccountLoading(true);
    fetch("/api/user/account", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setAccountData(data);
        setAccountLoading(false);
      })
      .catch(err => {
        setAccountError("Failed to load account data");
        setAccountLoading(false);
      });
  }, []);

  // Fetch Available Tasks (now from /api/user/participation)
  useEffect(() => {
    setTasksLoading(true);
    fetch("/api/user/participation", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || []);
        setTasksLoading(false);
      })
      .catch(err => {
        setTasksError("Failed to load available tasks");
        setTasksLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch from localStorage on mount
    const storedName = localStorage.getItem("userName");
    setUserName(storedName || "User");
  }, []);
  
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("userRole")
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  }

  const userStats = {
    totalEarned: userParticipation.hasParticipated ? 12450 : 0,
    thisMonth: userParticipation.hasParticipated ? 3200 : 0,
    withdrawn: userParticipation.hasParticipated ? 9800 : 0,
    pending: userParticipation.hasParticipated ? 650 : 0,
    available: userParticipation.hasParticipated ? 2000 : 0,
    tasksCompleted: userParticipation.hasParticipated ? 156 : 0,
    successRate: userParticipation.hasParticipated ? 94 : 0,
    currentStreak: userParticipation.hasParticipated ? 12 : 0,
    level: userParticipation.hasParticipated ? "Gold" : "Free",
    nextLevelProgress: userParticipation.hasParticipated ? 75 : 0,
  }

  const allComplete =
    accountStatus.emailVerified &&
    accountStatus.mobileVerified &&
    accountStatus.kycCompleted &&
    accountStatus.paymentSetup;



  // Replace all usages of the static tasks array with the dynamic tasks state
  // For example, in filteredTasks:
  const filteredTasks = tasks.filter((task) => {
    const matchesType = filterType === "all" || (task.category && task.category.toLowerCase().includes(filterType.toLowerCase()));
    const matchesSearch = task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  })

  const getTimeRemaining = (deadline: string | null | undefined) => {
    if (!deadline) return "No deadline";
    const expiry = new Date(deadline);
    if (isNaN(expiry.getTime())) return "Invalid date";
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    if (diff <= 0) return "Expired";
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 30) {
      // Show the deadline date in YYYY-MM-DD format
      return `Due: ${expiry.getFullYear()}-${String(expiry.getMonth() + 1).padStart(2, '0')}-${String(expiry.getDate()).padStart(2, '0')}`;
    } else {
      return `Due in ${days} days`;
    }
  };
  const getTaskAvailability = (task: any) => {
    const now = new Date()
    const expiry = new Date(task.expiresAt)
    if (now > expiry) return "expired"
    if (task.currentParticipants >= task.maxParticipants) return "full"
    if (task.isParticipating) return "participating"
    return "available"
  }

  // Add this function to handle joining a task
  const handleJoinTask = async (taskId: number) => {
    try {
      const res = await fetch('/api/user/participation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        // Find the joined task
        const joinedTask = tasks.find(t => t.id === taskId);
        if (joinedTask) {
          setRecentActivity(prev => [
            {
              task: joinedTask.title,
              amount: joinedTask.payout,
              date: new Date().toISOString().split('T')[0],
              status: 'joined',
              rating: null,
              category: joinedTask.category,
              message: 'Joined task'
            },
            ...prev
          ]);
        }
        // Refresh tasks after joining
        setTasksLoading(true);
        fetch('/api/user/participation', { credentials: 'include' })
          .then(res => res.json())
          .then(data => {
            setTasks(data.tasks || []);
            setTasksLoading(false);
          })
          .catch(() => setTasksLoading(false));
      } else if (res.status === 409) {
        alert('You have already joined this task.');
      } else {
        alert(data.error || 'Failed to join task.');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  // Update handleTaskAction to use handleJoinTask for participate
  const handleTaskAction = (taskId: number, action: string) => {
    if (action === 'participate') {
      handleJoinTask(taskId);
    }
  }




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

const openTaskModal = (task: any) => {
  setSelectedTask(task);
  setIsTaskModalOpen(true);
};

const handleWelcomeFlowComplete = () => {
  setShowWelcomeFlow(false);
  // Optionally mark that user has seen the welcome flow
  localStorage.setItem("welcomeFlowCompleted", "true");
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back {userName}! 👋</h1>
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

          {/* New User Banner */}
          {userParticipation.isNewUser && !userParticipation.hasParticipated && (
            <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">Welcome to TaskGen! 🎉</h3>
                      <p className="text-blue-700">
                        Start your earning journey today. Complete your first task and unlock your potential!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowWelcomeFlow(true)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Learn More
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setShowWelcomeFlow(true)}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{userStats.totalEarned.toLocaleString()}</div>
                <p className="text-xs text-gray-500">
                  {userParticipation.hasParticipated 
                    ? `+₹${userStats.thisMonth} this month` 
                    : "Complete your first task to start earning!"
                  }
                </p>
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
                <p className="text-xs text-gray-500">
                  {userParticipation.hasParticipated 
                    ? `${userStats.successRate}% success rate` 
                    : "Start with your first task!"
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak} days</div>
                <p className="text-xs text-gray-500">
                  {userParticipation.hasParticipated 
                    ? "Personal best: 18 days" 
                    : "Build your streak today!"
                  }
                </p>
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

                      {/* New User First Task Highlight */}
                      {userParticipation.isNewUser && !userParticipation.hasParticipated && (
                        <Card className="mb-6 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                                  <Target className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-green-900">Recommended First Task</h3>
                                  <p className="text-green-700">
                                    Start with this easy survey to earn your first ₹45 in just 15-20 minutes!
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600 mb-1">₹45</div>
                                <div className="text-sm text-green-600">15-20 min</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Task List */}
                      <div className="space-y-4">
                        {tasksLoading ? (
                          <div className="text-center py-8 text-gray-500">Loading tasks...</div>
                        ) : tasksError ? (
                          <div className="text-center py-8 text-red-500">{tasksError}</div>
                        ) : filteredTasks.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">No tasks found matching your criteria.</div>
                        ) : (
                          <>
                            {joinableTasks.map((task) => {
                              const availability = getTaskAvailability(task)
                              const timeRemaining = getTimeRemaining(task.deadline)
                              const participationRate = Math.round((task.currentParticipants / task.maxParticipants) * 100)
                              const isLive = availability === "available"

                              return (
                                <Card
                                  key={task.id}
                                  className={`hover:shadow-md transition-shadow ${
                                    isLive ? "cursor-pointer" : "opacity-60 bg-gray-50 pointer-events-none"
                                  } ${task.isParticipating ? "ring-2 ring-blue-200 bg-blue-50/30" : ""}`}
                                  onClick={() => {
                                    if (isLive) {
                                      setSelectedTask(task);
                                      setIsTaskModalOpen(true);
                                    }
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

                                        {isLive ? (
                                          <Button
                                            size="sm"
                                            className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
                                            onClick={(e) => {
                                              e.stopPropagation(); // Prevent Card click
                                              handleJoinTask(task.id);
                                            }}
                                          >
                                            Join Task
                                          </Button>
                                        ) : (
                                          <Button size="sm" variant="outline" disabled className="w-full lg:w-auto">
                                            {availability === "expired"
                                              ? "Expired"
                                              : availability === "full"
                                              ? "Task Full"
                                              : "Not Live"}
                                          </Button>
                                        )}
                                        {!isLive && (
                                          <div className="text-xs text-gray-400 mt-2">
                                            {availability === "expired"
                                              ? "This task has expired."
                                              : availability === "full"
                                              ? "No more slots available."
                                              : "This task is not currently live."}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                            {fullTasks.map((task) => {
                              const availability = getTaskAvailability(task)
                              const timeRemaining = getTimeRemaining(task.deadline)
                              const participationRate = Math.round((task.currentParticipants / task.maxParticipants) * 100)
                              const isLive = availability === "available"

                              return (
                                <Card
                                  key={task.id}
                                  className={`hover:shadow-md transition-shadow opacity-60 bg-gray-50 pointer-events-none`}
                                  onClick={() => {
                                    if (isLive) {
                                      setSelectedTask(task);
                                      setIsTaskModalOpen(true);
                                    }
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

                                        {isLive ? (
                                          <Button
                                            size="sm"
                                            className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
                                            onClick={(e) => {
                                              e.stopPropagation(); // Prevent Card click
                                              handleJoinTask(task.id);
                                            }}
                                          >
                                            Join Task
                                          </Button>
                                        ) : (
                                          <Button size="sm" variant="outline" disabled className="w-full lg:w-auto">
                                            {availability === "expired"
                                              ? "Expired"
                                              : availability === "full"
                                              ? "Task Full"
                                              : "Not Live"}
                                          </Button>
                                        )}
                                        {!isLive && (
                                          <div className="text-xs text-gray-400 mt-2">
                                            {availability === "expired"
                                              ? "This task has expired."
                                              : availability === "full"
                                              ? "No more slots available."
                                              : "This task is not currently live."}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </>
                        )}
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
                  
                  {/* New User Earnings Potential */}
                  {userParticipation.isNewUser && !userParticipation.hasParticipated && (
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-800">Your Earning Potential</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-green-600">₹45</div>
                            <div className="text-sm text-gray-600">First Task Reward</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center p-2 bg-white rounded">
                              <div className="font-semibold text-blue-600">₹50-200</div>
                              <div className="text-xs text-gray-500">Per Task</div>
                            </div>
                            <div className="text-center p-2 bg-white rounded">
                              <div className="font-semibold text-purple-600">₹500-2000</div>
                              <div className="text-xs text-gray-500">Monthly</div>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => setShowWelcomeFlow(true)}
                          >
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

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
                  {myTasksLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : myTasksError ? (
                    <div className="text-center py-8 text-red-500">{myTasksError}</div>
                  ) : myParticipatedTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No Participated Tasks</h3>
                      <p>You haven't joined any tasks yet. Browse available tasks to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myParticipatedTasks.map((task) => {
                        const timeRemaining = getTimeRemaining(task.deadline)
                        const participatedDate = formatDate(task.participatedAt)
                        const timeLeft = task.timeEstimate
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
                                      <span>{timeLeft}</span>
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
                    </div>
                  )}
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
                  {activityLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : activityError ? (
                    <div className="text-center py-8 text-red-500">{activityError}</div>
                  ) : recentActivity.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No recent activity found.</div>
                  ) : (
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
                  )}
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
                  {achievementsLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : achievementsError ? (
                    <div className="text-center py-8 text-red-500">{achievementsError}</div>
                  ) : achievements.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No achievements found.</div>
                  ) : (
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
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          {achievement.earned ? (
                            <Badge className="bg-yellow-100 text-yellow-800">Earned</Badge>
                          ) : (
                            <div className="space-y-2">
                              <Badge variant="outline">Locked</Badge>
                              <div className="text-xs text-gray-500">
                                Progress: {achievement.progress}/{achievement.required}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              {accountLoading ? (
                <div className="text-center py-8 text-gray-500">Loading account information...</div>
              ) : accountError ? (
                <div className="text-center py-8 text-red-500">{accountError}</div>
              ) : accountData ? (
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
                            <h3 className="text-lg font-semibold">{accountData.profile?.name || "User"}</h3>
                            <p className="text-gray-600">{accountData.profile?.memberLevel || "Free"} Member</p>
                            <div className="flex gap-2 mt-1">
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                              {accountData.profile?.isVerified && (
                                <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                              )}
                              {accountData.profile?.mobileVerified && (
                                <Badge className="bg-purple-100 text-purple-800">Mobile Verified</Badge>
                              )}
                            </div>
                          </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Full Name</span>
                          <span className="font-medium">{accountData.profile?.name || "Not provided"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Email</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{accountData.profile?.email || "Not provided"}</span>
                            {accountData.profile?.email && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Mobile</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{accountData.profile?.mobile || "Not provided"}</span>
                            {accountData.profile?.mobile && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                        </div>
                                                  <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Member Since</span>
                            <span className="font-medium">{accountData.profile?.createdAt ? new Date(accountData.profile.createdAt).toLocaleDateString() : "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Account Status</span>
                            <Badge className={`${accountData.profile?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {accountData.profile?.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Role</span>
                            <span className="font-medium capitalize">{accountData.profile?.role || "user"}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Email Verified</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${accountData.profile?.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                                {accountData.profile?.isVerified ? 'Yes' : 'No'}
                              </span>
                              {accountData.profile?.isVerified && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">Mobile Verified</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${accountData.profile?.mobileVerified ? 'text-green-600' : 'text-red-600'}`}>
                                {accountData.profile?.mobileVerified ? 'Yes' : 'No'}
                              </span>
                              {accountData.profile?.mobileVerified && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-600">KYC Verified</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${accountData.profile?.kycVerified ? 'text-green-600' : 'text-red-600'}`}>
                                {accountData.profile?.kycVerified ? 'Yes' : 'No'}
                              </span>
                              {accountData.profile?.kycVerified && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600">Payment Setup</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${accountData.profile?.paymentSetup ? 'text-green-600' : 'text-red-600'}`}>
                                {accountData.profile?.paymentSetup ? 'Yes' : 'No'}
                              </span>
                              {accountData.profile?.paymentSetup && <CheckCircle className="h-4 w-4 text-green-600" />}
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
                      {accountData.paymentMethods && accountData.paymentMethods.length > 0 ? (
                        accountData.paymentMethods.map((method: any, index: number) => (
                          <div key={index} className={`p-4 ${method.isPrimary ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border'} rounded-lg`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-blue-800">{method.isPrimary ? 'Primary Payment Method' : 'Payment Method'}</h4>
                              <Badge className={method.isPrimary ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                                {method.isPrimary ? 'Active' : 'Backup'}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Method</span>
                                <span className="font-medium">{method.type}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Details</span>
                                <span className="font-medium">{method.details}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status</span>
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium ${method.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {method.isVerified ? 'Verified' : 'Pending'}
                                  </span>
                                  {method.isVerified && <CheckCircle className="h-4 w-4 text-green-600" />}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-gray-50 border rounded-lg">
                          <p className="text-gray-500 text-center">No payment methods added yet.</p>
                        </div>
                      )}

                      {/* Bank Account Details */}
                      {accountData.bankAccount ? (
                        <div className="p-4 bg-gray-50 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">Bank Account (Backup)</h4>
                            <Badge variant="outline">Verified</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Account Holder</span>
                              <span className="font-medium">{accountData.bankAccount.accountHolder}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Bank Name</span>
                              <span className="font-medium">{accountData.bankAccount.bankName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Account Number</span>
                              <span className="font-medium">{accountData.bankAccount.accountNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">IFSC Code</span>
                              <span className="font-medium">{accountData.bankAccount.ifscCode}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Account Type</span>
                              <span className="font-medium">{accountData.bankAccount.accountType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Branch</span>
                              <span className="font-medium">{accountData.bankAccount.branch}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-gray-50 border rounded-lg">
                          <p className="text-gray-500 text-center">No bank account added yet.</p>
                        </div>
                      )}

                      {/* Payment History Summary */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-3">Payment Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">₹{accountData.stats?.totalEarned || 0}</div>
                            <div className="text-sm text-gray-600">Total Earned</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{accountData.stats?.completedTasks || 0}</div>
                            <div className="text-sm text-gray-600">Tasks Completed</div>
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
                          <div className="text-xl font-bold text-blue-600">{accountData.stats?.completedTasks || 0}</div>
                          <div className="text-sm text-gray-600">Tasks Completed</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{accountData.stats?.avgRating || 0}</div>
                          <div className="text-sm text-gray-600">Avg Rating</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-xl font-bold text-orange-600">{accountData.stats?.tasksThisMonth || 0}</div>
                          <div className="text-sm text-gray-600">This Month</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">{accountData.profile?.memberLevel || "Free"}</div>
                          <div className="text-sm text-gray-600">Member Level</div>
                        </div>
                      </div>

                      <div className="space-y-3 mt-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Member Since</span>
                          <span className="font-medium">{accountData.profile?.createdAt ? new Date(accountData.profile.createdAt).toLocaleDateString() : "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Login</span>
                          <span className="font-medium">{accountData.profile?.lastLogin ? new Date(accountData.profile.lastLogin).toLocaleDateString() : "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Account Status</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Referral Code</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">TG-{accountData.profile?.name?.substring(0, 2)?.toUpperCase()}-2024</span>
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
              ) : (
                <div className="text-center py-8 text-gray-500">No account data available.</div>
              )}
            </TabsContent>
          </Tabs>
      </div>
      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskAction={handleTaskAction}
      />
      
      {/* Welcome Flow for New Users */}
      {showWelcomeFlow && (
        <WelcomeFlow onComplete={handleWelcomeFlowComplete} />
      )}
      </div>
  )
}