"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, TrendingUp, Filter, Search, CheckCircle, XCircle, Eye, Edit, Trash2, Plus, Download, Upload, DollarSign, Target, Activity, FileText, Settings, LogOut, User, Bell, Menu } from 'lucide-react'
import { AuthGuard } from "@/components/auth-guard"
import Image from "next/image"
import { CreateTaskModal } from "@/components/create-task-modal"
import { TaskDetailModal } from "@/components/task-detail-modal"

export default function AdminDashboard() {
  const [userFilter, setUserFilter] = useState("all")
  const [taskFilter, setTaskFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
const [users, setUsers] = useState([]);
const [loadingUsers, setLoadingUsers] = useState(false);
const [error, setError] = useState(null);
const [selectedTask, setSelectedTask] = useState(null);
const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
const [tasks, setTasks] = useState([]);
const [loadingTasks, setLoadingTasks] = useState(false);
const [tasksError, setTasksError] = useState(null);



  useEffect(() => {
  async function fetchUsers() {
    setLoadingUsers(true);
    setError(null);
    try {
      // You might want to add filtering & search in the API query here
      let url = "/api/admin/users";
      if (userFilter && userFilter !== "all") url += `?status=${userFilter}`;
      // If searchTerm, add to query:
      if (searchTerm) url += (url.includes("?") ? "&" : "?") + `search=${encodeURIComponent(searchTerm)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setError(e.message || "Error fetching users");
    }
    setLoadingUsers(false);
  }
  fetchUsers();
}, [userFilter, searchTerm]);

const handleTaskAction = (taskId, action) => {
  // Implement real logic (view/edit/delete) as needed
  
  // setIsTaskModalOpen(false); // Uncomment to auto-close modal after action
};
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("userRole")
      window.location.href = "/login"
    }
  }



const fetchTasks = async () => {
  setLoadingTasks(true);
  setTasksError(null);
  try {
    let url = "/api/admin/tasks";
    if (taskFilter && taskFilter !== "all") url += `?status=${taskFilter}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load tasks");
    const data = await res.json();
    setTasks(data);
  } catch (e) {
    setTasksError(e.message || "Error fetching tasks");
  }
  setLoadingTasks(false);
};

useEffect(() => {
  fetchTasks();
}, [taskFilter]);

// Fetch admin stats
const fetchAdminStats = async () => {
  setLoadingStats(true);
  setStatsError(null);
  try {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) throw new Error('Failed to load admin statistics');
    const data = await res.json();
    console.log('Admin stats received:', data); // Debug log
    setAdminStats(data);
  } catch (e) {
    console.error('Error fetching admin stats:', e); // Debug log
    setStatsError(e.message || 'Error fetching admin statistics');
  }
  setLoadingStats(false);
};

useEffect(() => {
  fetchAdminStats();
}, []);
  const handleCreateTask = async (taskData) => {
  try {
    const res = await fetch('/api/admin/tasks', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData)
    });
    const result = await res.json();
    if (res.ok) {
      alert("Task created successfully! Task ID: " + result.id);
      // Optionally reload task list or close modal here
    } else {
      alert("Failed: " + result.error);
    }
  } catch (e) {
    alert("Server error: " + e.message);
  }
};

  const getKYCStatus = user => user.kyc_status || "pending";
//  {
//   if (user.kyc_completed || user.payment_method_completed) {
//     return "verified";
//   }
//   return user.kycStatus || "pending";
// };

  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTasks: 0,
    activeTasks: 0,
    totalPayouts: 0,
    pendingPayouts: 0,
    completionRate: 0,
    avgTaskTime: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState(null);

  // KYC Requests state
  const [kycRequests, setKycRequests] = useState([]);
  const [loadingKyc, setLoadingKyc] = useState(true);
  const [kycError, setKycError] = useState(null);
  const [selectedKycRequest, setSelectedKycRequest] = useState(null);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  // const users = [
  //   {
  //     id: 1,
  //     name: "Rahul Kumar",
  //     email: "rahul.kumar@email.com",
  //     mobile: "+91 98765 43210",
  //     joinDate: "2024-01-10",
  //     status: "active",
  //     kycStatus: "verified",
  //     tasksCompleted: 156,
  //     totalEarned: 12450,
  //     successRate: 94,
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Sharma",
  //     email: "priya.sharma@email.com",
  //     mobile: "+91 87654 32109",
  //     joinDate: "2024-01-08",
  //     status: "active",
  //     kycStatus: "pending",
  //     tasksCompleted: 89,
  //     totalEarned: 7890,
  //     successRate: 91,
  //   },
  //   {
  //     id: 3,
  //     name: "Amit Singh",
  //     email: "amit.singh@email.com",
  //     mobile: "+91 76543 21098",
  //     joinDate: "2024-01-05",
  //     status: "suspended",
  //     kycStatus: "rejected",
  //     tasksCompleted: 23,
  //     totalEarned: 1200,
  //     successRate: 65,
  //   },
  //   {
  //     id: 4,
  //     name: "Sneha Patel",
  //     email: "sneha.patel@email.com",
  //     mobile: "+91 65432 10987",
  //     joinDate: "2024-01-12",
  //     status: "active",
  //     kycStatus: "verified",
  //     tasksCompleted: 234,
  //     totalEarned: 18900,
  //     successRate: 96,
  //   },
  // ]

  // const tasks = [
  //   {
  //     id: 1,
  //     title: "E-commerce Product Review Survey",
  //     category: "Survey",
  //     payout: 45,
  //     totalSlots: 25,
  //     completed: 8,
  //     maxParticipants: 25,
  //     currentParticipants: 8,
  //     timeLimit: 3, // hours
  //     status: "active",
  //     createdDate: "2024-01-15",
  //     deadline: "2024-01-20",
  //     expiresAt: "2024-01-20T18:00:00Z",
  //     difficulty: "Easy",
  //   },
  //   {
  //     id: 2,
  //     title: "AI Training - Image Object Detection",
  //     category: "AI Training",
  //     payout: 35,
  //     totalSlots: 50,
  //     completed: 32,
  //     maxParticipants: 50,
  //     currentParticipants: 32,
  //     timeLimit: 2, // hours
  //     status: "active",
  //     createdDate: "2024-01-14",
  //     deadline: "2024-01-18",
  //     expiresAt: "2024-01-18T20:00:00Z",
  //     difficulty: "Medium",
  //   },
  //   {
  //     id: 3,
  //     title: "Content Moderation Task",
  //     category: "Content Review",
  //     payout: 60,
  //     totalSlots: 15,
  //     completed: 15,
  //     maxParticipants: 15,
  //     currentParticipants: 15,
  //     timeLimit: 4, // hours
  //     status: "completed",
  //     createdDate: "2024-01-10",
  //     deadline: "2024-01-15",
  //     expiresAt: "2024-01-15T23:59:59Z",
  //     difficulty: "Medium",
  //   },
  //   {
  //     id: 4,
  //     title: "Hindi Translation Project",
  //     category: "Translation",
  //     payout: 80,
  //     totalSlots: 10,
  //     completed: 3,
  //     maxParticipants: 10,
  //     currentParticipants: 3,
  //     timeLimit: 6, // hours
  //     status: "active",
  //     createdDate: "2024-01-12",
  //     deadline: "2024-01-22",
  //     expiresAt: "2024-01-22T18:00:00Z",
  //     difficulty: "Hard",
  //   },
  //   {
  //     id: 5,
  //     title: "Product Photography Review",
  //     category: "Content Review",
  //     payout: 30,
  //     totalSlots: 20,
  //     completed: 8,
  //     maxParticipants: 20,
  //     currentParticipants: 8,
  //     timeLimit: 2, // hours
  //     status: "expired",
  //     createdDate: "2024-01-15",
  //     deadline: "2024-01-16",
  //     expiresAt: "2024-01-16T18:00:00Z",
  //     difficulty: "Easy",
  //   },
  // ]

  // Fetch KYC requests
  const fetchKycRequests = async () => {
    setLoadingKyc(true);
    setKycError(null);
    try {
      const res = await fetch('/api/admin/kyc-requests');
      if (!res.ok) throw new Error('Failed to load KYC requests');
      const data = await res.json();
      console.log('KYC requests received:', data); // Debug log
      setKycRequests(data);
    } catch (e) {
      console.error('Error fetching KYC requests:', e); // Debug log
      setKycError(e.message || 'Error fetching KYC requests');
    }
    setLoadingKyc(false);
  };

  useEffect(() => {
    fetchKycRequests();
  }, []);

  // Withdrawals state
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true);
  const [withdrawalsError, setWithdrawalsError] = useState(null);

  const fetchWithdrawals = async () => {
    setLoadingWithdrawals(true);
    setWithdrawalsError(null);
    try {
      const res = await fetch('/api/admin/withdrawals');
      if (!res.ok) throw new Error('Failed to load withdrawal requests');
      const data = await res.json();
      setWithdrawalRequests(data);
    } catch (e) {
      setWithdrawalsError(e.message || 'Error fetching withdrawal requests');
    }
    setLoadingWithdrawals(false);
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
      case "rejected":
      case "incomplete":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Analytics state
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [analyticsError, setAnalyticsError] = useState(null);

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    setAnalyticsError(null);
    try {
      const res = await fetch('/api/admin/analytics');
      if (!res.ok) throw new Error('Failed to load analytics');
      const data = await res.json();
      setAnalytics(data);
    } catch (e) {
      setAnalyticsError(e.message || 'Error fetching analytics');
    }
    setLoadingAnalytics(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    // <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="md:hidden">
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
                  <span className="text-xl font-bold text-gray-900">TaskGen Admin</span>
                  <Badge className="bg-red-100 text-red-800">Admin Panel</Badge>
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
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export Data</span>
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
          {/* Error Display */}
          {statsError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-800">Error loading admin statistics: {statsError}</span>
              </div>
            </div>
          )}
          
          {/* Admin Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-green-600">+{adminStats.activeUsers.toLocaleString()} active</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <Target className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{adminStats.totalTasks.toLocaleString()}</div>
                    <p className="text-xs text-blue-600">{adminStats.activeTasks} currently active</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">₹{(adminStats.totalPayouts / 100000).toFixed(1)}L</div>
                    <p className="text-xs text-orange-600">₹{(adminStats.pendingPayouts / 1000).toFixed(0)}K pending</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{adminStats.completionRate}%</div>
                    <p className="text-xs text-gray-600">Avg time: {adminStats.avgTaskTime}min</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="kyc">KYC Requests</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage user accounts and verification status</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="verified">KYC Verified</SelectItem>
                        <SelectItem value="pending">KYC Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>KYC</TableHead>
                          <TableHead>Tasks</TableHead>
                          <TableHead>Earnings</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
  {loadingUsers ? (
    <TableRow>
      <TableCell colSpan={7} className="text-center text-gray-500 py-6">Loading users...</TableCell>
    </TableRow>
  ) : error ? (
    <TableRow>
      <TableCell colSpan={7} className="text-center text-red-500 py-6">{error}</TableCell>
    </TableRow>
  ) : users.length === 0 ? (
    <TableRow>
      <TableCell colSpan={7} className="text-center text-gray-500 py-6">No users found.</TableCell>
    </TableRow>
  ) : (
    users.map((user) => (
      <TableRow key={user.id}>
        <TableCell>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">Joined {user.joinDate || user.created_at?.split("T")[0]}</div>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <div className="text-sm">{user.email}</div>
            <div className="text-sm text-gray-500">{user.mobile || user.phone}</div>
          </div>
        </TableCell>
        <TableCell>
          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
        </TableCell>
        <TableCell>
          <Badge className={getStatusColor(getKYCStatus(user))}>
  {getKYCStatus(user)}
</Badge>
        </TableCell>
        <TableCell>
          <div>
            <div className="font-medium">{user.tasksCompleted ?? "-"}</div>
            <div className="text-sm text-gray-500">{user.successRate ? `${user.successRate}% success` : "-"}</div>
          </div>
        </TableCell>
        <TableCell>
          <div className="font-medium text-green-600">₹{user.totalEarned?.toLocaleString() ?? "0"}</div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
  <Card>
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>Manage and monitor all platform tasks</CardDescription>
        </div>
        <CreateTaskModal
          isOpen={showCreateTaskModal}
          onClose={() => setShowCreateTaskModal(false)}
          onCreateTask={async (taskData) => {
            // Replace with your API POST logic
            try {
              const res = await fetch('/api/admin/tasks', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
              });
              const result = await res.json();
              if (res.ok) {
                alert("Task created successfully! Task ID: " + result.id);
                fetchTasks(); // Reload
                setShowCreateTaskModal(false);
              } else {
                alert("Failed: " + result.error);
              }
            } catch (e) {
              alert("Server error: " + e.message);
            }
          }}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateTaskModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Payout</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingTasks ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                  Loading tasks...
                </TableCell>
              </TableRow>
            ) : tasksError ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-red-500 py-6">
                  {tasksError}
                </TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map(task => {
                const participationRate = Math.round((task.currentParticipants / task.maxParticipants) * 100);
                const now = new Date();
                const expiry = new Date(task.expiresAt);
                const isExpired = now > expiry;
                return (
                  <TableRow
                    key={task.id}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsTaskModalOpen(true);
                    }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500">Created {task.createdDate}</div>
                        <div className="text-xs text-gray-400">
                          {task.timeLimit}h time limit • Max {task.maxParticipants} participants
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{task.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">₹{task.payout}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">
                          {task.currentParticipants}/{task.maxParticipants}
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
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
                        <div className="text-xs text-gray-500 mt-1">{participationRate}% filled</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(isExpired ? "expired" : task.status)}>
                        {isExpired ? "expired" : task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{task.deadline}</div>
                        {isExpired && <div className="text-xs text-red-600">Expired</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={e => { e.stopPropagation(); /* Custom view logic here */ }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={e => { e.stopPropagation(); /* Custom edit logic here */ }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={e => { e.stopPropagation(); /* Custom delete logic here */ }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</TabsContent>

            <TabsContent value="kyc" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>KYC Verification Requests</CardTitle>
                  <CardDescription>Review and approve user verification documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Documents</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingKyc ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                              Loading KYC requests...
                            </TableCell>
                          </TableRow>
                        ) : kycError ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-red-500 py-6">
                              {kycError}
                            </TableCell>
                          </TableRow>
                        ) : kycRequests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                              No KYC requests found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          kycRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{request.userName}</div>
                                  <div className="text-sm text-gray-500">{request.email}</div>
                                </div>
                              </TableCell>
                              <TableCell>{request.submittedDate}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {request.documents.map((doc, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {request.upiId && `UPI: ${request.upiId}`}
                                  {request.bankAccount && `Bank: ${request.bankAccount}`}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600">
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedKycRequest(request);
                                      setIsKycModalOpen(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal Requests</CardTitle>
                  <CardDescription>Process user withdrawal requests and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Requested</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loadingWithdrawals ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                              Loading withdrawal requests...
                            </TableCell>
                          </TableRow>
                        ) : withdrawalsError ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-red-500 py-6">
                              {withdrawalsError}
                            </TableCell>
                          </TableRow>
                        ) : withdrawalRequests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                              No withdrawal requests found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          withdrawalRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div className="font-medium">{request.userName}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium text-green-600">₹{request.amount?.toLocaleString()}</div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{request.method}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{request.details}</div>
                              </TableCell>
                              <TableCell>{request.requestDate}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {request.status === "pending" && (
                                    <>
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="outline" className="text-red-600">
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingAnalytics ? (
                    <div>Loading analytics...</div>
                  ) : analyticsError ? (
                    <div className="text-red-500">{analyticsError}</div>
                  ) : analytics ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Daily Active Users</span>
                        <span className="font-semibold">{analytics.dailyActiveUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tasks Completed Today</span>
                        <span className="font-semibold">{analytics.tasksCompletedToday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Revenue Today</span>
                        <span className="font-semibold text-green-600">₹{analytics.revenueToday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>New Registrations</span>
                        <span className="font-semibold">{analytics.newRegistrations}</span>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Upload Tasks
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Reports
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Activity className="h-4 w-4 mr-2" />
                      System Health Check
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
            <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        onCreateTask={handleCreateTask}
      />
      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskAction={handleTaskAction}
      />

      {/* KYC Details Modal */}
      {isKycModalOpen && selectedKycRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">KYC Request Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsKycModalOpen(false)}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* User Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm">{selectedKycRequest.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{selectedKycRequest.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm">{selectedKycRequest.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submitted Date</label>
                    <p className="text-sm">{selectedKycRequest.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Verification Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedKycRequest.kycVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">KYC Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedKycRequest.isVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">Account Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedKycRequest.mobileVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">Mobile Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedKycRequest.paymentSetup ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">Payment Setup</span>
                  </div>
                </div>
              </div>

              {/* Documents Submitted */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Documents Submitted</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedKycRequest.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                <div className="space-y-2">
                  {selectedKycRequest.upiId && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">UPI ID</label>
                      <p className="text-sm">{selectedKycRequest.upiId}</p>
                    </div>
                  )}
                  {selectedKycRequest.bankAccount && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bank Account</label>
                      <p className="text-sm">{selectedKycRequest.bankAccount}</p>
                    </div>
                  )}
                  {!selectedKycRequest.upiId && !selectedKycRequest.bankAccount && (
                    <p className="text-sm text-gray-500">No payment method configured</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve KYC
                </Button>
                <Button variant="outline" className="text-red-600">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject KYC
                </Button>
                <Button variant="outline" onClick={() => setIsKycModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
