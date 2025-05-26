"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Star,
  Users,
  Calendar,
  CheckCircle,
  Target,
  AlertCircle,
  X,
  Play,
  ImageIcon,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

interface TaskDetailModalProps {
  task: any
  isOpen: boolean
  onClose: () => void
  onTaskAction: (taskId: number, action: string) => void
}

export function TaskDetailModal({ task, isOpen, onClose, onTaskAction }: TaskDetailModalProps) {
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)



  if (!task) return null

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()

    if (diff <= 0) return "Expired"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m left`
    }
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

  const availability = getTaskAvailability(task)
  const timeRemaining = getTimeRemaining(task.expiresAt)
  const participationRate = Math.round((task.currentParticipants / task.maxParticipants) * 100)

  // Enhanced task data with media content
  const taskRequirements = [
    "Must have a stable internet connection",
    "Complete all required fields accurately",
    "Submit work before the deadline",
    "Maintain quality standards as specified",
    "Follow all platform guidelines",
  ]

  const taskInstructions = [
    "Read the task description carefully",
    "Review all provided materials",
    "Complete the task within the time limit",
    "Double-check your work before submission",
    "Contact support if you need help",
  ]

  // Sample media content for different task types
  const getTaskMedia = (taskId: number, category: string) => {
    const baseMedia = {
      videos: [
        {
          id: 1,
          title: "Task Overview Tutorial",
          description: "Complete walkthrough of the task requirements",
          thumbnail: "/placeholder.svg?height=120&width=200",
          duration: "3:45",
          url: "#",
          type: "tutorial",
        },
        {
          id: 2,
          title: "Step-by-Step Guide",
          description: "Detailed instructions for each step",
          thumbnail: "/placeholder.svg?height=120&width=200",
          duration: "7:22",
          url: "#",
          type: "guide",
        },
      ],
      images: [
        {
          id: 1,
          title: "Example Output",
          description: "Sample of expected work quality",
          url: "/placeholder.svg?height=300&width=400",
          type: "example",
        },
        {
          id: 2,
          title: "Interface Screenshot",
          description: "Platform interface you'll be working with",
          url: "/placeholder.svg?height=300&width=400",
          type: "interface",
        },
        {
          id: 3,
          title: "Quality Standards",
          description: "Visual guide to quality requirements",
          url: "/placeholder.svg?height=300&width=400",
          type: "standards",
        },
      ],
      documents: [
        {
          id: 1,
          title: "Detailed Instructions PDF",
          description: "Comprehensive task guidelines",
          size: "2.4 MB",
          type: "pdf",
          url: "#",
        },
        {
          id: 2,
          title: "Quality Checklist",
          description: "Checklist to ensure work quality",
          size: "1.1 MB",
          type: "pdf",
          url: "#",
        },
      ],
    }

    // Customize media based on task category
    if (category === "AI Training") {
      baseMedia.videos.push({
        id: 3,
        title: "AI Labeling Best Practices",
        description: "How to label data for machine learning",
        thumbnail: "/placeholder.svg?height=120&width=200",
        duration: "5:18",
        url: "#",
        type: "training",
      })
      baseMedia.images.push({
        id: 4,
        title: "Labeling Examples",
        description: "Correct vs incorrect labeling examples",
        url: "/placeholder.svg?height=300&width=400",
        type: "examples",
      })
    }

    if (category === "Survey") {
      baseMedia.videos.push({
        id: 3,
        title: "Survey Completion Tips",
        description: "How to provide quality survey responses",
        thumbnail: "/placeholder.svg?height=120&width=200",
        duration: "4:12",
        url: "#",
        type: "tips",
      })
    }

    if (category === "Translation") {
      baseMedia.documents.push({
        id: 3,
        title: "Translation Guidelines",
        description: "Style guide and cultural considerations",
        size: "3.2 MB",
        type: "pdf",
        url: "#",
      })
    }

    return baseMedia
  }

  const taskMedia = getTaskMedia(task.id, task.category)

  const MediaViewer = ({ media }: { media: any }) => {
    if (!media) return null

    return (
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{media.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {media.type === "video" ? (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4" />
                    <p>Video Player Placeholder</p>
                    <p className="text-sm opacity-75">Duration: {media.duration}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt={media.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <p className="text-gray-600">{media.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-xl font-bold mb-2">{task.title}</DialogTitle>
                <div className="flex flex-wrap items-center gap-2 mb-4">
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
                  <Badge className={`text-xs ${getDifficultyColor(task.difficulty)}`}>{task.difficulty}</Badge>
                  {task.isParticipating && (
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      Joined {new Date(task.participatedAt!).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Task Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Task Description</h3>
                    <p className="text-gray-600 leading-relaxed">{task.description}</p>
                  </div>

                  {/* Task Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {taskRequirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                    <ol className="space-y-2">
                      {taskInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-gray-600">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tutorial Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {taskMedia.videos.map((video) => (
                        <div
                          key={video.id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedMedia({ ...video, type: "video" })}
                        >
                          <div className="relative">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              width={200}
                              height={120}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium mb-1">{video.title}</h4>
                            <p className="text-sm text-gray-600">{video.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {video.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Reference Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {taskMedia.images.map((image) => (
                        <div
                          key={image.id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedMedia(image)}
                        >
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-3">
                            <h4 className="font-medium mb-1">{image.title}</h4>
                            <p className="text-sm text-gray-600">{image.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {image.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Documentation</h3>
                    <div className="space-y-3">
                      {taskMedia.documents.map((doc) => (
                        <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-red-600" />
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">{doc.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>PDF Document</span>
                                  <span>{doc.size}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-6">
                  {/* Participant Progress */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Participation Progress</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Participants</span>
                        <span className="font-medium">
                          {task.currentParticipants}/{task.maxParticipants}
                        </span>
                      </div>
                      <Progress value={participationRate} className="h-3" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{participationRate}% filled</span>
                        <span>{task.maxParticipants - task.currentParticipants} slots remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Time Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Deadline</span>
                        </div>
                        <span className={`text-sm ${availability === "expired" ? "text-red-600" : "text-gray-600"}`}>
                          {availability === "expired" ? "Expired" : timeRemaining}
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Time Limit</span>
                        </div>
                        <span className="text-sm text-gray-600">{task.timeLimit} hours to complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Task Statistics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Task Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{task.currentParticipants}</div>
                        <div className="text-sm text-gray-600">Active Participants</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{task.completed || 0}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payout Information */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹{task.payout}</div>
                  <div className="text-sm text-gray-600">Task Payout</div>
                </div>
              </div>

              {/* Quick Media Access */}
              <div className="space-y-3">
                <h4 className="font-semibold">Quick Access</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Tutorial ({taskMedia.videos.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    View Examples ({taskMedia.images.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Docs ({taskMedia.documents.length})
                  </Button>
                </div>
              </div>

              {/* Task Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Estimated Time</span>
                  </div>
                  <span className="text-sm font-medium">{task.timeEstimate}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Difficulty</span>
                  </div>
                  <span className={`text-sm font-medium ${getDifficultyColor(task.difficulty)}`}>
                    {task.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Participants</span>
                  </div>
                  <span className="text-sm font-medium">
                    {task.currentParticipants}/{task.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Category</span>
                  </div>
                  <span className="text-sm font-medium">{task.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {availability === "available" ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      onTaskAction(task.id, "participate")
                      onClose()
                    }}
                  >
                    Join Task
                  </Button>
                ) : availability === "participating" ? (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        onTaskAction(task.id, "continue")
                        onClose()
                      }}
                    >
                      Continue Task
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        onTaskAction(task.id, "submit")
                        onClose()
                      }}
                    >
                      Submit Work
                    </Button>
                  </div>
                ) : availability === "full" ? (
                  <Button variant="outline" disabled className="w-full">
                    Task Full
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="w-full">
                    Task Expired
                  </Button>
                )}
              </div>

              {/* Warning Messages */}
              {availability === "expired" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-red-800">Task Expired</div>
                      <div className="text-xs text-red-600">This task is no longer available</div>
                    </div>
                  </div>
                </div>
              )}

              {availability === "full" && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-orange-800">Task Full</div>
                      <div className="text-xs text-orange-600">Maximum participants reached</div>
                    </div>
                  </div>
                </div>
              )}

              {task.isParticipating && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-800">You're Participating</div>
                      <div className="text-xs text-blue-600">Complete within {task.timeLimit} hours</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <MediaViewer media={selectedMedia} />
    </>
  )
}
