export type UserRole = 'employee' | 'admin' | 'hr'

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid'

export type PaymentMethod = 'mobile_money' | 'bank_transfer' | 'cash'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
  employeeId: string
  department: string
  position: string
  hireDate: string
  monthlySalary: number
  advanceEligibilityPercent: number // max % of monthly salary
  employer: Employer
  avatar?: string
}

export interface Employer {
  id: string
  name: string
  logo?: string
  sector: string
}

export interface SalaryAdvanceRequest {
  id: string
  requestNumber: string
  employeeId: string
  employeeName: string
  department: string
  amount: number
  reason: string
  status: RequestStatus
  paymentMethod: PaymentMethod
  paymentDetails: string
  requestedAt: string
  reviewedAt?: string
  reviewedBy?: string
  disbursedAt?: string
  repaidAt?: string
  repaymentDate: string // planned repayment (next salary date)
  notes?: string
  fees: number
}

export interface DashboardStats {
  monthlySalary: number
  eligibleAmount: number
  usedAmount: number
  availableAmount: number
  totalRequests: number
  pendingRequests: number
  approvedRequests: number
  disbursedRequests: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}
