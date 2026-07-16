'use client'

import EmotionRegistry from './EmotionRegistry'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import theme from './theme'
import { Analytics } from "@vercel/analytics/next"

export default function Providers({ children }) {
    return (
        <EmotionRegistry>
            <SessionProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                    <Analytics />
                </ThemeProvider>
            </SessionProvider>
        </EmotionRegistry>
    )
}