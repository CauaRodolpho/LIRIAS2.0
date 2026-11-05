import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { Link } from '@inertiajs/react';

export interface AppLinkProps extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
> {
    href: string;
    children: ReactNode;
}

/**
 * Adaptador temporário de navegação para a prévia Vite.
 * No Laravel, troque apenas a implementação interna por Link de @inertiajs/react.
 */
export default function AppLink({ href, children, ...props }: AppLinkProps) {
    const isExternal = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href);

    if (isExternal) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} {...(props as ComponentProps<typeof Link>)}>
            {children}
        </Link>
    );
}
