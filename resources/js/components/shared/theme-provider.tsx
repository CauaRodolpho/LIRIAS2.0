import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme !== 'system') return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem('lirias-theme');
        return stored === 'light' || stored === 'dark' || stored === 'system'
            ? stored
            : 'system';
    });
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
        resolveTheme(theme),
    );

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = () => {
            const resolved = resolveTheme(theme);
            setResolvedTheme(resolved);
            document.documentElement.classList.toggle(
                'dark',
                resolved === 'dark',
            );
            document.documentElement.style.colorScheme = resolved;
        };

        applyTheme();
        media.addEventListener('change', applyTheme);
        return () => media.removeEventListener('change', applyTheme);
    }, [theme]);

    const setTheme = (nextTheme: Theme) => {
        localStorage.setItem('lirias-theme', nextTheme);
        setThemeState(nextTheme);
    };

    const value = useMemo(
        () => ({ theme, resolvedTheme, setTheme }),
        [theme, resolvedTheme],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useTheme precisa estar dentro de ThemeProvider');
    return context;
}
