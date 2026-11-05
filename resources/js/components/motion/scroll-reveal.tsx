'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ensureGsapRegistered, gsap } from '@/lib/gsap';
import { motionTokens } from '@/lib/motion';

function prefersReducedMotion() {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

/**
 * Revela um bloco uma única vez ao entrar na viewport.
 * O movimento curto mantém a hierarquia sem disputar atenção com o conteúdo.
 */
export function ScrollReveal({
    children,
    className,
    y = motionTokens.distance.reveal,
    delay = 0,
    duration = motionTokens.duration.reveal,
}: {
    children: ReactNode;
    className?: string;
    y?: number;
    delay?: number;
    duration?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        ensureGsapRegistered();
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: motionTokens.gsapEase,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                },
            );
        }, ref);

        return () => ctx.revert();
    }, [y, delay, duration]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
