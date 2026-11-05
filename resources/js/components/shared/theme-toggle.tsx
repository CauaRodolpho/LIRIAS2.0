'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/shared/theme-provider';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const OPTIONS = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
] as const;

type ThemeValue = (typeof OPTIONS)[number]['value'];

export interface ThemeToggleProps {
    /** 'icon' = botão compacto com dropdown (padrão, ideal para navbars).
     *  'inline' = variante expandida com o rótulo "Alternar tema" visível. */
    variant?: 'icon' | 'inline';
    className?: string;
}

export function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Evita mismatch de hidratação: só renderiza o ícone real após montar no client.
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const activeValue = (mounted ? theme : 'system') as ThemeValue;
    const ActiveIcon =
        OPTIONS.find((o) => o.value === activeValue)?.icon ??
        (resolvedTheme === 'dark' ? Moon : Sun);

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Alternar tema"
                className={cn(
                    variant === 'icon'
                        ? 'flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background-tertiary/40 text-foreground transition-colors hover:border-border-hover hover:bg-accent'
                        : 'flex items-center gap-2 rounded-lg border border-border bg-background-tertiary/40 px-3 py-2 text-foreground transition-colors hover:border-border-hover hover:bg-accent',
                    className,
                )}
            >
                {mounted ? (
                    <ActiveIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <span className="h-4 w-4" aria-hidden="true" />
                )}
                {variant === 'inline' && (
                    <span className="text-sm font-medium">Alternar tema</span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        role="menu"
                        aria-label="Selecionar tema"
                        className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-card-hover"
                    >
                        {OPTIONS.map(({ value, label, icon: Icon }) => {
                            const isActive = mounted && theme === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={isActive}
                                    onClick={() => {
                                        setTheme(value);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                                        isActive
                                            ? 'bg-primary/10 font-medium text-primary-light'
                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                                    )}
                                >
                                    <Icon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    <span className="flex-1 text-left">
                                        {label}
                                    </span>
                                    {isActive && (
                                        <Check
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/** Mantido por compatibilidade com chamadas existentes (auth forms). */
export function ThemeToggleButton({ className }: { className?: string }) {
    return <ThemeToggle variant="inline" className={className} />;
}
