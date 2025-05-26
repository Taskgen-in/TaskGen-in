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
  console.log('Admin Task Action:', { taskId, action });
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

  const adminStats = {
    totalUsers: 12450,
    activeUsers: 8920,
    totalTasks: 2340,
    activeTasks: 156,
    totalPayouts: 2450000,
    pendingPayouts: 45000,
    completionRate: 87,
    avgTaskTime: 18,
  }

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

  const kycRequests = [
    {
      id: 1,
      userName: "Rajesh Gupta",
      email: "rajesh.gupta@email.com",
      submittedDate: "2024-01-16",
      documents: ["Aadhaar", "PAN", "Selfie"],
      upiId: "rajesh@paytm",
      status: "pending",
    },
    {
      id: 2,
      userName: "Kavya Reddy",
      email: "kavya.reddy@email.com",
      submittedDate: "2024-01-15",
      documents: ["Aadhaar", "PAN", "Selfie"],
      bankAccount: "****5678 - HDFC",
      status: "pending",
    },
    {
      id: 3,
      userName: "Arjun Mehta",
      email: "arjun.mehta@email.com",
      submittedDate: "2024-01-14",
      documents: ["Aadhaar", "PAN"],
      upiId: "arjun@gpay",
      status: "incomplete",
    },
  ]

  const withdrawalRequests = [
    {
      id: 1,
      userName: "Rahul Kumar",
      amount: 2500,
      method: "UPI",
      details: "rahul@paytm",
      requestDate: "2024-01-16",
      status: "pending",
    },
    {
      id: 2,
      userName: "Priya Sharma",
      amount: 1800,
      method: "Bank Transfer",
      details: "****1234 - SBI",
      requestDate: "2024-01-15",
      status: "processing",
    },
    {
      id: 3,
      userName: "Sneha Patel",
      amount: 3200,
      method: "UPI",
      details: "sneha@phonepe",
      requestDate: "2024-01-14",
      status: "completed",
    },
  ]

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
          {/* Admin Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-green-600">+{adminStats.activeUsers.toLocaleString()} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <Target className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalTasks.toLocaleString()}</div>
                <p className="text-xs text-blue-600">{adminStats.activeTasks} currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(adminStats.totalPayouts / 100000).toFixed(1)}L</div>
                <p className="text-xs text-orange-600">₹{(adminStats.pendingPayouts / 1000).toFixed(0)}K pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.completionRate}%</div>
                <p className="text-xs text-gray-600">Avg time: {adminStats.avgTaskTime}min</p>
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
                        {kycRequests.map((request) => (
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
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
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
                        {withdrawalRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div className="font-medium">{request.userName}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-green-600">₹{request.amount.toLocaleString()}</div>
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
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Daily Active Users</span>
                        <span className="font-semibold">2,340</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tasks Completed Today</span>
                        <span className="font-semibold">456</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Revenue Today</span>
                        <span className="font-semibold text-green-600">₹23,400</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>New Registrations</span>
                        <span className="font-semibold">89</span>
                      </div>
                    </div>
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
              </div>
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
    </div>
  )
}
