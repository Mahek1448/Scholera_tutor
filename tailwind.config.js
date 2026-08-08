/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                // ─── Light theme surfaces ───────────────────────────────
                background: 'var(--bg)',
                surface: 'var(--surface)',
                'surface-2': 'var(--surface-2)',
                'surface-3': 'var(--surface-3)',
                border: 'var(--border)',
                'border-light': 'var(--border-light)',

                // ─── Forest teal primary ────────────────────────────────
                primary: {
                    50: '#EDFAF4',
                    100: '#D4F4E5',
                    200: '#A6E8CB',
                    300: '#6DD5A9',
                    400: '#38B985',
                    500: '#1A9E6D',
                    600: '#137F57',
                    700: '#106548',
                    800: '#0D4F39',
                    900: '#0A3D2D',
                },

                // ─── Terracotta accent ──────────────────────────────────
                accent: {
                    50: '#FDF4EF',
                    100: '#FAE4D5',
                    200: '#F3C4A4',
                    300: '#E9A076',
                    400: '#DC7C4E',
                    500: '#C4622D',
                    600: '#A84E24',
                    700: '#8B3D1C',
                    800: '#6E2E14',
                    900: '#52210E',
                },

                // ─── Muted sage secondary ───────────────────────────────
                sage: {
                    50: '#F3F7F4',
                    100: '#E4EDE6',
                    200: '#C7DAC9',
                    300: '#A3C1A7',
                    400: '#7DA483',
                    500: '#5D8764',
                    600: '#4A6E50',
                    700: '#3A5540',
                },

                // ─── Warm golden yellow ─────────────────────────────────
                golden: {
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#D97706',
                },

                // ─── Semantic text ──────────────────────────────────────
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-muted': 'var(--text-muted)',

                // ─── Status ─────────────────────────────────────────────
                success: '#1A9E6D',
                warning: '#D97706',
                error: '#DC2626',
                info: '#2563EB',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'brand-gradient': 'linear-gradient(135deg, #1A9E6D 0%, #137F57 50%, #0D4F39 100%)',
                'accent-gradient': 'linear-gradient(135deg, #C4622D 0%, #A84E24 100%)',
                'card-gradient': 'linear-gradient(135deg, rgba(26,158,109,0.05) 0%, rgba(196,98,45,0.02) 100%)',
                'glow-gradient': 'radial-gradient(ellipse at center, rgba(26,158,109,0.06) 0%, transparent 70%)',
            },
            boxShadow: {
                'glow-sm': '0 0 12px rgba(26,158,109,0.18)',
                'glow': '0 0 24px rgba(26,158,109,0.22)',
                'glow-lg': '0 0 48px rgba(26,158,109,0.18)',
                'card': '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                'card-hover': '0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(26,158,109,0.08)',
                'sidebar': '2px 0 16px rgba(0,0,0,0.05)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%,100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                gradientShift: {
                    '0%,100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backdropBlur: { xs: '2px' },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
}
