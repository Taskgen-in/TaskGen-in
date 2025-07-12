import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Taskgen.in',
  description: 'Earn from home with simple micro-tasks. Join TaskGen.in for flexible work, instant payouts, and verified opportunities.',
  generator: 'TaskGen.in',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
