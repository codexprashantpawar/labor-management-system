"use client"

import { useState } from "react"
import { ManagerLayout } from "@/layouts/manager-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { FormInput } from "@/components/form-input"
import { Plus, Pencil } from "lucide-react"

interface Shift {
  id: string
  name: string
  startTime: string
  endTime: string
  laborCount: number
  assignedLabor: string
  status: "Active" | "Inactive"
}

export default function ShiftManagementPage() {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: "1",
      name: "Morning Shift",
      startTime: "06:00 AM",
      endTime: "02:00 PM",
      laborCount: 12,
      assignedLabor: "John, Jane, Mike...",
      status: "Active",
    },
    {
      id: "2",
      name: "Evening Shift",
      startTime: "02:00 PM",
      endTime: "10:00 PM",
      laborCount: 8,
      assignedLabor: "Sarah, Tom, Lisa...",
      status: "Active",
    },
    {
      id: "3",
      name: "Night Shift",
      startTime: "10:00 PM",
      endTime: "06:00 AM",
      laborCount: 5,
      assignedLabor: "David, Emma...",
      status: "Inactive",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shift Management</h1>
            <p className="mt-2 text-muted-foreground">Create and manage work shifts.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Shift
          </Button>
        </div>

        <Card className="p-6">
          <DataTable<Shift>
            columns={[
              { key: "name", label: "Shift Name" },
              { key: "startTime", label: "Start Time" },
              { key: "endTime", label: "End Time" },
              { key: "laborCount", label: "Labor Count" },
              { key: "assignedLabor", label: "Assigned Labor" },
              {
                key: "status",
                label: "Status",
                render: (status) => (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {status}
                  </span>
                ),
              },
            ]}
            data={shifts}
            actions={() => (
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          />
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Shift"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button>Create Shift</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormInput label="Shift Name" placeholder="Morning Shift" required />
          <FormInput label="Start Time" type="text" placeholder="06:00 AM" required />
          <FormInput label="End Time" type="text" placeholder="02:00 PM" required />
          <FormInput label="Description" type="textarea" placeholder="Enter shift details" />
        </div>
      </Modal>
    </ManagerLayout>
  )
}
