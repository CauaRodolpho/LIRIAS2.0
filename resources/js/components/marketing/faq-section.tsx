import Link from '@/components/navigation/app-link';
import { ArrowRight, LifeBuoy } from 'lucide-react';
import { Accordion, AccordionItem } from '@/components/ui';
import { FAQ_DATA } from '@/data';

export function FaqSection() {
    return (
        <section
            className="home-section faq-flow relative overflow-hidden py-20 sm:py-28"
            aria-labelledby="faq-heading"
        >
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="font-mono text-xs tracking-[0.2em] text-primary-light uppercase">
                        Antes de implantar
                    </p>
                    <h2
                        id="faq-heading"
                        className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-4xl lg:text-5xl"
                    >
                        Respostas diretas para decisões técnicas.
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                        VPS, acesso, sistemas, proteção e evolução de recursos
                        explicados sem esconder as limitações do produto.
                    </p>

                    <div className="mt-8 border-l border-primary/40 pl-4">
                        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <LifeBuoy
                                className="h-4 w-4 text-primary-light"
                                aria-hidden="true"
                            />
                            Ainda precisa de ajuda?
                        </p>
                        <Link
                            href="/support"
                            className="trace-link mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary-light"
                        >
                            Abrir central de suporte{' '}
                            <ArrowRight
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>

                <Accordion variant="line" className="self-start">
                    {FAQ_DATA.map((faq, index) => (
                        <AccordionItem
                            key={faq.id}
                            id={faq.id}
                            title={faq.question}
                            prefix={String(index + 1).padStart(2, '0')}
                        >
                            {faq.answer}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
