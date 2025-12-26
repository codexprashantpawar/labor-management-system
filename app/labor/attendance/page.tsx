"use client"

import { useState } from "react"
import { LaborLayout } from "@/layouts/labor-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Camera, CheckCircle, Clock } from "lucide-react"
import { FaceAttendanceWidget } from "@/components/face-attendance-widget"
import { WhatsAppModule } from "@/components/whatsapp-module"

interface Attendance {
  id: string
  date: string
  inTime: string
  outTime: string
  hoursWorked: number
  status: "Present" | "Absent" | "Late"
  verified: boolean
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([
    {
      id: "1",
      date: "2025-01-23",
      inTime: "6:05 AM",
      outTime: "2:00 PM",
      hoursWorked: 8,
      status: "Present",
      verified: true,
    },
    {
      id: "2",
      date: "2025-01-22",
      inTime: "6:20 AM",
      outTime: "2:00 PM",
      hoursWorked: 8,
      status: "Late",
      verified: true,
    },
    {
      id: "3",
      date: "2025-01-21",
      inTime: "6:00 AM",
      outTime: "2:00 PM",
      hoursWorked: 8,
      status: "Present",
      verified: true,
    },
  ])

  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false)
  const [faceVerificationStatus, setFaceVerificationStatus] = useState<"idle" | "verifying" | "verified" | "failed">(
    "idle",
  )

  const handleFaceVerification = async () => {
    setFaceVerificationStatus("verifying")
    // Simulate face recognition API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setFaceVerificationStatus("verified")

    setTimeout(() => {
      setIsFaceModalOpen(false)
      setFaceVerificationStatus("idle")
    }, 1500)
  }

  return (
    <LaborLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="mt-2 text-muted-foreground">View your attendance records and mark attendance.</p>
          </div>
          <Button onClick={() => setIsFaceModalOpen(true)} className="gap-2">
            <Camera className="h-4 w-4" />
            Mark Attendance (Face Recognition)
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Present Days</p>
            <p className="mt-2 text-3xl font-bold text-green-600">18</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Absent Days</p>
            <p className="mt-2 text-3xl font-bold text-red-600">1</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
            <p className="mt-2 text-3xl font-bold text-foreground">94.7%</p>
            <p className="mt-1 text-xs text-muted-foreground">Excellent</p>
          </Card>
        </div>

        <FaceAttendanceWidget
          onAttendanceMarked={(status) => {
            if (status === "success") {
              console.log("Attendance marked successfully")
            }
          }}
        />

        <WhatsAppModule />

        <Card className="p-6">
          <DataTable<Attendance>
            columns={[
              { key: "date", label: "Date" },
              { key: "inTime", label: "In Time" },
              { key: "outTime", label: "Out Time" },
              { key: "hoursWorked", label: "Hours", render: (val) => `${val}h` },
              {
                key: "status",
                label: "Status",
                render: (status) => (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      status === "Present"
                        ? "bg-green-100 text-green-800"
                        : status === "Late"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status}
                  </span>
                ),
              },
              {
                key: "verified",
                label: "Verified",
                render: (verified) =>
                  verified ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  ),
              },
            ]}
            data={attendance}
          />
        </Card>
      </div>

      <Modal
        isOpen={isFaceModalOpen}
        onClose={() => {
          setIsFaceModalOpen(false)
          setFaceVerificationStatus("idle")
        }}
        title="Face Recognition Attendance"
      >
        <div className="flex flex-col items-center justify-center py-8">
          {faceVerificationStatus === "idle" && (
            <>
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-lg bg-primary/10">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Allow access to your camera and position your face in the center for verification.
              </p>
              <Button onClick={handleFaceVerification} className="w-full">
                Start Face Verification
              </Button>
            </>
          )}

          {faceVerificationStatus === "verifying" && (
            <>
              <div className="mb-6 h-32 w-32 rounded-lg border-4 border-primary bg-muted flex items-center justify-center animate-pulse">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-sm text-muted-foreground">Verifying your face...</p>
            </>
          )}

          {faceVerificationStatus === "verified" && (
            <>
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-center text-sm font-semibold text-green-600">Attendance Marked Successfully!</p>
            </>
          )}

          {faceVerificationStatus === "failed" && (
            <>
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-lg bg-red-100">
                <Camera className="h-12 w-12 text-red-600" />
              </div>
              <p className="text-center text-sm text-red-600">Verification failed. Please try again.</p>
            </>
          )}
        </div>
      </Modal>
    </LaborLayout>
  )
}
