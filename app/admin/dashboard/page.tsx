"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/layouts/admin-layout"
import { DashboardCard } from "@/components/dashboard-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, Calendar, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLabor: 156,
    activeLabor: 142,
    pendingLeaves: 8,
    totalSalaryExpense: "2,45,000",
  })

  useEffect(() => {
    // API Call placeholder: const data = await labor.getAll()
    // setStats(data)
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back! Here's your labor management overview.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Labor"
            value={stats.totalLabor}
            change={5}
            trend="up"
            icon={<Users className="h-6 w-6 text-primary" />}
            description="Active workforce"
          />
          <DashboardCard
            title="Active Labor"
            value={stats.activeLabor}
            change={2}
            trend="up"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            description="Currently working"
          />
          <DashboardCard
            title="Pending Leaves"
            value={stats.pendingLeaves}
            change={-1}
            trend="down"
            icon={<Calendar className="h-6 w-6 text-primary" />}
            description="To be approved"
          />
          <DashboardCard
            title="Monthly Expense"
            value={`₹${stats.totalSalaryExpense}`}
            change={3}
            trend="up"
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            description="Total salary"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
            <div className="grid gap-3">
              <Button className="justify-start bg-transparent" variant="outline">
                Add New Labor
              </Button>
              <Button className="justify-start bg-transparent" variant="outline">
                Approve Pending Leaves
              </Button>
              <Button className="justify-start bg-transparent" variant="outline">
                View Reports
              </Button>
              <Button className="justify-start bg-transparent" variant="outline">
                Manage Shifts
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">John Doe - Leave Request</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Jane Smith - Salary Approved</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Approved</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">New Labor Added - Mike Johnson</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Added</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
