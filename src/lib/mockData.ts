import type {
  User, SalaryAdvanceRequest, Notification, EarnedWageData,
  WellnessAlert, SavingsGoal, GiftCard, FinancialCourse, EmployerMetrics,
} from '@/types'

// ─── Users ────────────────────────────────────────────────────────────────────

export const CURRENT_USER: User = {
  id: 'u1',
  firstName: 'Mamadou',
  lastName: 'Diallo',
  email: 'mamadou.diallo@techafrique.sn',
  phone: '+221 77 456 78 90',
  role: 'employee',
  employeeId: 'EMP-2021-0042',
  department: 'Informatique',
  position: 'Développeur Senior',
  hireDate: '2021-03-15',
  monthlySalary: 850000,
  netMonthlySalary: 720000,
  advanceEligibilityPercent: 50,
  maxDailyAmount: 100000,
  maxPerPeriodAmount: 360000,
  wellnessScore: 68,
  employer: {
    id: 'emp1',
    name: 'TechAfrique SA',
    sector: 'Technologie',
    logoColor: '#2563eb',
    employeeCount: 240,
  },
  savingsGoal: {
    id: 'sg1',
    label: 'Fonds d\'urgence',
    targetAmount: 500000,
    savedAmount: 185000,
    targetDate: '2025-12-31',
    icon: '🛡️',
  },
}

export const ADMIN_USER: User = {
  id: 'u2',
  firstName: 'Fatoumata',
  lastName: 'Kouyaté',
  email: 'f.kouyate@diallo-fintech.com',
  phone: '+221 78 123 45 67',
  role: 'admin',
  employeeId: 'DAF-HR-001',
  department: 'Ressources Humaines',
  position: 'Responsable RH',
  hireDate: '2019-01-10',
  monthlySalary: 1200000,
  netMonthlySalary: 1000000,
  advanceEligibilityPercent: 50,
  maxDailyAmount: 150000,
  maxPerPeriodAmount: 500000,
  wellnessScore: 82,
  employer: {
    id: 'emp0',
    name: 'Di Allo Fintech',
    sector: 'Fintech',
    logoColor: '#16a34a',
  },
}

// ─── Earned Wage Data ─────────────────────────────────────────────────────────

export const EARNED_WAGE_DATA: EarnedWageData = {
  periodStart: '2025-03-01',
  periodEnd: '2025-03-31',
  daysWorked: 20,
  totalDays: 26,
  grossEarned: 653846, // 20/26 * 850000
  netEarned: 553846,
  alreadyAccessed: 150000,
  availableToAccess: 210000, // min(50% net, remaining daily/period limits)
  dailyRate: 27692,
}

// ─── Requests ─────────────────────────────────────────────────────────────────

export const MOCK_REQUESTS: SalaryAdvanceRequest[] = [
  {
    id: 'req1',
    requestNumber: 'DAF-2025-0001',
    employeeId: 'u1',
    employeeName: 'Mamadou Diallo',
    department: 'Informatique',
    amount: 200000,
    reason: 'Frais médicaux urgents pour un membre de la famille',
    status: 'disbursed',
    paymentMethod: 'mobile_money',
    paymentDetails: 'Orange Money - 77 456 78 90',
    requestedAt: '2025-01-05T09:30:00Z',
    reviewedAt: '2025-01-06T14:00:00Z',
    reviewedBy: 'Fatoumata Kouyaté',
    disbursedAt: '2025-01-06T16:30:00Z',
    repaymentDate: '2025-01-31',
    fees: 0,
  },
  {
    id: 'req2',
    requestNumber: 'DAF-2025-0047',
    employeeId: 'u1',
    employeeName: 'Mamadou Diallo',
    department: 'Informatique',
    amount: 150000,
    reason: 'Réparation véhicule - nécessaire pour le travail',
    status: 'approved',
    paymentMethod: 'bank_transfer',
    paymentDetails: 'UBA - SN012 3456 7890 1234',
    requestedAt: '2025-03-10T10:15:00Z',
    reviewedAt: '2025-03-11T09:00:00Z',
    reviewedBy: 'Fatoumata Kouyaté',
    repaymentDate: '2025-03-31',
    fees: 0,
  },
  {
    id: 'req3',
    requestNumber: 'DAF-2025-0051',
    employeeId: 'u1',
    employeeName: 'Mamadou Diallo',
    department: 'Informatique',
    amount: 80000,
    reason: 'Scolarité enfants - rentrée scolaire',
    status: 'pending',
    paymentMethod: 'gift_card',
    paymentDetails: 'Bon d\'achat Auchan (+15% bonus)',
    requestedAt: '2025-03-20T08:00:00Z',
    repaymentDate: '2025-04-30',
    fees: 0,
    giftCardBonus: 15,
  },
]

