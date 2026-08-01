import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Villa Resort CMS',
  description: 'Payload CMS backend for Villa Resort content.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
