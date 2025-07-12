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
import { Plus, X, Upload, FileText, ImageIcon, Video, CheckCircle, Trash2, Image } from 'lucide-react'
import { useEffect } from "react"

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask: (taskData: any) => Promise<{ id: string } | undefined>
}

interface Question {
  id: string
  question: string
  type: "text" | "multiple-choice" | "image-annotation" | "image-comparison"
  options: string[]
  images: Array<{
    id: number
    name: string
    size: number
    type: string
    url: string
  }>
}

interface TaskData {
  title: string
  description: string
  category: string
  difficulty: string
  payout: string
  maxParticipants: string
  timeLimit: string
  deadline: string
  requirements: string[]
  instructions: string[]
  tags: string[]
  estimatedTime: string
  qualityStandards: string
  questions: Question[]
}

interface Errors {
  [key: string]: string
}

interface MediaFile {
  id: number
  name: string
  size: number
  type: string
  url: string
  file?: File
  isTemp?: boolean
}

interface MediaFiles {
  videos: MediaFile[]
  images: MediaFile[]
  documents: MediaFile[]
}

export function CreateTaskModal({ isOpen, onClose, onCreateTask }: CreateTaskModalProps) {
  const [currentTab, setCurrentTab] = useState("basic")
  const [taskData, setTaskData] = useState<TaskData>({
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
    questions: [
      {
        id: "1",
        question: "",
        type: "text",
        options: [""],
        images: []
      }
    ]
  })

  const [mediaFiles, setMediaFiles] = useState<MediaFiles>({
    videos: [],
    images: [],
    documents: [],
  })

  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState<Errors>({})

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

  const questionTypes = [
    { value: "text", label: "Text Input" },
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "image-annotation", label: "Image Annotation" },
    { value: "image-comparison", label: "Image Comparison" }
  ]

  const handleInputChange = (field: keyof TaskData, value: string) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleArrayChange = (field: "requirements" | "instructions", index: number, value: string) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "requirements" | "instructions") => {
    setTaskData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "requirements" | "instructions", index: number) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index),
    }))
  }

  // Question handlers
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      type: "text",
      options: [""],
      images: []
    }
    setTaskData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
  }

  const removeQuestion = (questionId: string) => {
    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }))
  }

  const handleQuestionChange = (questionId: string, field: keyof Question, value: string | string[]) => {
    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, [field]: value }
          : q
      )
    }))
  }

  const addOption = (questionId: string) => {
    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: [...q.options, ""] }
          : q
      )
    }))
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q
      )
    }))
  }

  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options.map((opt, i) => i === optionIndex ? value : opt)
            }
          : q
      )
    }))
  }

  // Question image handlers
  const handleQuestionImageUpload = async (questionId: string, files: FileList | null) => {
    if (!files) return

    const uploadPromises = Array.from(files).map(async (file) => {
      const url = await uploadToLocal(file, "question")
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url,
      }
    })

    const newFiles = await Promise.all(uploadPromises)

    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, images: [...q.images, ...newFiles] }
          : q
      )
    }))
  }

  const removeQuestionImage = (questionId: string, imageId: number) => {
    setTaskData((prev) => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, images: q.images.filter(img => img.id !== imageId) }
          : q
      )
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

  // --- ASYNC FILE UPLOAD ---
  const handleMediaUpload = async (type: keyof MediaFiles, files: FileList | null) => {
    if (!files) return

    const uploadPromises = Array.from(files).map(async (file) => {
      // For media uploads in the Media tab, we'll store them temporarily
      // and upload them later when the task is created
      const tempUrl = URL.createObjectURL(file)
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: tempUrl,
        file: file, // Keep the file object for later upload
        isTemp: true
      }
    })

    const newFiles = await Promise.all(uploadPromises)

    setMediaFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }))
  }

  async function uploadToLocal(file: File, uploadType: string = "question", taskId?: string): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("uploadType", uploadType)
    
    if (taskId) {
      formData.append("taskId", taskId)
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        console.error("Upload failed:", data)
        throw new Error(data.error || data.message || `Upload failed with status ${res.status}`)
      }
      return data.url
    } catch (error) {
      console.error("Upload error:", error)
      throw new Error(`Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // ----

  const removeMediaFile = (type: keyof MediaFiles, fileId: number) => {
    setMediaFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((file) => file.id !== fileId),
    }))
  }

  const validateForm = () => {
    const newErrors: Errors = {}

    if (!taskData.title.trim()) newErrors.title = "Title is required"
    if (!taskData.description.trim()) newErrors.description = "Description is required"
    if (!taskData.category) newErrors.category = "Category is required"
    if (!taskData.difficulty) newErrors.difficulty = "Difficulty is required"
    if (!taskData.payout || parseFloat(taskData.payout) <= 0) newErrors.payout = "Valid payout is required"
    if (!taskData.maxParticipants || parseInt(taskData.maxParticipants) <= 0)
      newErrors.maxParticipants = "Valid participant limit is required"
    if (!taskData.timeLimit || parseInt(taskData.timeLimit) <= 0) newErrors.timeLimit = "Valid time limit is required"
    if (!taskData.deadline) newErrors.deadline = "Deadline is required"
    if (taskData.deadline && new Date(taskData.deadline) <= new Date()) {
      newErrors.deadline = "Deadline must be in the future"
    }

    // Validate questions
    taskData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question-${index}`] = "Question text is required"
      }
      if (question.type === "multiple-choice" && question.options.length < 2) {
        newErrors[`question-${index}-options`] = "Multiple choice questions need at least 2 options"
      }
      if ((question.type === "image-annotation" || question.type === "image-comparison") && question.images.length === 0) {
        newErrors[`question-${index}-images`] = "Image questions require at least one image"
      }
      if (question.type === "image-comparison" && question.images.length < 2) {
        newErrors[`question-${index}-images`] = "Image comparison questions need at least 2 images"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      // First, create the task to get the task ID
      const taskDataToSubmit = {
        ...taskData,
        payout: parseFloat(taskData.payout),
        maxParticipants: parseInt(taskData.maxParticipants),
        timeLimit: parseInt(taskData.timeLimit),
        requirements: taskData.requirements.filter((req) => req.trim()),
        instructions: taskData.instructions.filter((inst) => inst.trim()),
        questions: taskData.questions.filter(q => q.question.trim())
      }

      // Call the onCreateTask function to create the task
      const result = await onCreateTask(taskDataToSubmit)
      
      // If we have a task ID and media files, upload them with the task ID
      if (result && 'id' in result && (mediaFiles.videos.length > 0 || mediaFiles.images.length > 0 || mediaFiles.documents.length > 0)) {
        await uploadMediaWithTaskId(result.id as string)
      }

      onClose()
      resetForm()
    } catch (error) {
      console.error("Error creating task:", error)
      // You might want to show an error message to the user here
    }
  }

  const uploadMediaWithTaskId = async (taskId: string) => {
    const uploadPromises: Promise<any>[] = []

    // Upload videos
    mediaFiles.videos.forEach(file => {
      if ((file as any).isTemp && (file as any).file) {
        uploadPromises.push(
          uploadToLocal((file as any).file, "description", taskId)
        )
      }
    })

    // Upload images
    mediaFiles.images.forEach(file => {
      if ((file as any).isTemp && (file as any).file) {
        uploadPromises.push(
          uploadToLocal((file as any).file, "description", taskId)
        )
      }
    })

    // Upload documents
    mediaFiles.documents.forEach(file => {
      if ((file as any).isTemp && (file as any).file) {
        uploadPromises.push(
          uploadToLocal((file as any).file, "instruction", taskId)
        )
      }
    })

    try {
      await Promise.all(uploadPromises)
      console.log("All media files uploaded successfully")
    } catch (error) {
      console.error("Error uploading media files:", error)
    }
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
      questions: [
        {
          id: "1",
          question: "",
          type: "text",
          options: [""],
          images: []
        }
      ]
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
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

          <TabsContent value="questions" className="space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Task Questions</h3>
                <Button onClick={addQuestion} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {taskData.questions.map((question, questionIndex) => (
                <Card key={question.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Question {questionIndex + 1}</h4>
                      {taskData.questions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Question Text */}
                      <div>
                        <Label>Question Text *</Label>
                        <Textarea
                          value={question.question}
                          onChange={(e) => handleQuestionChange(question.id, "question", e.target.value)}
                          placeholder="Enter your question"
                          className={errors[`question-${questionIndex}`] ? "border-red-500" : ""}
                        />
                        {errors[`question-${questionIndex}`] && (
                          <p className="text-sm text-red-600 mt-1">{errors[`question-${questionIndex}`]}</p>
                        )}
                      </div>

                      {/* Question Type */}
                      <div>
                        <Label>Question Type</Label>
                        <Select 
                          value={question.type} 
                          onValueChange={(value) => handleQuestionChange(question.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {questionTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Options for Multiple Choice */}
                      {(question.type === "multiple-choice" || question.type === "image-comparison") && (
                        <div>
                          <Label>Options</Label>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                {question.options.length > 1 && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeOption(question.id, optionIndex)}
                                    className="text-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(question.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Option
                            </Button>
                          </div>
                          {errors[`question-${questionIndex}-options`] && (
                            <p className="text-sm text-red-600 mt-1">{errors[`question-${questionIndex}-options`]}</p>
                          )}
                        </div>
                      )}

                      {/* Images for Image-based questions */}
                      {(question.type === "image-annotation" || question.type === "image-comparison") && (
                        <div>
                          <Label>Question Images *</Label>
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleQuestionImageUpload(question.id, e.target.files)}
                                className="hidden"
                                id={`image-upload-${question.id}`}
                              />
                              <label htmlFor={`image-upload-${question.id}`} className="cursor-pointer block">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600 font-medium">Click to upload images for this question</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {question.type === "image-comparison" 
                                    ? "Upload multiple images for comparison" 
                                    : "Upload images for annotation"
                                  }
                                </p>
                              </label>
                            </div>
                            
                            {question.images.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Uploaded Images ({question.images.length}):
                                </p>
                                {question.images.map((image, imageIndex) => (
                                  <div key={image.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                        <span className="text-xs font-medium text-blue-600">{imageIndex + 1}</span>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">{image.name}</p>
                                        <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeQuestionImage(question.id, image.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {question.images.length === 0 && (
                              <div className="text-center py-4 text-gray-500">
                                <Image className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No images uploaded yet</p>
                              </div>
                            )}
                            
                            {errors[`question-${questionIndex}-images`] && (
                              <p className="text-sm text-red-600 mt-1">{errors[`question-${questionIndex}-images`]}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
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
                          <span className="text-gray-600">Questions:</span>
                          <span className="ml-2">{taskData.questions.filter(q => q.question.trim()).length} questions</span>
                        </div>
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

                {taskData.questions.filter(q => q.question.trim()).length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Questions Preview</h4>
                    <div className="space-y-3">
                      {taskData.questions.filter(q => q.question.trim()).map((question, index) => (
                        <div key={question.id} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">Question {index + 1}</span>
                            <Badge variant="secondary">{question.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{question.question}</p>
                          {question.options.length > 0 && question.options[0] && (
                            <div className="text-xs text-gray-500">
                              Options: {question.options.filter(opt => opt.trim()).length} available
                            </div>
                          )}
                          {question.images.length > 0 && (
                            <div className="text-xs text-gray-500">
                              Images: {question.images.length} attached
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
                  const tabs = ["basic", "questions", "details", "media", "review"]
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
                  const tabs = ["basic", "questions", "details", "media", "review"]
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
