// app/layout.tsx
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

export const metadata: Metadata = {
  title: 'Food Supply Tracking — Sindh Region | FAO/WFP',
  description: 'Humanitarian logistics monitoring system for food supply tracking across Sindh, Pakistan. Aligned with FAO/WFP international standards.',
  keywords: ['food security', 'Sindh', 'Pakistan', 'FAO', 'WFP', 'humanitarian', 'supply chain'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-sage-50 text-forest-900 antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-sage-50 via-white to-forest-50">
              <div className="page-enter p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
