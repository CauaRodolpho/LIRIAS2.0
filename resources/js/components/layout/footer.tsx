import Link from '@/components/navigation/app-link';
import { Activity, ChevronDown } from 'lucide-react';
import { FOOTER_LINKS, SITE_CONFIG } from '@/constants';
import { BrandMark } from '@/components/shared/brand-mark';

const columns = [
    { title: 'Empresa', links: FOOTER_LINKS.empresa },
    { title: 'Produtos', links: FOOTER_LINKS.produtos },
    { title: 'Suporte', links: FOOTER_LINKS.suporte },
    { title: 'Legal', links: FOOTER_LINKS.legal },
];

const infrastructure = ['São Paulo', 'KVM', 'NVMe', 'IPv4 / IPv6'];

function LinkColumn({ title, links }: (typeof columns)[number]) {
    return (
        <div>
            <h3 className="font-mono text-[10px] font-medium tracking-[0.17em] text-foreground uppercase">
                {title}
            </h3>
            <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="trace-link text-sm text-muted-foreground hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="site-footer relative bg-transparent">
            <div
                className="site-footer-entry mx-auto h-px max-w-7xl"
                aria-hidden="true"
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="site-footer-rail flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-success-light">
                        <span
                            className="signal-pulse h-1.5 w-1.5 rounded-full bg-success text-success"
                            aria-hidden="true"
                        />
                        <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="font-medium">
                            Infraestrutura nacional operacional
                        </span>
                    </div>

                    <ul
                        className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.13em] text-muted-foreground uppercase"
                        aria-label="Base técnica LIRIAS"
                    >
                        {infrastructure.map((item, index) => (
                            <li key={item} className="flex items-center gap-5">
                                {index > 0 && (
                                    <span
                                        className="hidden h-1 w-1 bg-primary/45 sm:block"
                                        aria-hidden="true"
                                    />
                                )}
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid gap-12 py-10 lg:grid-cols-[1.05fr_2.15fr] lg:gap-24 lg:py-12">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5"
                            aria-label="LIRIAS — Início"
                        >
                            <BrandMark />
                            <span className="font-display text-xl font-bold tracking-[0.13em] text-foreground">
                                LIRIAS
                            </span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                            Infraestrutura VPS nacional para configurar, operar
                            e evoluir projetos com clareza.
                        </p>
                        <p className="mt-6 max-w-xs font-mono text-[10px] leading-5 tracking-[0.14em] text-muted-foreground uppercase">
                            Operação local · São Paulo, Brasil
                        </p>
                    </div>

                    <nav aria-label="Links do rodapé">
                        <div className="hidden grid-cols-4 gap-x-10 md:grid">
                            {columns.map((column) => (
                                <LinkColumn key={column.title} {...column} />
                            ))}
                        </div>

                        <div className="divide-y divide-border/60 border-y border-border/60 md:hidden">
                            {columns.map((column) => (
                                <details key={column.title} className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-mono text-[10px] font-medium tracking-[0.17em] text-foreground uppercase">
                                        {column.title}
                                        <ChevronDown
                                            className="h-4 w-4 text-muted-foreground group-open:rotate-180"
                                            aria-hidden="true"
                                        />
                                    </summary>
                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pb-5">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="site-footer-meta flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos
                        os direitos reservados.
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <Link href="/privacy" className="hover:text-foreground">
                            Privacidade
                        </Link>
                        <Link href="/terms" className="hover:text-foreground">
                            Termos
                        </Link>
                        <Link href="/sla" className="hover:text-foreground">
                            SLA
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
