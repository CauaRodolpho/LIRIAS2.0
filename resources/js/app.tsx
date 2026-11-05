import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'LIRIAS';

void createInertiaApp({
    title: (title) => (title ? `${title} — ${appName}` : appName),
    setup({ el, App, props }) {
        createRoot(el!).render(
            <StrictMode>
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
                >
                    Pular para o conteúdo principal
                </a>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: { color: '#a855f7' },
});
