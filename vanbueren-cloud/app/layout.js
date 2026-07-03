import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import EmotionRegistry from './EmotionRegistry';
import Providers from './providers';

export const metadata = {
    title: 'Van Bueren - Cloud Dashboard',
    description: 'Cloud Dashboard',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <EmotionRegistry>
                    <Providers>
                        {children}
                    </Providers>
                </EmotionRegistry>
            </body>
        </html>
    );
}
