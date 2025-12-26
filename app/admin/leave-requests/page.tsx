"use client"

import { useState } from "react"
import { AdminLayout } from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Check, X } from "lucide-react"

interface LeaveRequest {
  id: string
  laborName: string
  leaveType: string
  fromDate: string
  toDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
}

export default function LeaveRequestsPage() {
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
      laborName: "Jane Smith",
      leaveType: "Casual Leave",
      fromDate: "2025-01-15",
      toDate: "2025-01-15",
      reason: "Personal work",
      status: "Approved",
    },
  ])

  const handleApprove = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "Approved" as const } : r)))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "Rejected" as const } : r)))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
          <p className="mt-2 text-muted-foreground">Review and approve leave requests from labor.</p>
        </div>

        <Card className="p-6">
          <DataTable<LeaveRequest>
            columns={[
              { key: "laborName", label: "Labor Name" },
              { key: "leaveType", label: "Leave Type" },
              { key: "fromDate", label: "From Date" },
              { key: "toDate", label: "To Date" },
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
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No action</span>
              )
            }
          />
        </Card>
      </div>
    </AdminLayout>
  )
}
