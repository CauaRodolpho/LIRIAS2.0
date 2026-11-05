import { useState, type ReactNode } from 'react';
import { OutletContextProvider } from '@/lib/routing';
import { DashboardSidebar } from '@/components/dashboard';

export function DashboardLayout({ children }: { children: ReactNode }) {
    const [navigationOpen, setNavigationOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <DashboardSidebar />

            {navigationOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Fechar navegação"
                        className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
                        onClick={() => setNavigationOpen(false)}
                    />
                    <DashboardSidebar
                        className="fixed inset-y-0 left-0 z-50 flex shadow-2xl lg:hidden"
                        onNavigate={() => setNavigationOpen(false)}
                    />
                </>
            )}

            <main
                id="main-content"
                className="flex min-w-0 flex-1 flex-col overflow-hidden"
            >
                <OutletContextProvider
                    value={{ openNavigation: () => setNavigationOpen(true) }}
                >
                    {children}
                </OutletContextProvider>
            </main>
        </div>
    );
}
