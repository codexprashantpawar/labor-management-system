"use client"

import { useState, useEffect } from "react"
import { ManagerLayout } from "@/layouts/manager-layout"
import { DashboardCard } from "@/components/dashboard-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle, Users } from "lucide-react"

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    myTeamSize: 25,
    onDutyToday: 22,
    pendingApprovals: 3,
    approvedThisMonth: 18,
  })

  useEffect(() => {
    // API Call placeholder
  }, [])

  return (
    <ManagerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manager Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage your team and approve requests.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Team Size"
            value={stats.myTeamSize}
            icon={<Users className="h-6 w-6 text-primary" />}
            description="Total members"
          />
          <DashboardCard
            title="On Duty Today"
            value={stats.onDutyToday}
            change={1}
            trend="up"
            icon={<Clock className="h-6 w-6 text-primary" />}
            description="Present today"
          />
          <DashboardCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={<AlertCircle className="h-6 w-6 text-primary" />}
            description="To review"
          />
          <DashboardCard
            title="Approved This Month"
            value={stats.approvedThisMonth}
            change={8}
            trend="up"
            icon={<CheckCircle className="h-6 w-6 text-primary" />}
            description="Total approved"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Pending Approvals</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">3 Leave Requests</p>
                  <p className="text-xs text-muted-foreground">Waiting for your approval</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">2 Salary Changes</p>
                  <p className="text-xs text-muted-foreground">Pending review</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">1 Shift Update</p>
                  <p className="text-xs text-muted-foreground">Requires approval</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Team Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-sm font-semibold text-foreground">92%</p>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground">On-Time Arrivals</p>
                <p className="text-sm font-semibold text-foreground">88%</p>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: "88%" }} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground">Leave Balance</p>
                <p className="text-sm font-semibold text-foreground">12/20</p>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-orange-500" style={{ width: "60%" }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ManagerLayout>
  )
}
