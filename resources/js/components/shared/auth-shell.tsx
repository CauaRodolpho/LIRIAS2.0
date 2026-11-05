import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Server,
    ServerCog,
    ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from '@/components/navigation/app-link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AnimatedGridBackground } from './animated-grid-background';
import { BrandMark } from './brand-mark';
import { ThemeToggle } from './theme-toggle';

export type AuthMode = 'login' | 'register';

function useDesktopLayout() {
    const [desktop, setDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)');
        const update = () => setDesktop(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    return desktop;
}

export function AuthShell({
    mode,
    onModeChange,
    children,
}: {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
    children: React.ReactNode;
}) {
    const isDesktop = useDesktopLayout();
    const reducedMotion = useReducedMotion();
    const isLogin = mode === 'login';
    const duration = reducedMotion ? 0 : 0.48;
    const direction = isLogin ? -1 : 1;

    return (
        <main
            id="main-content"
            className="auth-page relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6"
        >
            <AnimatedGridBackground />

            <div className="absolute top-4 left-4 z-30 sm:top-6 sm:left-6">
                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    <Link href="/">Voltar ao início</Link>
                </Button>
            </div>
            <div className="absolute top-4 right-4 z-30 sm:top-6 sm:right-6">
                <ThemeToggle />
            </div>

            <section
                className="auth-switch-card relative z-10 w-full max-w-5xl overflow-hidden border border-border bg-card shadow-card-hover"
                aria-label={isLogin ? 'Acesso à conta' : 'Criação de conta'}
            >
                <motion.div
                    className={cn(
                        'auth-form-panel relative z-10 flex w-full items-start bg-card px-5 py-8 sm:px-10 md:absolute md:inset-y-0 md:left-0 md:w-1/2 md:overflow-y-auto lg:px-14',
                        isLogin && 'md:items-center',
                    )}
                    animate={{ x: isDesktop && !isLogin ? '100%' : '0%' }}
                    transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="mx-auto w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-7 flex w-fit items-center gap-3"
                            aria-label="LIRIAS — Página inicial"
                        >
                            <BrandMark className="h-9 w-9" />
                            <span className="font-display text-lg font-semibold tracking-[0.2em] text-foreground">
                                LIRIAS
                            </span>
                        </Link>

                        <AnimatePresence
                            mode="wait"
                            initial={false}
                            custom={direction}
                        >
                            <motion.div
                                key={mode}
                                custom={direction}
                                variants={{
                                    enter: (travel: number) => ({
                                        opacity: 0,
                                        x: reducedMotion ? 0 : travel * 28,
                                    }),
                                    center: { opacity: 1, x: 0 },
                                    exit: (travel: number) => ({
                                        opacity: 0,
                                        x: reducedMotion ? 0 : travel * -22,
                                    }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: reducedMotion ? 0 : 0.28,
                                    ease: 'easeOut',
                                }}
                            >
                                <div className="mb-7">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary-light">
                                        <Server className="h-3.5 w-3.5" />
                                        Área do cliente
                                    </span>
                                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                        {isLogin
                                            ? 'Acesse sua conta'
                                            : 'Crie sua conta'}
                                    </h1>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {isLogin
                                            ? 'Entre para acompanhar e gerenciar sua infraestrutura.'
                                            : 'Cadastre seus dados para preparar seu primeiro ambiente.'}
                                    </p>
                                </div>
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.aside
                    className="auth-visual-panel relative z-20 order-first flex w-full flex-col justify-center overflow-hidden bg-primary px-7 py-9 text-primary-foreground md:absolute md:inset-y-0 md:left-0 md:w-1/2 md:px-12"
                    animate={{ x: isDesktop && isLogin ? '100%' : '0%' }}
                    transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div
                        className="auth-panel-pattern pointer-events-none absolute inset-0 opacity-60"
                        aria-hidden="true"
                    />

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={mode}
                            initial={
                                reducedMotion
                                    ? false
                                    : { opacity: 0, x: isLogin ? 24 : -24 }
                            }
                            animate={{ opacity: 1, x: 0 }}
                            exit={
                                reducedMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, x: isLogin ? -24 : 24 }
                            }
                            transition={{
                                duration: reducedMotion ? 0 : 0.3,
                                delay: reducedMotion ? 0 : 0.1,
                            }}
                            className="relative z-10 max-w-sm"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                                {isLogin ? (
                                    <ServerCog className="h-5 w-5" />
                                ) : (
                                    <ShieldCheck className="h-5 w-5" />
                                )}
                            </span>
                            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
                                {isLogin
                                    ? 'Novo por aqui?'
                                    : 'Bem-vindo de volta'}
                            </h2>
                            <p className="mt-3 text-sm leading-6 opacity-80 sm:text-base">
                                {isLogin
                                    ? 'Crie sua conta e centralize servidores, segurança e monitoramento em um só painel.'
                                    : 'Se você já possui uma conta, entre para continuar gerenciando sua infraestrutura.'}
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    onModeChange(isLogin ? 'register' : 'login')
                                }
                                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-white"
                            >
                                {isLogin ? 'Criar conta' : 'Fazer login'}
                                <ArrowRight
                                    className={cn(
                                        'h-4 w-4 transition-transform',
                                        !isLogin && 'rotate-180',
                                    )}
                                />
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </motion.aside>
            </section>
        </main>
    );
}
