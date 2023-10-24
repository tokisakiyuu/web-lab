import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '延迟跟随鼠标的小球',
  description: '实验性项目',
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
