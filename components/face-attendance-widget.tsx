"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { Camera, CheckCircle, AlertCircle } from "lucide-react"

interface FaceAttendanceWidgetProps {
  onAttendanceMarked?: (status: "success" | "failed") => void
}

export function FaceAttendanceWidget({ onAttendanceMarked }: FaceAttendanceWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "capturing" | "processing" | "success" | "failed">("idle")
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null)

  const handleStartCapture = async () => {
    setStatus("capturing")
    // Simulate camera capture
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus("processing")
    // Simulate Python AI face recognition module call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulated confidence score (>0.85 = success)
    const score = Math.random() * (1 - 0.7) + 0.7
    setConfidenceScore(score)

    if (score > 0.85) {
      setStatus("success")
      onAttendanceMarked?.("success")
      setTimeout(() => {
        setIsModalOpen(false)
        resetModal()
      }, 2000)
    } else {
      setStatus("failed")
      onAttendanceMarked?.("failed")
    }
  }

  const resetModal = () => {
    setStatus("idle")
    setConfidenceScore(null)
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Face Recognition Attendance</h3>
            <p className="mt-1 text-sm text-muted-foreground">Mark your attendance using face recognition</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Camera className="h-4 w-4" />
            Start Verification
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          resetModal()
        }}
        title="AI Face Verification"
      >
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          {status === "idle" && (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-primary/10">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Click the button below to start face capture. Position your face in the center of the camera frame.
              </p>
              <Button onClick={handleStartCapture} className="w-full mt-4">
                Start Capture
              </Button>
            </>
          )}

          {status === "capturing" && (
            <>
              <div className="flex h-32 w-32 items-center justify-center rounded-lg border-4 border-primary bg-muted">
                <Camera className="h-12 w-12 text-primary animate-pulse" />
              </div>
              <p className="text-center text-sm text-muted-foreground">Capturing your face...</p>
              <p className="text-center text-xs text-muted-foreground">Keep your face steady</p>
            </>
          )}

          {status === "processing" && (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-blue-100">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              </div>
              <p className="text-center text-sm text-muted-foreground">AI Verification in progress...</p>
              <p className="text-center text-xs text-muted-foreground">Using Python face recognition module</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-green-600">Verification Successful!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Confidence Score: {(confidenceScore! * 100).toFixed(1)}%
                </p>
              </div>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-red-100">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-red-600">Verification Failed</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Confidence Score: {(confidenceScore! * 100).toFixed(1)}%
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Please try again with better lighting</p>
              </div>
              <Button onClick={handleStartCapture} className="w-full mt-4">
                Retry
              </Button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
