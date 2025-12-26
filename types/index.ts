// Type definitions for Labor Management System

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "labor"
  joinDate: string
}

export interface Labor {
  id: string
  name: string
  email: string
  phone: string
  position: string
  joinDate: string
  status: "Active" | "Inactive"
  department?: string
}

export interface Salary {
  id: string
  laborId: string
  laborName: string
  baseSalary: number
  allowance: number
  deduction: number
  netSalary: number
  month: string
  status: "Pending" | "Approved" | "Paid"
}

export interface Leave {
  id: string
  laborId: string
  laborName: string
  leaveType: string
  fromDate: string
  toDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  appliedOn: string
}

export interface Shift {
  id: string
  name: string
  startTime: string
  endTime: string
  laborCount: number
  status: "Active" | "Inactive"
}

export interface Attendance {
  id: string
  laborId: string
  date: string
  inTime: string
  outTime: string
  hoursWorked: number
  status: "Present" | "Absent" | "Late"
  verified: boolean
  confidenceScore?: number
}

export interface FaceVerificationResult {
  verified: boolean
  confidenceScore: number
  timestamp: string
  laborId: string
}

export interface WhatsAppMessage {
  type: "leave" | "salary" | "question"
  content: string
  laborId: string
  timestamp: string
  status: "sent" | "delivered" | "read"
}
