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
 * Introduz os filhos diretos em uma sequência curta e única.
 * Sem escala ou reversão: a lista permanece estável depois de apresentada.
 */
export function ScrollStagger({
    children,
    className,
    stagger = motionTokens.stagger,
    y = motionTokens.distance.reveal,
}: {
    children: ReactNode;
    className?: string;
    stagger?: number;
    y?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        ensureGsapRegistered();
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                Array.from(el.children),
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration: motionTokens.duration.reveal,
                    stagger,
                    ease: motionTokens.gsapEase,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 86%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                },
            );
        }, ref);

        return () => ctx.revert();
    }, [stagger, y]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
