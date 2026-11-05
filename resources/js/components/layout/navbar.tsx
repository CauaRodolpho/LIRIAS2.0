import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AppWindow,
    BookOpen,
    Bot,
    Boxes,
    ChevronDown,
    CircleHelp,
    Code2,
    Gauge,
    Menu,
    Rocket,
    Server,
    ShoppingBag,
    Workflow,
    X,
    type LucideIcon,
} from 'lucide-react';
import Link from '@/components/navigation/app-link';
import { BrandMark } from '@/components/shared/brand-mark';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui';
import { NAV_LINKS, SITE_CONFIG } from '@/constants';
import { useScrolled } from '@/hooks';
import { cn } from '@/lib/utils';

type MenuItem = {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
};
type MenuConfig = {
    label: string;
    items: MenuItem[];
    featured: {
        eyebrow: string;
        title: string;
        description: string;
        href: string;
        icon: LucideIcon;
    };
};

const MENUS: Record<string, MenuConfig> = {
    Produtos: {
        label: 'Produtos LIRIAS',
        items: [
            {
                title: 'LIRIAS Deploy',
                description:
                    'Transforme seu projeto em uma configuração de infraestrutura.',
                href: '/deploy',
                icon: Rocket,
                badge: 'Recomendado',
            },
            {
                title: 'VPS Linux',
                description: 'Ambiente flexível para aplicações e serviços.',
                href: '/vps-linux',
                icon: Server,
            },
            {
                title: 'VPS Windows',
                description: 'Rota preparada para servidores Windows.',
                href: '/vps-windows',
                icon: AppWindow,
            },
            {
                title: 'Catálogo de aplicações',
                description:
                    'Explore stacks compatíveis e fluxos demonstrativos.',
                href: '/applications',
                icon: Boxes,
                badge: 'Novo',
            },
        ],
        featured: {
            eyebrow: 'Configuração guiada',
            title: 'Do projeto à infraestrutura',
            description:
                'Defina o cenário e receba uma base de VPS, sistema e stack.',
            href: '/deploy',
            icon: Rocket,
        },
    },
    Soluções: {
        label: 'Soluções por cenário',
        items: [
            {
                title: 'Automação com n8n',
                description: 'Conecte processos, APIs e webhooks.',
                href: '/solutions/automation',
                icon: Workflow,
            },
            {
                title: 'Agentes de IA',
                description: 'Organize runtime, dados e integrações.',
                href: '/solutions/ai-agents',
                icon: Bot,
            },
            {
                title: 'E-commerce',
                description: 'Planeje aplicação, dados e serviços da loja.',
                href: '/solutions/ecommerce',
                icon: ShoppingBag,
            },
        ],
        featured: {
            eyebrow: 'Automação',
            title: 'n8n em uma VPS própria',
            description:
                'Visualize o fluxo de configuração preparado para a futura API.',
            href: '/solutions/automation',
            icon: Workflow,
        },
    },
    Recursos: {
        label: 'Recursos da plataforma',
        items: [
            {
                title: 'Documentação',
                description: 'Guias e exemplos em uma rota dedicada.',
                href: '/docs',
                icon: BookOpen,
            },
            {
                title: 'Status da plataforma',
                description: 'Espaço para disponibilidade e incidentes.',
                href: '/status',
                icon: Gauge,
            },
            {
                title: 'Central de suporte',
                description: 'Acesso organizado aos canais de ajuda.',
                href: '/support',
                icon: CircleHelp,
            },
        ],
        featured: {
            eyebrow: 'Para desenvolvedores',
            title: 'Estrutura pronta para evoluir',
            description:
                'Rotas, contratos e serviços organizados para a integração futura.',
            href: '/developers',
            icon: Code2,
        },
    },
};

