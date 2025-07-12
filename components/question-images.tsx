"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Image, Eye } from "lucide-react"
import { ImageViewer } from "./image-viewer"

interface QuestionImagesProps {
  images: string[]
  questionText?: string
}

export function QuestionImages({ images, questionText }: QuestionImagesProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setViewerOpen(true)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Image className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Question Images ({images.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleImageClick(0)}
          className="ml-auto text-blue-600 hover:text-blue-700"
        >
          <Eye className="h-4 w-4 mr-1" />
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="relative group cursor-pointer rounded-lg overflow-hidden border hover:border-blue-300 transition-colors"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={imageUrl}
              alt={`Question image ${index + 1}`}
              className="w-full h-24 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder-image.png"
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      <ImageViewer
        images={images}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        initialIndex={selectedIndex}
      />
    </div>
  )
} 