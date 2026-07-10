import packageJson from '../package.json'
import Providers from './providers'

const PROJECT_NAME = packageJson.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const metadata = {
    title: PROJECT_NAME,
    description: `${PROJECT_NAME} - A decentralized, zero-storage automotive maintenance logging and predictive forecasting tool powered by your own Google Drive.`,
    icons: {
        icon: [
            { url: '/icon/icon0.svg', type: 'image/svg+xml' },
            { url: '/icon/icon1.png', type: 'image/png' },
        ],
        shortcut: '/icon/favicon.ico',
        apple: '/icon/apple-icon.png',
    },
    manifest: '/icon/manifest.json',
    appleWebApp: {
        title: PROJECT_NAME,
    },
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
