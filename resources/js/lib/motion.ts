export const motionTokens = {
    duration: {
        fast: 0.18,
        base: 0.28,
        reveal: 0.5,
    },
    distance: {
        subtle: 8,
        reveal: 12,
    },
    stagger: 0.05,
    ease: [0.22, 1, 0.36, 1] as const,
    gsapEase: 'power2.out',
} as const;

export const enterTransition = {
    duration: motionTokens.duration.base,
    ease: motionTokens.ease,
} as const;
