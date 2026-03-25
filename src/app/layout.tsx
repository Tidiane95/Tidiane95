import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Di Allo Fintech — Acompte de Salaire',
  description: 'Accédez à votre salaire gagné avant la date de paie. Simple, rapide et sécurisé.',
  keywords: ['acompte salaire', 'avance salaire', 'fintech', 'Di Allo', 'Sénégal'],
  authors: [{ name: 'Di Allo Fintech' }],
  openGraph: {
    title: 'Di Allo Fintech — Acompte de Salaire',
    description: 'Accédez à votre salaire gagné avant la date de paie.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
