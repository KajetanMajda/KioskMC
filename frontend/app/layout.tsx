import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Home from './Components/home'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KioskMC',
  description: 'Copy of McDoland\'s Kiosk by s24807',
}

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Home />
      </body>
    </html>
  )
}