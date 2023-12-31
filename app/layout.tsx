import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TokisakiYuu Space',
  description: 'A hodgepodge of technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cn">
      <body>{children}</body>
    </html>
  )
}
