import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TaskGen.in',
  description: "India's most trusted work-from-home micro-task platform. Earn money with simple tasks, anytime, anywhere.",
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
