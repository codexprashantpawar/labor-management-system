"use client"

import { AdminLayout } from "@/layouts/admin-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, FileText } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      name: "Attendance Report",
      description: "View daily attendance records and statistics",
      icon: <BarChart3 className="h-8 w-8" />,
      href: "/admin/reports/attendance",
    },
    {
      name: "Salary Report",
      description: "View salary disbursement and payment records",
      icon: <FileText className="h-8 w-8" />,
      href: "/admin/reports/salary",
    },
    {
      name: "Leave Report",
      description: "View leave utilization and balance report",
      icon: <FileText className="h-8 w-8" />,
      href: "/admin/reports/leave",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="mt-2 text-muted-foreground">Generate and view various labor management reports.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.name} className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {report.icon}
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{report.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{report.description}</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Report
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
