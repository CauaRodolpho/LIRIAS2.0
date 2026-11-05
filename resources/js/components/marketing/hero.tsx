import Link from '@/components/navigation/app-link';
import { ArrowRight, CheckCircle2, MapPin, Server } from 'lucide-react';
import { Button } from '@/components/ui';
import { AnimatedGridBackground } from '@/components/shared';
import { HeroMotion } from './hero-motion';
import { ProvisioningPreview } from './hero-dashboard-preview';
import { Container, Section } from './section';

export function Hero() {
    return (
        <Section
            className="hero-background home-flow-hero relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-32"
            aria-labelledby="hero-heading"
        >
            <AnimatedGridBackground className="hero-main-grid" />
            <Container>
                <div className="relative z-10 w-full">
                    <HeroMotion>
                        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,.86fr)_minmax(520px,1.14fr)] lg:gap-10 xl:gap-20">
                            <div className="max-w-2xl text-left">
                                <span className="inline-flex items-center gap-2 border border-border bg-card/80 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-sm sm:px-4">
                                    <span
                                        className="signal-pulse h-2 w-2 rounded-full bg-success text-success"
                                        aria-hidden="true"
                                    />
                                    Infraestrutura nacional disponível
                                </span>

                                <h1
                                    id="hero-heading"
                                    className="mt-7 text-4xl leading-[1.02] font-semibold tracking-[-0.05em] text-balance text-foreground sm:text-5xl md:text-6xl xl:text-7xl"
                                >
                                    Infraestrutura VPS
                                    <span className="mt-2 block text-primary">
                                        sob seu controle.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                    Servidores virtuais no Brasil com recursos
                                    dedicados, armazenamento NVMe e um painel
                                    direto para acompanhar sua operação.
                                </p>

                                <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
                                    <Button
                                        size="lg"
                                        variant="primary"
                                        className="hero-cta bg-primary bg-none shadow-none hover:bg-primary-hover hover:shadow-none"
                                        rightIcon={
                                            <ArrowRight
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        }
                                        asChild
                                    >
                                        <Link href="/deploy">
                                            Criar minha VPS
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="hero-cta bg-background-secondary/80 backdrop-blur-sm"
                                        asChild
                                    >
                                        <Link href="/pricing">Ver planos</Link>
                                    </Button>
                                </div>

                                <ul
                                    className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground"
                                    aria-label="Diferenciais da infraestrutura"
                                >
                                    <li className="flex items-center gap-2">
                                        <MapPin
                                            className="h-4 w-4 text-primary-light"
                                            aria-hidden="true"
                                        />
                                        Datacenter em São Paulo
                                    </li>
                                    {[
                                        'Virtualização KVM',
                                        'Armazenamento NVMe',
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle2
                                                className="h-4 w-4 text-primary-light"
                                                aria-hidden="true"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                                    <Server
                                        className="h-3.5 w-3.5 text-primary-light"
                                        aria-hidden="true"
                                    />
                                    Linux e Windows · Acesso root · Proteção de
                                    rede
                                </p>
                            </div>

                            <div className="relative mx-auto w-full max-w-2xl lg:translate-x-5 xl:translate-x-8">
                                <ProvisioningPreview />
                            </div>
                        </div>
                    </HeroMotion>
                </div>
            </Container>
        </Section>
    );
}
