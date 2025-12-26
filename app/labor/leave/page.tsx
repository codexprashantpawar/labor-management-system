"use client"

import { useState } from "react"
import { LaborLayout } from "@/layouts/labor-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { FormInput } from "@/components/form-input"
import { Plus } from "lucide-react"

interface LeaveApplication {
  id: string
  leaveType: string
  fromDate: string
  toDate: string
  days: number
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  appliedOn: string
}

export default function LeaveApplicationPage() {
  const [applications, setApplications] = useState<LeaveApplication[]>([
    {
      id: "1",
      leaveType: "Casual Leave",
      fromDate: "2024-12-20",
      toDate: "2024-12-22",
      days: 3,
      reason: "Family visit",
      status: "Approved",
      appliedOn: "2024-12-10",
    },
    {
      id: "2",
      leaveType: "Sick Leave",
      fromDate: "2025-01-05",
      toDate: "2025-01-06",
      days: 2,
      reason: "Medical treatment",
      status: "Pending",
      appliedOn: "2025-01-03",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    leaveType: "casual",
    fromDate: "",
    toDate: "",
    reason: "",
  })

  const [leaveBalance] = useState({
    casual: 5,
    sick: 8,
    earned: 10,
    optional: 2,
  })

  const handleApplyLeave = () => {
    if (!formData.leaveType || !formData.fromDate || !formData.toDate || !formData.reason) return

    const newApplication: LeaveApplication = {
      id: Date.now().toString(),
      leaveType: formData.leaveType.charAt(0).toUpperCase() + formData.leaveType.slice(1) + " Leave",
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      days:
        Math.ceil((new Date(formData.toDate).getTime() - new Date(formData.fromDate).getTime()) / (1000 * 3600 * 24)) +
        1,
      reason: formData.reason,
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
    }

    setApplications([...applications, newApplication])
    setFormData({ leaveType: "casual", fromDate: "", toDate: "", reason: "" })
    setIsModalOpen(false)
  }

  return (
    <LaborLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Applications</h1>
            <p className="mt-2 text-muted-foreground">Apply for leave and track your applications.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Apply Leave
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Casual Leave</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{leaveBalance.casual}</p>
            <p className="mt-1 text-xs text-muted-foreground">Days available</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Sick Leave</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{leaveBalance.sick}</p>
            <p className="mt-1 text-xs text-muted-foreground">Days available</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Earned Leave</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{leaveBalance.earned}</p>
            <p className="mt-1 text-xs text-muted-foreground">Days available</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Optional Leave</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{leaveBalance.optional}</p>
            <p className="mt-1 text-xs text-muted-foreground">Days available</p>
          </Card>
        </div>

        <Card className="p-6">
          <DataTable<LeaveApplication>
            columns={[
              { key: "leaveType", label: "Leave Type" },
              { key: "fromDate", label: "From Date" },
              { key: "toDate", label: "To Date" },
              { key: "days", label: "Days" },
              { key: "reason", label: "Reason" },
              { key: "appliedOn", label: "Applied On" },
              {
                key: "status",
                label: "Status",
                render: (status) => (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status}
                  </span>
                ),
              },
            ]}
            data={applications}
          />
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setFormData({ leaveType: "casual", fromDate: "", toDate: "", reason: "" })
        }}
        title="Apply for Leave"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyLeave}>Submit Application</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Leave Type"
            type="select"
            value={formData.leaveType}
            onChange={(value) => setFormData({ ...formData, leaveType: value })}
            required
          >
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="earned">Earned Leave</option>
            <option value="optional">Optional Leave</option>
          </FormInput>
          <FormInput
            label="From Date"
            type="date"
            value={formData.fromDate}
            onChange={(value) => setFormData({ ...formData, fromDate: value })}
            required
          />
          <FormInput
            label="To Date"
            type="date"
            value={formData.toDate}
            onChange={(value) => setFormData({ ...formData, toDate: value })}
            required
          />
          <FormInput
            label="Reason"
            type="textarea"
            placeholder="Enter reason for leave"
            value={formData.reason}
            onChange={(value) => setFormData({ ...formData, reason: value })}
            required
          />
        </div>
      </Modal>
    </LaborLayout>
  )
}
