"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Bell, Settings } from "lucide-react"

interface HeaderProps {
  userName?: string
  role?: string
}

export function Header({ userName = "Admin User", role = "Admin" }: HeaderProps) {
  return (
    <header className="border-b border-sidebar-border bg-sidebar">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <span className="text-lg font-bold text-sidebar-primary-foreground">LM</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Labor Management</h1>
            <p className="text-xs text-sidebar-accent-foreground">{role}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-8 w-px bg-sidebar-border" />
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
              <p className="text-xs text-sidebar-accent-foreground">{role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