export function Navbar() {
    const scrolled = useScrolled(20);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSection, setMobileSection] = useState<string | null>(
        'Produtos',
    );
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!mobileOpen) return;

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const applicationRoot = document.getElementById('root');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        applicationRoot?.setAttribute('inert', '');
        applicationRoot?.setAttribute('aria-hidden', 'true');

        const handleKeyboard = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileOpen(false);
                return;
            }
            if (event.key !== 'Tab') return;

            const drawer = document.getElementById('mobile-navigation-drawer');
            const focusable = Array.from(
                drawer?.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ) ?? [],
            );
            if (focusable.length === 0) return;

            const first = focusable.at(0);
            const last = focusable.at(-1);
            if (!first || !last) return;

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        const desktopBreakpoint = window.matchMedia('(min-width: 1024px)');
        const closeOnDesktop = (event: MediaQueryListEvent) => {
            if (event.matches) setMobileOpen(false);
        };

        window.addEventListener('keydown', handleKeyboard);
        desktopBreakpoint.addEventListener('change', closeOnDesktop);
        window.requestAnimationFrame(() => closeButtonRef.current?.focus());

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            applicationRoot?.removeAttribute('inert');
            applicationRoot?.removeAttribute('aria-hidden');
            window.removeEventListener('keydown', handleKeyboard);
            menuButtonRef.current?.focus();
            desktopBreakpoint.removeEventListener('change', closeOnDesktop);
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!activeMenu) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setActiveMenu(null);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [activeMenu]);

    function openMobileMenu() {
        setActiveMenu(null);
        setMobileOpen(true);
    }

    function closeMobileMenu() {
        setMobileOpen(false);
    }

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
                    scrolled || activeMenu || mobileOpen
                        ? 'border-b border-border bg-background/90 shadow-navbar backdrop-blur-xl'
                        : 'bg-transparent',
                )}
                onMouseLeave={() => setActiveMenu(null)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                        setActiveMenu(null);
                }}
            >
                <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        aria-label={`${SITE_CONFIG.name} — Início`}
                    >
                        <BrandMark />
                        <span className="font-display text-lg font-bold tracking-tight text-foreground">
                            LIRIAS
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {NAV_LINKS.map((link) =>
                            link.children ? (
                                <button
                                    key={link.label}
                                    type="button"
                                    onMouseEnter={() =>
                                        setActiveMenu(link.label)
                                    }
                                    onFocus={() => setActiveMenu(link.label)}
                                    onClick={() =>
                                        setActiveMenu(
                                            activeMenu === link.label
                                                ? null
                                                : link.label,
                                        )
                                    }
                                    className={cn(
                                        'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        activeMenu === link.label
                                            ? 'bg-accent text-foreground'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                    aria-expanded={activeMenu === link.label}
                                    aria-haspopup="true"
                                >
                                    {link.label}
                                    <ChevronDown
                                        className={cn(
                                            'h-3.5 w-3.5 transition-transform',
                                            activeMenu === link.label
                                                ? 'rotate-180'
                                                : '',
                                        )}
                                    />
                                </button>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onMouseEnter={() => setActiveMenu(null)}
                                    className="trace-link rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            ),
                        )}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <ThemeToggle />
                        <Link
                            href="/login"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            Login
                        </Link>
                        <Button asChild size="sm">
                            <Link href="/register">Criar conta</Link>
                        </Button>
                    </div>
                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-transparent text-foreground transition-colors hover:border-border hover:bg-card lg:hidden"
                        onClick={openMobileMenu}
                        aria-label="Abrir menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation-drawer"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </nav>

                <DesktopMegaMenu
                    activeMenu={activeMenu}
                    onClose={() => setActiveMenu(null)}
                />
            </header>

            {typeof document !== 'undefined'
                ? createPortal(
                      <AnimatePresence>
                          {mobileOpen ? (
                              <MobileNavigationDrawer
                                  closeButtonRef={closeButtonRef}
                                  expandedSection={mobileSection}
                                  onSectionChange={setMobileSection}
                                  onClose={closeMobileMenu}
                              />
                          ) : null}
                      </AnimatePresence>,
                      document.body,
                  )
                : null}
        </>
    );
}

function DesktopMegaMenu({
    activeMenu,
    onClose,
}: {
    activeMenu: string | null;
    onClose: () => void;
}) {
    const menu = activeMenu ? MENUS[activeMenu] : undefined;
    if (!activeMenu || !menu) return null;

    const feature = menu.featured;
    const FeatureIcon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full hidden px-4 pt-2 lg:block"
        >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_300px] gap-4 rounded-lg border border-border bg-card p-5">
                <div>
                    <p className="px-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                        {menu.label}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        {menu.items.map(
                            ({
                                title,
                                description,
                                href,
                                icon: Icon,
                                badge,
                            }) => (
                                <Link
                                    key={title}
                                    href={href}
                                    onClick={onClose}
                                    className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-accent"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary-light">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                            {title}
                                            {badge ? (
                                                <BadgeLabel>{badge}</BadgeLabel>
                                            ) : null}
                                        </span>
                                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                            {description}
                                        </span>
                                    </span>
                                </Link>
                            ),
                        )}
                    </div>
                </div>
                <Link
                    href={feature.href}
                    onClick={onClose}
                    className="group relative overflow-hidden rounded-lg border border-border bg-background-secondary p-5"
                >
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-background text-primary-light">
                        <FeatureIcon className="h-5 w-5" />
                    </span>
                    <p className="relative mt-8 font-mono text-[10px] tracking-[0.16em] text-primary-light uppercase">
                        {feature.eyebrow}
                    </p>
                    <p className="relative mt-2 font-semibold text-foreground">
                        {feature.title}
                    </p>
                    <p className="relative mt-2 text-xs leading-5 text-muted-foreground">
                        {feature.description}
                    </p>
                    <span className="relative mt-5 inline-flex text-sm font-semibold text-primary-light">
                        Explorar →
                    </span>
                </Link>
            </div>
        </motion.div>
    );
}

