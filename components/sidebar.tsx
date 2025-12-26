"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, DollarSign, Calendar, FileText, Clock, CheckCircle, Smile, LogOut } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
}

interface SidebarProps {
  role: "admin" | "manager" | "labor"
}

const navItems: Record<string, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Manage Labor", href: "/admin/manage-labor", icon: <Users className="h-5 w-5" /> },
    { label: "Manage Salary", href: "/admin/manage-salary", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Leave Requests", href: "/admin/leave-requests", icon: <Calendar className="h-5 w-5" /> },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: <FileText className="h-5 w-5" />,
    },
  ],
  manager: [
    { label: "Dashboard", href: "/manager/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Shift Management", href: "/manager/shift-management", icon: <Clock className="h-5 w-5" /> },
    { label: "Leave Approval", href: "/manager/leave-approval", icon: <CheckCircle className="h-5 w-5" /> },
    { label: "Salary Approval", href: "/manager/salary-approval", icon: <DollarSign className="h-5 w-5" /> },
  ],
  labor: [
    { label: "Dashboard", href: "/labor/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Leave Application", href: "/labor/leave", icon: <Calendar className="h-5 w-5" /> },
    { label: "Salary View", href: "/labor/salary", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Attendance", href: "/labor/attendance", icon: <Smile className="h-5 w-5" /> },
    { label: "Profile", href: "/labor/profile", icon: <Users className="h-5 w-5" /> },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const items = navItems[role] || []

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar">
      <nav className="space-y-2 px-3 py-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="rounded-full bg-destructive px-2 py-1 text-xs text-white">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-3 py-6">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-sidebar-foreground hover:bg-destructive hover:text-white transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
