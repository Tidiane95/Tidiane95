export type UserRole = 'employee' | 'admin' | 'hr'
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid'
export type PaymentMethod = 'mobile_money' | 'bank_transfer' | 'gift_card'
export type WellnessLevel = 'critical' | 'fragile' | 'stable' | 'good' | 'excellent'
export type AlertType = 'overdraft_risk' | 'bill_due' | 'goal_reached' | 'tip' | 'achievement'

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
  netMonthlySalary: number
  advanceEligibilityPercent: number
  maxDailyAmount: number
  maxPerPeriodAmount: number
  employer: Employer
  wellnessScore: number // 0–100
  savingsGoal?: SavingsGoal
}

export interface Employer {
  id: string
  name: string
  sector: string
  logoColor?: string
  employeeCount?: number
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
  repaymentDate: string
  notes?: string
  fees: number
  giftCardBonus?: number
}

export interface EarnedWageData {
  periodStart: string
  periodEnd: string
  daysWorked: number
  totalDays: number
  grossEarned: number
  netEarned: number
  alreadyAccessed: number
  availableToAccess: number
  dailyRate: number
}

export interface WellnessAlert {
  id: string
  type: AlertType
  title: string
  message: string
  actionLabel?: string
  actionHref?: string
  severity: 'low' | 'medium' | 'high'
  read: boolean
  createdAt: string
}

export interface SavingsGoal {
  id: string
  label: string
  targetAmount: number
  savedAmount: number
  targetDate: string
  icon: string
}

export interface GiftCard {
  id: string
  retailer: string
  category: string
  bonusPercent: number
  minAmount: number
  maxAmount: number
  icon: string
  color: string
  popular?: boolean
}

export interface FinancialCourse {
  id: string
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  topics: string[]
  completed: boolean
  progress: number
}

export interface EmployerMetrics {
  totalEmployees: number
  activeUsers: number
  adoptionRate: number
  avgAccessAmount: number
  turnoverReduction: number
  absenteeismReduction: number
  satisfactionScore: number
  totalDisbursed: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}
