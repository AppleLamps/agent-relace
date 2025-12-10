import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Relace Chat - AI Codebase Assistant',
  description: 'Chat with AI about your GitHub codebase',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

