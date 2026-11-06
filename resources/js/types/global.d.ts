import type { PageProps } from '@inertiajs/core';

declare module '@inertiajs/core' {
    interface PageProps {
        name?: string;
        auth?: {
            user?: {
                id: number;
                name: string;
                email: string;
            } | null;
        };
    }
}

declare global {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME?: string;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
    }
}

export type InertiaPageProps<
    T extends Record<string, unknown> = Record<string, never>,
> = PageProps & T;

export {};
