"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"

interface PhotosStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export function PhotosStep({ formData, updateFormData, onNext, onPrev }: PhotosStepProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newPhotos = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    updateFormData({ photos: [...(formData.photos || []), ...newPhotos] })
  }

  const removePhoto = (photoId: string) => {
    const updatedPhotos = formData.photos?.filter((photo: any) => photo.id !== photoId) || []
    updateFormData({ photos: updatedPhotos })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-heading font-semibold text-lg mb-2">Add Photos</h3>
        <p className="text-muted-foreground">
          Great photos help your listing stand out. Add up to 10 photos of your room and property.
        </p>
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">Drag and drop photos here</h3>
          <p className="text-sm text-muted-foreground mb-4">or</p>
          <Label htmlFor="photo-upload" className="cursor-pointer">
            <Button type="button" variant="outline" asChild>
              <span>Choose Files</span>
            </Button>
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </Label>
          <p className="text-xs text-muted-foreground mt-2">Supported formats: JPG, PNG, GIF (max 5MB each)</p>
        </CardContent>
      </Card>

      {/* Photo Preview Grid */}
      {formData.photos?.length > 0 && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Uploaded Photos ({formData.photos.length}/10)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.photos.map((photo: any, index: number) => (
              <Card key={photo.id} className="relative group">
                <CardContent className="p-2">
                  <div className="aspect-square relative overflow-hidden rounded-md">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" size="sm" variant="destructive" onClick={() => removePhoto(photo.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Main Photo
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            The first photo will be used as your main listing image. Drag to reorder.
          </p>
        </div>
      )}

      {/* Photo Tips */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium mb-2">Photo Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Take photos in good lighting (natural light works best)</li>
                <li>• Show the room from different angles</li>
                <li>• Include photos of shared spaces (kitchen, living room, bathroom)</li>
                <li>• Keep photos recent and accurate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  )
}
