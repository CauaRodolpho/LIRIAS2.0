import type { ReactNode } from 'react';
import { Footer } from './footer';
import { Navbar } from './navbar';

export function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="marketing-site-canvas min-h-screen">
            <a
                href="#main-content"
                className="fixed top-3 left-4 z-[120] -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0 focus:ring-2 focus:ring-primary-light focus:outline-none"
            >
                Pular para o conteúdo
            </a>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="relative z-10">
                {children}
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}
