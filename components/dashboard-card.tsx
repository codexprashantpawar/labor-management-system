import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down"
  icon: ReactNode
  description?: string
}

export function DashboardCard({ title, value, change, trend, icon, description }: DashboardCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {Math.abs(change)}% {trend === "up" ? "up" : "down"}
              </span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
      </div>
    </Card>
  )
}