function MobileNavigationDrawer({
    closeButtonRef,
    expandedSection,
    onSectionChange,
    onClose,
}: {
    closeButtonRef: RefObject<HTMLButtonElement | null>;
    expandedSection: string | null;
    onSectionChange: (section: string | null) => void;
    onClose: () => void;
}) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
        >
            <button
                type="button"
                className="absolute inset-0 bg-overlay/55 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Fechar menu"
            />

            <motion.aside
                id="mobile-navigation-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Navegação principal"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                className="absolute inset-y-0 right-0 flex h-[100dvh] w-[min(92vw,420px)] flex-col border-l border-border bg-background shadow-2xl"
            >
                <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border px-4">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-2 rounded-lg"
                        aria-label="LIRIAS — Início"
                    >
                        <BrandMark />
                        <span className="font-display text-lg font-bold tracking-tight text-foreground">
                            LIRIAS
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-card-hover"
                            aria-label="Fechar menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-3 py-4 [-webkit-overflow-scrolling:touch]">
                    <div className="space-y-2">
                        {NAV_LINKS.map((link) => {
                            const menu = link.children
                                ? MENUS[link.label]
                                : undefined;
                            if (!link.children || !menu) {
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={onClose}
                                        className="flex min-h-12 items-center rounded-lg px-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                                    >
                                        {link.label}
                                    </Link>
                                );
                            }

                            const expanded = expandedSection === link.label;
                            return (
                                <section
                                    key={link.label}
                                    className="overflow-hidden rounded-lg border border-border bg-card"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onSectionChange(
                                                expanded ? null : link.label,
                                            )
                                        }
                                        aria-expanded={expanded}
                                        aria-controls={`mobile-section-${link.label}`}
                                        className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left"
                                    >
                                        <span>
                                            <span className="block text-sm font-semibold text-foreground">
                                                {link.label}
                                            </span>
                                            <span className="mt-0.5 block text-[11px] text-muted-foreground">
                                                {menu.label}
                                            </span>
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                                                expanded ? 'rotate-180' : '',
                                            )}
                                        />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {expanded ? (
                                            <motion.div
                                                id={`mobile-section-${link.label}`}
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-1 border-t border-border p-2">
                                                    {menu.items.map(
                                                        ({
                                                            title,
                                                            description,
                                                            href,
                                                            icon: Icon,
                                                            badge,
                                                        }) => (
                                                            <Link
                                                                key={title}
                                                                href={href}
                                                                onClick={
                                                                    onClose
                                                                }
                                                                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                                                            >
                                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary-light">
                                                                    <Icon className="h-4 w-4" />
                                                                </span>
                                                                <span className="min-w-0 flex-1">
                                                                    <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                                                                        {title}
                                                                        {badge ? (
                                                                            <BadgeLabel>
                                                                                {
                                                                                    badge
                                                                                }
                                                                            </BadgeLabel>
                                                                        ) : null}
                                                                    </span>
                                                                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                                                        {
                                                                            description
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                </section>
                            );
                        })}
                    </div>
                </div>

                <div className="shrink-0 border-t border-border bg-background px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" asChild>
                            <Link href="/login" onClick={onClose}>
                                Login
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register" onClick={onClose}>
                                Criar conta
                            </Link>
                        </Button>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-muted-foreground">
                        Navegação LIRIAS · Protótipo front-end
                    </p>
                </div>
            </motion.aside>
        </motion.div>
    );
}

function BadgeLabel({ children }: { children: string }) {
    return (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-light">
            {children}
        </span>
    );
}
