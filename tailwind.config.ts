/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './resources/js/**/*.{js,ts,vue}',
        './resources/views/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                // ---------------------------------------------------------------
                // Tokens semânticos (shadcn-style) — fonte da verdade do tema
                // ---------------------------------------------------------------
                border: {
                    DEFAULT: 'hsl(var(--border))',
                    hover: 'hsl(var(--border-hover))',
                    active: 'hsl(var(--border-active))',
                },
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: {
                    DEFAULT: 'hsl(var(--background))',
                    secondary: 'hsl(var(--background-secondary))',
                    tertiary: 'hsl(var(--background-tertiary))',
                },
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    hover: 'hsl(var(--primary-hover))',
                    light: 'hsl(var(--primary-light))',
                    dark: 'hsl(var(--primary-hover))',
                    foreground: 'hsl(var(--primary-foreground))',
                    glow: 'hsl(var(--primary) / 0.3)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    hover: 'hsl(var(--secondary-hover))',
                    light: 'hsl(var(--secondary-light))',
                    foreground: 'hsl(var(--secondary-foreground))',
                    glow: 'hsl(var(--secondary) / 0.3)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                    hover: 'hsl(var(--card-hover))',
                    border: 'hsl(var(--border))',
                },
                // Overlay neutro, substitui o antigo "white/5" fixo (quebrava no tema claro)
                overlay: 'hsl(var(--overlay))',
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    light: 'hsl(var(--success-light))',
                    foreground: 'hsl(var(--success-foreground))',
                    glow: 'hsl(var(--success) / 0.3)',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    light: 'hsl(var(--warning-light))',
                    foreground: 'hsl(var(--warning-foreground))',
                },
                danger: {
                    DEFAULT: 'hsl(var(--danger))',
                    light: 'hsl(var(--danger-light))',
                    foreground: 'hsl(var(--danger-foreground))',
                },
            },
            fontFamily: {
                sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
                display: ['Instrument Sans', 'system-ui', 'sans-serif'],
                mono: [
                    'var(--font-mono)',
                    'JetBrains Mono',
                    'Fira Code',
                    'monospace',
                ],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-primary':
                    'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                'gradient-dark':
                    'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background-secondary)) 100%)',
                'hero-glow':
                    'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.3), transparent)',
                'card-shine':
                    'linear-gradient(135deg, hsl(var(--overlay) / 0.05) 0%, transparent 50%)',
                'mesh-purple':
                    'radial-gradient(at 40% 20%, hsl(var(--primary) / 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(var(--secondary) / 0.15) 0px, transparent 50%)',
            },
            boxShadow: {
                'glow-primary': '0 0 40px hsl(var(--primary) / 0.3)',
                'glow-secondary': '0 0 40px hsl(var(--secondary) / 0.3)',
                'glow-success': '0 0 30px hsl(var(--success) / 0.2)',
                card: '0 1px 3px hsl(var(--overlay) / 0.08), 0 0 0 1px hsl(var(--border))',
                'card-hover':
                    '0 8px 32px hsl(var(--overlay) / 0.12), 0 0 0 1px hsl(var(--primary) / 0.2)',
                navbar: '0 1px 0 hsl(var(--border))',
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.4s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
                float: 'float 6s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                counter: 'counter 2s ease-out',
                shimmer: 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' },
                    '100%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.5)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            borderRadius: {
                xl: '1rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
            },
            height: {
                '13': '3.25rem',
                '18': '4.5rem',
            },
            width: {
                '13': '3.25rem',
            },
            screens: {
                xs: '375px',
                '3xl': '1920px',
                '4k': '2560px',
            },
        },
    },
    plugins: [],
};
