import { Link as InertiaLink, router, usePage } from '@inertiajs/react';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

interface RoutePayload {
    name: string;
    params: Record<string, string>;
    query: Record<string, string>;
}

interface LiriasPageProps extends Record<string, unknown> {
    route?: RoutePayload;
}

interface OutletContextValue {
    openNavigation: () => void;
}

const OutletContext = createContext<OutletContextValue>({
    openNavigation: () => undefined,
});

export const Link = InertiaLink;

export function OutletContextProvider({
    value,
    children,
}: {
    value: OutletContextValue;
    children: ReactNode;
}) {
    return (
        <OutletContext.Provider value={value}>
            {children}
        </OutletContext.Provider>
    );
}

export function useOutletContext<T = OutletContextValue>() {
    return useContext(OutletContext) as T;
}

export function useLocation() {
    const { url } = usePage();
    const parsed = useMemo(() => new URL(url, window.location.origin), [url]);

    return {
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
    };
}

export function useNavigate() {
    return (destination: string | number, options?: { replace?: boolean }) => {
        if (typeof destination === 'number') {
            window.history.go(destination);
            return;
        }

        router.visit(destination, { replace: options?.replace ?? false });
    };
}

export function useParams<
    T extends Record<string, string | undefined> = Record<
        string,
        string | undefined
    >,
>() {
    const { props } = usePage<LiriasPageProps>();
    return (props.route?.params ?? {}) as T;
}

export function useSearchParams() {
    const { url } = usePage();
    const params = useMemo(
        () => new URLSearchParams(url.split('?')[1] ?? ''),
        [url],
    );

    function setParams(next: URLSearchParams | Record<string, string>) {
        const search =
            next instanceof URLSearchParams ? next : new URLSearchParams(next);
        router.visit(`${window.location.pathname}?${search.toString()}`, {
            preserveScroll: true,
        });
    }

    return [params, setParams] as const;
}
