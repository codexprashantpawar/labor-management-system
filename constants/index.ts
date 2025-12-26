// Application constants

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  LABOR: "labor",
} as const

export const LEAVE_TYPES = [
  { value: "casual", label: "Casual Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "earned", label: "Earned Leave" },
  { value: "optional", label: "Optional Leave" },
  { value: "maternity", label: "Maternity Leave" },
  { value: "paternity", label: "Paternity Leave" },
] as const

export const ATTENDANCE_STATUS = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  HALF_DAY: "Half Day",
} as const

export const SALARY_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  PAID: "Paid",
  REJECTED: "Rejected",
} as const

export const LEAVE_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
} as const

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGOUT: "/auth/logout",

  // Labor
  LABOR_LIST: "/labor",
  LABOR_CREATE: "/labor",
  LABOR_UPDATE: (id: string) => `/labor/${id}`,
  LABOR_DELETE: (id: string) => `/labor/${id}`,

  // Salary
  SALARY_LIST: "/salary",
  SALARY_CREATE: "/salary",
  SALARY_UPDATE: (id: string) => `/salary/${id}`,
  SALARY_DELETE: (id: string) => `/salary/${id}`,

  // Leave
  LEAVE_LIST: "/leave",
  LEAVE_CREATE: "/leave",
  LEAVE_APPROVE: (id: string) => `/leave/${id}/approve`,
  LEAVE_REJECT: (id: string) => `/leave/${id}/reject`,

  // Shift
  SHIFT_LIST: "/shift",
  SHIFT_CREATE: "/shift",
  SHIFT_UPDATE: (id: string) => `/shift/${id}`,

  // Attendance
  ATTENDANCE_LIST: "/attendance",
  ATTENDANCE_MARK: "/attendance",
  ATTENDANCE_VERIFY_FACE: "/attendance/verify-face",

  // Reports
  ATTENDANCE_REPORT: "/reports/attendance",
  SALARY_REPORT: "/reports/salary",
  LEAVE_REPORT: "/reports/leave",

  // WhatsApp
  WHATSAPP_SEND_LEAVE: "/whatsapp/send-leave",
  WHATSAPP_REQUEST_SALARY: "/whatsapp/request-salary",
  WHATSAPP_SEND_QUESTION: "/whatsapp/send-question",
} as const

export const DEFAULT_LEAVE_BALANCE = {
  casual: 12,
  sick: 10,
  earned: 20,
  optional: 3,
  maternity: 180,
  paternity: 15,
} as const
