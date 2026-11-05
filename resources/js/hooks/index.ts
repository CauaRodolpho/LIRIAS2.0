'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

// ─── useScrolled ─────────────────────────────────────────────
// Detects if page has scrolled past a threshold (for navbar blur effect)

export function useScrolled(threshold = 20): boolean {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return scrolled;
}

// ─── useCountUp ──────────────────────────────────────────────
// Animates a number counting up when it enters the viewport

export function useCountUp(
    target: number,
    duration = 2000,
    startWhenVisible = true,
) {
    const [value, setValue] = useState(startWhenVisible ? 0 : target);
    const [isVisible, setIsVisible] = useState(!startWhenVisible);
    const ref = useRef<HTMLElement | null>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!startWhenVisible || !ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.3 },
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startWhenVisible]);

    useEffect(() => {
        if (!isVisible) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
            return;
        }

        let startTime: number | null = null;
        let frameId: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target * 100) / 100);
            if (progress < 1) frameId = requestAnimationFrame(step);
        };

        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [isVisible, target, duration]);

    return { value, ref };
}

// ─── useMediaQuery ───────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

// ─── useMounted ──────────────────────────────────────────────
// Avoids hydration mismatches for client-only rendering

export function useMounted(): boolean {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

// ─── useDebounce ─────────────────────────────────────────────

export function useDebounce<T>(value: T, delay = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

// ─── useLocalStorage ─────────────────────────────────────────
// Note: guarded for SSR; falls back gracefully

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const mounted = useMounted();

    useEffect(() => {
        if (!mounted) return;
        try {
            const item = window.localStorage.getItem(key);
            if (item) setStoredValue(JSON.parse(item));
        } catch {
            setStoredValue(initialValue);
        }
    }, [key, mounted, initialValue]);

    const setValue = useCallback(
        (value: T) => {
            try {
                setStoredValue(value);
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch {
                // silent fail — storage unavailable
            }
        },
        [key],
    );

    return [storedValue, setValue] as const;
}

// ─── useOnClickOutside ───────────────────────────────────────

export function useOnClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: () => void,
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node))
                return;
            handler();
        };
        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    }, [ref, handler]);
}

// ─── useLiveMetric ───────────────────────────────────────────
// Updates demo metrics only while the page is visible and motion is allowed.

export function useLiveMetric(
    base: number,
    variance: number,
    intervalMs = 3600,
) {
    const [value, setValue] = useState(base);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        let intervalId: number | undefined;

        const tick = () => {
            setValue((current) => {
                const next = current + (Math.random() * 2 - 1) * variance;
                return Math.min(96, Math.max(4, Math.round(next)));
            });
        };

        const stop = () => {
            if (intervalId !== undefined) {
                window.clearInterval(intervalId);
                intervalId = undefined;
            }
        };

        const sync = () => {
            if (document.hidden || reducedMotion.matches) {
                stop();
                return;
            }
            if (intervalId === undefined)
                intervalId = window.setInterval(tick, intervalMs);
        };

        setValue(base);
        sync();
        document.addEventListener('visibilitychange', sync);
        reducedMotion.addEventListener('change', sync);

        return () => {
            stop();
            document.removeEventListener('visibilitychange', sync);
            reducedMotion.removeEventListener('change', sync);
        };
    }, [base, variance, intervalMs]);

    return value;
}
