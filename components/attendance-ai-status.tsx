"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

interface AttendanceAIStatusProps {
  status: "verified" | "pending" | "failed"
  confidenceScore?: number
  timestamp?: string
}

export function AttendanceAIStatus({ status, confidenceScore, timestamp }: AttendanceAIStatusProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div>
          {status === "verified" && (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">AI Verified</span>
              </div>
              {confidenceScore && (
                <p className="mt-1 text-xs text-muted-foreground">Confidence: {(confidenceScore * 100).toFixed(1)}%</p>
              )}
            </>
          )}

          {status === "pending" && (
            <>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-600">Verification Pending</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Awaiting AI face recognition verification</p>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-600">Verification Failed</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Please contact HR for manual verification</p>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
