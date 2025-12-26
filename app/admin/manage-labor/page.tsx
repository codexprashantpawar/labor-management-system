"use client"

import { useState } from "react"
import { AdminLayout } from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { FormInput } from "@/components/form-input"
import { Pencil, Trash2, Plus } from "lucide-react"

interface Labor {
  id: string
  name: string
  email: string
  phone: string
  position: string
  joinDate: string
  status: "Active" | "Inactive"
}

export default function ManageLaborPage() {
  const [laborList, setLaborList] = useState<Labor[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      position: "Field Worker",
      joinDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543211",
      position: "Team Lead",
      joinDate: "2023-06-10",
      status: "Active",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    joinDate: "",
  })

  const handleAddLabor = async () => {
    if (!formData.name || !formData.email) return

    const newLabor: Labor = {
      id: Date.now().toString(),
      ...formData,
      status: "Active",
    }

    setLaborList([...laborList, newLabor])
    setFormData({ name: "", email: "", phone: "", position: "", joinDate: "" })
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setLaborList(laborList.filter((l) => l.id !== id))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Labor</h1>
            <p className="mt-2 text-muted-foreground">Add, edit, and manage labor information.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Labor
          </Button>
        </div>

        <Card className="p-6">
          <DataTable<Labor>
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "position", label: "Position" },
              { key: "joinDate", label: "Join Date" },
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
            data={laborList}
            actions={(item) => (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(item.id)
                    setIsModalOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingId(null)
          setFormData({ name: "", email: "", phone: "", position: "", joinDate: "" })
        }}
        title={editingId ? "Edit Labor" : "Add New Labor"}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLabor}>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            required
          />
          <FormInput
            label="Phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
          />
          <FormInput
            label="Position"
            placeholder="Field Worker"
            value={formData.position}
            onChange={(value) => setFormData({ ...formData, position: value })}
          />
          <FormInput
            label="Join Date"
            type="date"
            value={formData.joinDate}
            onChange={(value) => setFormData({ ...formData, joinDate: value })}
          />
        </div>
      </Modal>
    </AdminLayout>
  )
}