export const ALL_REQUESTS: SalaryAdvanceRequest[] = [
  ...MOCK_REQUESTS,
  {
    id: 'req4',
    requestNumber: 'DAF-2025-0012',
    employeeId: 'u3',
    employeeName: 'Aïssatou Bah',
    department: 'Marketing',
    amount: 250000,
    reason: 'Loyer en retard',
    status: 'approved',
    paymentMethod: 'mobile_money',
    paymentDetails: 'Orange Money - 76 234 56 78',
    requestedAt: '2025-03-15T11:00:00Z',
    reviewedAt: '2025-03-16T10:00:00Z',
    reviewedBy: 'Fatoumata Kouyaté',
    repaymentDate: '2025-03-31',
    fees: 0,
  },
  {
    id: 'req5',
    requestNumber: 'DAF-2025-0038',
    employeeId: 'u4',
    employeeName: 'Ibrahima Sow',
    department: 'Finance',
    amount: 400000,
    reason: 'Cérémonie familiale',
    status: 'rejected',
    paymentMethod: 'bank_transfer',
    paymentDetails: 'BICIS - SN099 1234 5678',
    requestedAt: '2025-03-18T14:30:00Z',
    reviewedAt: '2025-03-19T09:30:00Z',
    reviewedBy: 'Fatoumata Kouyaté',
    repaymentDate: '2025-04-30',
    notes: 'Dépasse le plafond autorisé de 50% du salaire net de la période.',
    fees: 0,
  },
  {
    id: 'req6',
    requestNumber: 'DAF-2025-0053',
    employeeId: 'u5',
    employeeName: 'Kadiatou Camara',
    department: 'Commercial',
    amount: 175000,
    reason: 'Frais hospitalisation',
    status: 'pending',
    paymentMethod: 'mobile_money',
    paymentDetails: 'Wave - 78 987 65 43',
    requestedAt: '2025-03-22T16:00:00Z',
    repaymentDate: '2025-04-30',
    fees: 0,
  },
]

// ─── Wellness Alerts ──────────────────────────────────────────────────────────

export const WELLNESS_ALERTS: WellnessAlert[] = [
  {
    id: 'wa1',
    type: 'overdraft_risk',
    title: 'Risque de découvert détecté',
    message: 'Votre solde estimé sera insuffisant pour couvrir votre loyer le 28 mars.',
    actionLabel: 'Accéder à mon salaire',
    actionHref: '/request',
    severity: 'high',
    read: false,
    createdAt: '2025-03-22T08:00:00Z',
  },
  {
    id: 'wa2',
    type: 'bill_due',
    title: 'Facture Senelec à venir',
    message: 'Une facture d\'électricité de ~45 000 FCFA est attendue dans 5 jours.',
    actionLabel: 'Préparer le paiement',
    actionHref: '/request',
    severity: 'medium',
    read: false,
    createdAt: '2025-03-21T10:00:00Z',
  },
  {
    id: 'wa3',
    type: 'achievement',
    title: 'Objectif épargne atteint à 37% !',
    message: 'Vous avez épargné 185 000 FCFA sur votre objectif de 500 000 FCFA.',
    severity: 'low',
    read: true,
    createdAt: '2025-03-20T09:00:00Z',
  },
]

// ─── Gift Cards ───────────────────────────────────────────────────────────────

export const GIFT_CARDS: GiftCard[] = [
  {
    id: 'gc1',
    retailer: 'Auchan Sénégal',
    category: 'Supermarché',
    bonusPercent: 15,
    minAmount: 10000,
    maxAmount: 200000,
    icon: '🛒',
    color: 'bg-red-500',
    popular: true,
  },
  {
    id: 'gc2',
    retailer: 'Canal+ Afrique',
    category: 'Divertissement',
    bonusPercent: 20,
    minAmount: 10000,
    maxAmount: 100000,
    icon: '📺',
    color: 'bg-blue-600',
    popular: true,
  },
  {
    id: 'gc3',
    retailer: 'Orange (Crédit)',
    category: 'Télécom',
    bonusPercent: 25,
    minAmount: 5000,
    maxAmount: 50000,
    icon: '📱',
    color: 'bg-orange-500',
    popular: true,
  },
  {
    id: 'gc4',
    retailer: 'Jumia Sénégal',
    category: 'E-commerce',
    bonusPercent: 12,
    minAmount: 15000,
    maxAmount: 300000,
    icon: '📦',
    color: 'bg-yellow-500',
  },
  {
    id: 'gc5',
    retailer: 'Carrefour',
    category: 'Supermarché',
    bonusPercent: 10,
    minAmount: 10000,
    maxAmount: 250000,
    icon: '🏪',
    color: 'bg-blue-500',
  },
  {
    id: 'gc6',
    retailer: 'Total Energies',
    category: 'Carburant',
    bonusPercent: 8,
    minAmount: 10000,
    maxAmount: 100000,
    icon: '⛽',
    color: 'bg-red-600',
  },
  {
    id: 'gc7',
    retailer: 'Wave (Crédit)',
    category: 'Télécom',
    bonusPercent: 20,
    minAmount: 5000,
    maxAmount: 50000,
    icon: '💙',
    color: 'bg-cyan-500',
  },
  {
    id: 'gc8',
    retailer: 'Netflix',
    category: 'Divertissement',
    bonusPercent: 18,
    minAmount: 5000,
    maxAmount: 30000,
    icon: '🎬',
    color: 'bg-red-700',
  },
]

