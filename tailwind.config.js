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

                // ─── Blue primary ───────────────────────────────────────
                primary: {
                    50: '#E3F2FD',
                    100: '#BBDEFB',
                    200: '#90CAF9',
                    300: '#64B5F6',
                    400: '#42A5F5',
                    500: '#1565C0',
                    600: '#1565C0',
                    700: '#0D47A1',
                    800: '#0A3880',
                    900: '#072B61',
                },

                // ─── Purple review/secondary ────────────────────────────
                accent: {
                    50: '#F5E6FF',
                    100: '#E8C2FF',
                    200: '#D68FFF',
                    300: '#C17AFF',
                    400: '#AA55FF',
                    500: '#9900FF',
                    600: '#7B00CC',
                    700: '#5E0099',
                    800: '#420066',
                    900: '#250033',
                },

                // ─── Soft lavender neutral ──────────────────────────────
                sage: {
                    50: '#F3F0FA',
                    100: '#E8E1F5',
                    200: '#D1C3EB',
                    300: '#B8A0E0',
                    400: '#9B7DD4',
                    500: '#7C5CBF',
                    600: '#624AA0',
                    700: '#4A3880',
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
                success: '#1565C0',
                warning: '#D97706',
                error: '#DC2626',
                info: '#2563EB',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'brand-gradient': 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #072B61 100%)',
                'accent-gradient': 'linear-gradient(135deg, rgba(153,0,255,0.65) 0%, #9900FF 100%)',
                'card-gradient': 'linear-gradient(135deg, rgba(21,101,192,0.05) 0%, rgba(21,101,192,0.02) 100%)',
                'glow-gradient': 'radial-gradient(ellipse at center, rgba(21,101,192,0.06) 0%, transparent 70%)',
            },
            boxShadow: {
                'glow-sm': '0 0 12px rgba(21,101,192,0.18)',
                'glow': '0 0 24px rgba(21,101,192,0.22)',
                'glow-lg': '0 0 48px rgba(21,101,192,0.18)',
                'card': '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                'card-hover': '0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(21,101,192,0.08)',
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
