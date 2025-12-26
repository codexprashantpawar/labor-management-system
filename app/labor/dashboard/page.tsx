"use client"

import { useState } from "react"
import { LaborLayout } from "@/layouts/labor-layout"
import { DashboardCard } from "@/components/dashboard-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Smile, AlertCircle } from "lucide-react"

export default function LaborDashboard() {
  const [stats] = useState({
    hoursWorked: 160,
    leaveBalance: 8,
    attendanceRate: 94,
    pendingRequests: 1,
  })

  return (
    <LaborLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back! Here's your labor information overview.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Hours Worked"
            value={`${stats.hoursWorked}h`}
            icon={<Clock className="h-6 w-6 text-primary" />}
            description="This month"
          />
          <DashboardCard
            title="Leave Balance"
            value={`${stats.leaveBalance} days`}
            icon={<Calendar className="h-6 w-6 text-primary" />}
            description="Available"
          />
          <DashboardCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            change={2}
            trend="up"
            icon={<Smile className="h-6 w-6 text-primary" />}
            description="This month"
          />
          <DashboardCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon={<AlertCircle className="h-6 w-6 text-primary" />}
            description="Awaiting approval"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
            <div className="grid gap-3">
              <Button className="justify-start bg-transparent" variant="outline">
                Apply for Leave
              </Button>
              <Button className="justify-start bg-transparent" variant="outline">
                Mark Attendance
              </Button>
              <Button className="justify-start bg-transparent" variant="outline">
                View Salary Slip
              </Button>
              <Button className="justify-start bg-transparent" variant="outline">
                Contact Support
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Upcoming Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Morning Shift</p>
                  <p className="text-xs text-muted-foreground">Jan 25, 2025</p>
                </div>
                <span className="text-xs font-medium">6:00 AM - 2:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Morning Shift</p>
                  <p className="text-xs text-muted-foreground">Jan 26, 2025</p>
                </div>
                <span className="text-xs font-medium">6:00 AM - 2:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Day Off</p>
                  <p className="text-xs text-muted-foreground">Jan 27, 2025</p>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Off</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LaborLayout>
  )
}
