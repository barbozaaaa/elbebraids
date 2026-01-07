import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elbe Braids - Salão de Tranças',
  description: 'Salão especializado em tranças. Trança é arte.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}







