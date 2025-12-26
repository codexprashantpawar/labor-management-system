"use client"

import { LaborLayout } from "@/layouts/labor-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface SalarySlip {
  month: string
  baseSalary: number
  allowance: number
  deduction: number
  netSalary: number
  status: "Paid" | "Pending"
  paidDate: string
}

export default function SalaryViewPage() {
  const salarySlips: SalarySlip[] = [
    {
      month: "December 2024",
      baseSalary: 20000,
      allowance: 5000,
      deduction: 2000,
      netSalary: 23000,
      status: "Paid",
      paidDate: "2024-12-31",
    },
    {
      month: "November 2024",
      baseSalary: 20000,
      allowance: 5000,
      deduction: 2000,
      netSalary: 23000,
      status: "Paid",
      paidDate: "2024-11-30",
    },
    {
      month: "October 2024",
      baseSalary: 20000,
      allowance: 5000,
      deduction: 2000,
      netSalary: 23000,
      status: "Paid",
      paidDate: "2024-10-31",
    },
  ]

  return (
    <LaborLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Salary View</h1>
          <p className="mt-2 text-muted-foreground">View your salary slips and payment details.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Current Month Salary</p>
            <p className="mt-2 text-3xl font-bold text-foreground">₹23,000</p>
            <p className="mt-1 text-xs text-muted-foreground">Status: Paid</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">YTD Earnings</p>
            <p className="mt-2 text-3xl font-bold text-foreground">₹2,76,000</p>
            <p className="mt-1 text-xs text-muted-foreground">Year to date</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Last Paid Date</p>
            <p className="mt-2 text-3xl font-bold text-foreground">2024-12-31</p>
            <p className="mt-1 text-xs text-muted-foreground">Latest payment</p>
          </Card>
        </div>

        <div className="space-y-4">
          {salarySlips.map((slip) => (
            <Card key={slip.month} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{slip.month}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-5">
                    <div>
                      <p className="text-sm text-muted-foreground">Base Salary</p>
                      <p className="mt-1 font-semibold text-foreground">₹{slip.baseSalary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Allowance</p>
                      <p className="mt-1 font-semibold text-foreground">₹{slip.allowance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deduction</p>
                      <p className="mt-1 font-semibold text-foreground">₹{slip.deduction}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Net Salary</p>
                      <p className="mt-1 font-bold text-primary">₹{slip.netSalary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p
                        className={`mt-1 font-semibold ${
                          slip.status === "Paid" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {slip.status}
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </LaborLayout>
  )
}