// ─── Financial Courses ────────────────────────────────────────────────────────

export const FINANCIAL_COURSES: FinancialCourse[] = [
  {
    id: 'fc1',
    title: 'Gérer son budget mensuel',
    level: 'beginner',
    duration: '15 min',
    topics: ['Règle 50/30/20', 'Suivi des dépenses', 'Fonds d\'urgence'],
    completed: true,
    progress: 100,
  },
  {
    id: 'fc2',
    title: 'Comprendre son bulletin de salaire',
    level: 'beginner',
    duration: '10 min',
    topics: ['Cotisations sociales', 'Impôts', 'Salaire net vs brut'],
    completed: true,
    progress: 100,
  },
  {
    id: 'fc3',
    title: 'Construire son épargne de précaution',
    level: 'intermediate',
    duration: '20 min',
    topics: ['Objectifs d\'épargne', 'Automatiser l\'épargne', 'Produits d\'épargne'],
    completed: false,
    progress: 60,
  },
  {
    id: 'fc4',
    title: 'Sortir du cycle des dettes',
    level: 'intermediate',
    duration: '25 min',
    topics: ['Avalanche vs Boule de neige', 'Négocier ses dettes', 'Éviter le surendettement'],
    completed: false,
    progress: 0,
  },
  {
    id: 'fc5',
    title: 'Investir pour l\'avenir',
    level: 'advanced',
    duration: '30 min',
    topics: ['Bourse et OPCVM', 'Immobilier', 'Retraite complémentaire'],
    completed: false,
    progress: 0,
  },
]

// ─── Employer Metrics ─────────────────────────────────────────────────────────

export const EMPLOYER_METRICS: EmployerMetrics = {
  totalEmployees: 240,
  activeUsers: 178,
  adoptionRate: 74,
  avgAccessAmount: 187500,
  turnoverReduction: 31,
  absenteeismReduction: 22,
  satisfactionScore: 4.7,
  totalDisbursed: 47500000,
}

// ─── Notifications ────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Acompte approuvé',
    message: 'Votre demande DAF-2025-0047 de 150 000 FCFA a été approuvée.',
    type: 'success' as const,
    read: false,
    createdAt: '2025-03-11T09:00:00Z',
  },
  {
    id: 'n2',
    title: 'Demande en attente',
    message: 'Votre demande DAF-2025-0051 est en cours de traitement.',
    type: 'info' as const,
    read: false,
    createdAt: '2025-03-20T08:05:00Z',
  },
  {
    id: 'n3',
    title: 'Rappel de remboursement',
    message: 'Le remboursement de votre acompte DAF-2025-0047 est prévu le 31 mars.',
    type: 'warning' as const,
    read: true,
    createdAt: '2025-03-24T08:00:00Z',
  },
]

// ─── Constants ────────────────────────────────────────────────────────────────

export const REASONS_LIST = [
  'Frais médicaux / hospitalisation',
  'Scolarité / rentrée scolaire',
  'Loyer / charges logement',
  'Factures (eau, électricité, internet)',
  'Réparation véhicule',
  'Cérémonie familiale (mariage, baptême...)',
  'Voyage urgent',
  'Autre motif',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('fr-SN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat('fr-SN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'En attente',
    approved: 'Approuvée',
    rejected: 'Refusée',
    disbursed: 'Déboursée',
    repaid: 'Remboursée',
  }
  return labels[status] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-blue-100 text-blue-800 border-blue-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    disbursed: 'bg-green-100 text-green-800 border-green-200',
    repaid: 'bg-gray-100 text-gray-700 border-gray-200',
  }
  return colors[status] || 'bg-gray-100 text-gray-600'
}

export function getWellnessLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Bonne santé'
  if (score >= 50) return 'Stable'
  if (score >= 35) return 'Fragile'
  return 'Critique'
}

export function getWellnessColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 65) return 'text-brand-600'
  if (score >= 50) return 'text-blue-600'
  if (score >= 35) return 'text-yellow-600'
  return 'text-red-600'
}

export function getWellnessBg(score: number): string {
  if (score >= 80) return 'bg-green-50 border-green-200'
  if (score >= 65) return 'bg-brand-50 border-brand-200'
  if (score >= 50) return 'bg-blue-50 border-blue-200'
  if (score >= 35) return 'bg-yellow-50 border-yellow-200'
  return 'bg-red-50 border-red-200'
}
