import Providers from './providers'

export const metadata = {
    title: 'Gasket Case',
    description: 'A decentralized, zero-storage automotive maintenance logging and predictive forecasting tool powered by your own Google Drive.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
