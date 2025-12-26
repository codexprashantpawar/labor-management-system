// This is a placeholder for ASP.NET Web API integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Auth APIs
export const auth = {
  login: (email: string, password: string) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: { name: string; email: string; password: string; role: string }) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () => apiCall("/auth/logout", { method: "POST" }),
}

// Labor APIs
export const labor = {
  getAll: () => apiCall("/labor"),
  getById: (id: string) => apiCall(`/labor/${id}`),
  create: (data: any) => apiCall("/labor", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/labor/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/labor/${id}`, { method: "DELETE" }),
}

// Salary APIs
export const salary = {
  getAll: () => apiCall("/salary"),
  getById: (id: string) => apiCall(`/salary/${id}`),
  create: (data: any) => apiCall("/salary", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/salary/${id}`, { method: "PUT", body: JSON.stringify(data) }),
}

// Leave APIs
export const leave = {
  getAll: () => apiCall("/leave"),
  getById: (id: string) => apiCall(`/leave/${id}`),
  create: (data: any) => apiCall("/leave", { method: "POST", body: JSON.stringify(data) }),
  approve: (id: string) => apiCall(`/leave/${id}/approve`, { method: "POST" }),
  reject: (id: string) => apiCall(`/leave/${id}/reject`, { method: "POST" }),
}

// Shift APIs
export const shift = {
  getAll: () => apiCall("/shift"),
  getById: (id: string) => apiCall(`/shift/${id}`),
  create: (data: any) => apiCall("/shift", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/shift/${id}`, { method: "PUT", body: JSON.stringify(data) }),
}

// Attendance APIs
export const attendance = {
  getAll: () => apiCall("/attendance"),
  getById: (id: string) => apiCall(`/attendance/${id}`),
  markAttendance: (data: any) => apiCall("/attendance", { method: "POST", body: JSON.stringify(data) }),
  getFaceVerification: (data: any) =>
    apiCall("/attendance/verify-face", { method: "POST", body: JSON.stringify(data) }),
}

// Report APIs
export const reports = {
  getAttendanceReport: (filters: any) =>
    apiCall("/reports/attendance", { method: "POST", body: JSON.stringify(filters) }),
  getSalaryReport: (filters: any) => apiCall("/reports/salary", { method: "POST", body: JSON.stringify(filters) }),
  getLeaveReport: (filters: any) => apiCall("/reports/leave", { method: "POST", body: JSON.stringify(filters) }),
}
