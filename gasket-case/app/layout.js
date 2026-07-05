import { Outfit, Inter } from 'next/font/google'
import EmotionRegistry from './EmotionRegistry'
import Providers from './providers'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'GasketCase - Privacy-First Automotive Maintenance Timeline',
  description: 'A decentralized, zero-storage automotive maintenance log and predictive forecasting application powered by your own Google Drive.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <EmotionRegistry>
          <Providers>
            {children}
          </Providers>
        </EmotionRegistry>
      </body>
    </html>
  )
}
