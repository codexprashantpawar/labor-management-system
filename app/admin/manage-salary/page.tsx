"use client"

import { useState } from "react"
import { AdminLayout } from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { FormInput } from "@/components/form-input"
import { Pencil, Plus } from "lucide-react"

interface Salary {
  id: string
  laborName: string
  baseSalary: number
  allowance: number
  deduction: number
  netSalary: number
  month: string
  status: "Pending" | "Approved" | "Paid"
}

export default function ManageSalaryPage() {
  const [salaries, setSalaries] = useState<Salary[]>([
    {
      id: "1",
      laborName: "John Doe",
      baseSalary: 20000,
      allowance: 5000,
      deduction: 2000,
      netSalary: 23000,
      month: "December 2024",
      status: "Pending",
    },
    {
      id: "2",
      laborName: "Jane Smith",
      baseSalary: 25000,
      allowance: 6000,
      deduction: 2500,
      netSalary: 28500,
      month: "December 2024",
      status: "Approved",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Salary</h1>
            <p className="mt-2 text-muted-foreground">Review and manage labor salaries.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Salary
          </Button>
        </div>

        <Card className="p-6">
          <DataTable<Salary>
            columns={[
              { key: "laborName", label: "Labor Name" },
              { key: "baseSalary", label: "Base Salary", render: (val) => `₹${val}` },
              { key: "allowance", label: "Allowance", render: (val) => `₹${val}` },
              { key: "deduction", label: "Deduction", render: (val) => `₹${val}` },
              { key: "netSalary", label: "Net Salary", render: (val) => `₹${val}` },
              { key: "month", label: "Month" },
              {
                key: "status",
                label: "Status",
                render: (status) => (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : status === "Approved"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status}
                  </span>
                ),
              },
            ]}
            data={salaries}
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
        title="Add Salary Record"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormInput label="Labor Name" type="select" required>
            <option value="">Select Labor</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
          </FormInput>
          <FormInput label="Base Salary" type="number" placeholder="20000" required />
          <FormInput label="Allowance" type="number" placeholder="5000" />
          <FormInput label="Deduction" type="number" placeholder="2000" />
          <FormInput label="Month" type="date" required />
        </div>
      </Modal>
    </AdminLayout>
  )
}
