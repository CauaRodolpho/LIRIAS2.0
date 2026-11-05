import { useLocation } from '@/lib/routing';

export function useCurrentPath() {
    return useLocation().pathname;
}
