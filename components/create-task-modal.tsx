"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Upload, FileText, ImageIcon, Video, Calendar, Clock, Users, DollarSign, Target, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask: (taskData: any) => void
}

export function CreateTaskModal({ isOpen, onClose, onCreateTask }: CreateTaskModalProps) {
  const [currentTab, setCurrentTab] = useState("basic")
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    payout: "",
    maxParticipants: "",
    timeLimit: "",
    deadline: "",
    requirements: [""],
    instructions: [""],
    tags: [],
    estimatedTime: "",
    qualityStandards: "",
  })

  const [mediaFiles, setMediaFiles] = useState({
    videos: [],
    images: [],
    documents: [],
  })

  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState({})

  const categories = [
    "Survey",
    "AI Training",
    "Content Review",
    "Translation",
    "Data Entry",
    "Image Annotation",
    "Audio Transcription",
    "Content Writing",
    "Quality Assurance",
    "Research",
  ]

  const difficulties = ["Easy", "Medium", "Hard"]

  const handleInputChange = (field: string, value: string) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: string) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !taskData.tags.includes(newTag.trim())) {
      setTaskData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTaskData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleMediaUpload = (type: string, files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      url: URL.createObjectURL(file),
    }))

    setMediaFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }))
  }

  const removeMediaFile = (type: string, fileId: number) => {
    setMediaFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((file) => file.id !== fileId),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!taskData.title.trim()) newErrors.title = "Title is required"
    if (!taskData.description.trim()) newErrors.description = "Description is required"
    if (!taskData.category) newErrors.category = "Category is required"
    if (!taskData.difficulty) newErrors.difficulty = "Difficulty is required"
    if (!taskData.payout || parseFloat(taskData.payout) <= 0) newErrors.payout = "Valid payout is required"
    if (!taskData.maxParticipants || parseInt(taskData.maxParticipants) <= 0)
      newErrors.maxParticipants = "Valid participant limit is required"
    if (!taskData.timeLimit || parseInt(taskData.timeLimit) <= 0) newErrors.timeLimit = "Valid time limit is required"
    if (!taskData.deadline) newErrors.deadline = "Deadline is required"

    // Check if deadline is in the future
    if (taskData.deadline && new Date(taskData.deadline) <= new Date()) {
      newErrors.deadline = "Deadline must be in the future"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const newTask = {
      id: Date.now(),
      ...taskData,
      payout: parseFloat(taskData.payout),
      maxParticipants: parseInt(taskData.maxParticipants),
      timeLimit: parseInt(taskData.timeLimit),
      currentParticipants: 0,
      status: "active",
      createdDate: new Date().toISOString().split("T")[0],
      expiresAt: new Date(taskData.deadline + "T23:59:59Z").toISOString(),
      media: mediaFiles,
      requirements: taskData.requirements.filter((req) => req.trim()),
      instructions: taskData.instructions.filter((inst) => inst.trim()),
    }

    onCreateTask(newTask)
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setTaskData({
      title: "",
      description: "",
      category: "",
      difficulty: "",
      payout: "",
      maxParticipants: "",
      timeLimit: "",
      deadline: "",
      requirements: [""],
      instructions: [""],
      tags: [],
      estimatedTime: "",
      qualityStandards: "",
    })
    setMediaFiles({
      videos: [],
      images: [],
      documents: [],
    })
    setErrors({})
    setCurrentTab("basic")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Task</DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    value={taskData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter task title"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={taskData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select value={taskData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                    <SelectTrigger className={errors.difficulty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.difficulty && <p className="text-sm text-red-600 mt-1">{errors.difficulty}</p>}
                </div>

                <div>
                  <Label htmlFor="estimatedTime">Estimated Time</Label>
                  <Input
                    id="estimatedTime"
                    value={taskData.estimatedTime}
                    onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                    placeholder="e.g., 30 minutes"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="payout">Payout (₹) *</Label>
                  <Input
                    id="payout"
                    type="number"
                    value={taskData.payout}
                    onChange={(e) => handleInputChange("payout", e.target.value)}
                    placeholder="Enter payout amount"
                    className={errors.payout ? "border-red-500" : ""}
                  />
                  {errors.payout && <p className="text-sm text-red-600 mt-1">{errors.payout}</p>}
                </div>

                <div>
                  <Label htmlFor="maxParticipants">Max Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={taskData.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                    placeholder="Enter participant limit"
                    className={errors.maxParticipants ? "border-red-500" : ""}
                  />
                  {errors.maxParticipants && <p className="text-sm text-red-600 mt-1">{errors.maxParticipants}</p>}
                </div>

                <div>
                  <Label htmlFor="timeLimit">Time Limit (hours) *</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={taskData.timeLimit}
                    onChange={(e) => handleInputChange("timeLimit", e.target.value)}
                    placeholder="Enter time limit"
                    className={errors.timeLimit ? "border-red-500" : ""}
                  />
                  {errors.timeLimit && <p className="text-sm text-red-600 mt-1">{errors.timeLimit}</p>}
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={taskData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className={errors.deadline ? "border-red-500" : ""}
                  />
                  {errors.deadline && <p className="text-sm text-red-600 mt-1">{errors.deadline}</p>}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Task Description *</Label>
              <Textarea
                id="description"
                value={taskData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Provide a detailed description of the task"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="space-y-6">
              {/* Requirements */}
              <div>
                <Label>Task Requirements</Label>
                <div className="space-y-2 mt-2">
                  {taskData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {taskData.requirements.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("requirements", index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("requirements")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <Label>Task Instructions</Label>
                <div className="space-y-2 mt-2">
                  {taskData.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={instruction}
                        onChange={(e) => handleArrayChange("instructions", index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                      />
                      {taskData.instructions.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("instructions", index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("instructions")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instruction
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button variant="outline" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {taskData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {taskData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quality Standards */}
              <div>
                <Label htmlFor="qualityStandards">Quality Standards</Label>
                <Textarea
                  id="qualityStandards"
                  value={taskData.qualityStandards}
                  onChange={(e) => handleInputChange("qualityStandards", e.target.value)}
                  placeholder="Describe the quality standards and expectations"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Tutorial Videos
                  </CardTitle>
                  <CardDescription>Upload instructional videos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleMediaUpload("videos", e.target.files)}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload videos</p>
                      </label>
                    </div>
                    {mediaFiles.videos.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMediaFile("videos", file.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Reference Images
                  </CardTitle>
                  <CardDescription>Upload example images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleMediaUpload("images", e.target.files)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload images</p>
                      </label>
                    </div>
                    {mediaFiles.images.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMediaFile("images", file.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                  <CardDescription>Upload PDFs and guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        onChange={(e) => handleMediaUpload("documents", e.target.files)}
                        className="hidden"
                        id="document-upload"
                      />
                      <label htmlFor="document-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload documents</p>
                      </label>
                    </div>
                    {mediaFiles.documents.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMediaFile("documents", file.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Preview</CardTitle>
                <CardDescription>Review your task before publishing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Title:</span>
                          <span>{taskData.title || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span>{taskData.category || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span>{taskData.difficulty || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payout:</span>
                          <span className="text-green-600 font-semibold">
                            {taskData.payout ? `₹${taskData.payout}` : "Not set"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Limits & Timing</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Max Participants:</span>
                          <span>{taskData.maxParticipants || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Limit:</span>
                          <span>{taskData.timeLimit ? `${taskData.timeLimit} hours` : "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deadline:</span>
                          <span>{taskData.deadline || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated Time:</span>
                          <span>{taskData.estimatedTime || "Not specified"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Content</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Requirements:</span>
                          <span className="ml-2">{taskData.requirements.filter((r) => r.trim()).length} items</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Instructions:</span>
                          <span className="ml-2">{taskData.instructions.filter((i) => i.trim()).length} steps</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tags:</span>
                          <span className="ml-2">{taskData.tags.length} tags</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Media Files</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Videos:</span>
                          <span>{mediaFiles.videos.length} files</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Images:</span>
                          <span>{mediaFiles.images.length} files</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Documents:</span>
                          <span>{mediaFiles.documents.length} files</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {taskData.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{taskData.description}</p>
                  </div>
                )}

                {taskData.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {taskData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {currentTab !== "basic" && (
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ["basic", "details", "media", "review"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex > 0) {
                    setCurrentTab(tabs[currentIndex - 1])
                  }
                }}
              >
                Previous
              </Button>
            )}
            {currentTab !== "review" ? (
              <Button
                onClick={() => {
                  const tabs = ["basic", "details", "media", "review"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex < tabs.length - 1) {
                    setCurrentTab(tabs[currentIndex + 1])
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
