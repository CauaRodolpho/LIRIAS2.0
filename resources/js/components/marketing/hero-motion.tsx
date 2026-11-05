'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function HeroMotion({ children }: { children: ReactNode }) {
    const reduced = useReducedMotion();

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
                reduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }
            }
            className="flex w-full min-w-0 flex-col items-center"
        >
            {children}
        </motion.div>
    );
}
