"use client"

import { useState } from "react"
import { ManagerLayout } from "@/layouts/manager-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Check, X, MessageSquare } from "lucide-react"
import { Modal } from "@/components/modal"
import { FormInput } from "@/components/form-input"

interface LeaveRequest {
  id: string
  laborName: string
  leaveType: string
  fromDate: string
  toDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
}

export default function LeaveApprovalPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      laborName: "John Doe",
      leaveType: "Sick Leave",
      fromDate: "2025-01-10",
      toDate: "2025-01-12",
      reason: "Medical checkup",
      status: "Pending",
    },
    {
      id: "2",
      laborName: "Alice Johnson",
      leaveType: "Casual Leave",
      fromDate: "2025-01-15",
      toDate: "2025-01-15",
      reason: "Personal work",
      status: "Pending",
    },
    {
      id: "3",
      laborName: "Bob Smith",
      leaveType: "Earned Leave",
      fromDate: "2025-01-20",
      toDate: "2025-01-25",
      reason: "Vacation",
      status: "Pending",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [comment, setComment] = useState("")

  const handleApprove = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "Approved" as const } : r)))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "Rejected" as const } : r)))
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Approval</h1>
          <p className="mt-2 text-muted-foreground">Review and approve leave requests from your team.</p>
        </div>

        <Card className="p-6">
          <DataTable<LeaveRequest>
            columns={[
              { key: "laborName", label: "Employee Name" },
              { key: "leaveType", label: "Leave Type" },
              { key: "fromDate", label: "From" },
              { key: "toDate", label: "To" },
              { key: "reason", label: "Reason" },
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
            data={requests}
            actions={(item) =>
              item.status === "Pending" ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(item.id)} className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedRequest(item)
                      setIsModalOpen(true)
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Processed</span>
              )
            }
          />
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedRequest(null)
          setComment("")
        }}
        title={`Leave Request - ${selectedRequest?.laborName}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button>Send Comment</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Leave Details</p>
            <div className="mt-2 space-y-2 rounded-lg bg-muted p-3">
              <p className="text-sm">
                <span className="font-medium">Type:</span> {selectedRequest?.leaveType}
              </p>
              <p className="text-sm">
                <span className="font-medium">Period:</span> {selectedRequest?.fromDate} to {selectedRequest?.toDate}
              </p>
              <p className="text-sm">
                <span className="font-medium">Reason:</span> {selectedRequest?.reason}
              </p>
            </div>
          </div>
          <FormInput
            label="Your Comment"
            type="textarea"
            placeholder="Add your comments or feedback..."
            value={comment}
            onChange={setComment}
          />
        </div>
      </Modal>
    </ManagerLayout>
  )
}
