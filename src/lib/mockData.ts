import type { User, SalaryAdvanceRequest, Notification } from '@/types'

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
  advanceEligibilityPercent: 50,
  employer: {
    id: 'emp1',
    name: 'TechAfrique SA',
    sector: 'Technologie',
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
  advanceEligibilityPercent: 50,
  employer: {
    id: 'emp0',
    name: 'Di Allo Fintech',
    sector: 'Fintech',
  },
}

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
    fees: 2000,
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
    fees: 1500,
  },
  {
    id: 'req3',
    requestNumber: 'DAF-2025-0051',
    employeeId: 'u1',
    employeeName: 'Mamadou Diallo',
    department: 'Informatique',
    amount: 300000,
    reason: 'Scolarité enfants - rentrée scolaire',
    status: 'pending',
    paymentMethod: 'mobile_money',
    paymentDetails: 'Wave - 77 456 78 90',
    requestedAt: '2025-03-20T08:00:00Z',
    repaymentDate: '2025-04-30',
    fees: 3000,
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
    fees: 2500,
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
    notes: 'Dépasse le plafond autorisé de 50% du salaire mensuel.',
    fees: 4000,
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
    fees: 1750,
  },
]

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Acompte approuvé',
    message: 'Votre demande DAF-2025-0047 de 150 000 FCFA a été approuvée.',
    type: 'success',
    read: false,
    createdAt: '2025-03-11T09:00:00Z',
  },
  {
    id: 'n2',
    title: 'Demande en attente',
    message: 'Votre demande DAF-2025-0051 est en cours de traitement.',
    type: 'info',
    read: false,
    createdAt: '2025-03-20T08:05:00Z',
  },
  {
    id: 'n3',
    title: 'Rappel de remboursement',
    message: 'Le remboursement de votre acompte DAF-2025-0047 est prévu le 31 mars.',
    type: 'warning',
    read: true,
    createdAt: '2025-03-24T08:00:00Z',
  },
]

export const REASONS_LIST = [
  'Frais médicaux / hospitalisation',
  'Scolarité / rentrée scolaire',
  'Loyer / charges logement',
  'Réparation véhicule',
  'Cérémonie familiale (mariage, baptême...)',
  'Voyage urgent',
  'Factures (eau, électricité, internet)',
  'Autre motif',
]

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
