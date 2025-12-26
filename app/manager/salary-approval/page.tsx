"use client"

import { useState } from "react"
import { ManagerLayout } from "@/layouts/manager-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Check, X } from "lucide-react"

interface SalaryApproval {
  id: string
  laborName: string
  baseSalary: number
  allowance: number
  deduction: number
  netSalary: number
  month: string
  status: "Pending" | "Approved" | "Rejected"
}

export default function SalaryApprovalPage() {
  const [salaries, setSalaries] = useState<SalaryApproval[]>([
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
      laborName: "Alice Johnson",
      baseSalary: 18000,
      allowance: 4000,
      deduction: 1800,
      netSalary: 20200,
      month: "December 2024",
      status: "Pending",
    },
  ])

  const handleApprove = (id: string) => {
    setSalaries(salaries.map((s) => (s.id === id ? { ...s, status: "Approved" as const } : s)))
  }

  const handleReject = (id: string) => {
    setSalaries(salaries.map((s) => (s.id === id ? { ...s, status: "Rejected" as const } : s)))
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Salary Approval</h1>
          <p className="mt-2 text-muted-foreground">Review and approve salary records for your team.</p>
        </div>

        <Card className="p-6">
          <DataTable<SalaryApproval>
            columns={[
              { key: "laborName", label: "Employee Name" },
              { key: "baseSalary", label: "Base", render: (val) => `₹${val}` },
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
            data={salaries}
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
                <span className="text-sm text-muted-foreground">Processed</span>
              )
            }
          />
        </Card>
      </div>
    </ManagerLayout>
  )
}
