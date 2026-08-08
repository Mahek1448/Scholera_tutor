/** @type {import('tailwindcss').Config} */
export default {
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
                // Light palette
                background: '#F5F7FA',
                surface: '#FFFFFF',
                'surface-2': '#F0F2F7',
                'surface-3': '#E8ECF4',
                border: '#DDE1EB',
                'border-light': '#E8ECF4',

                // Brand colors — indigo stays
                primary: {
                    50: '#EEF2FF',
                    100: '#E0E7FF',
                    200: '#C7D2FE',
                    300: '#A5B4FC',
                    400: '#818CF8',
                    500: '#6366F1',
                    600: '#4F46E5',
                    700: '#4338CA',
                    800: '#3730A3',
                    900: '#312E81',
                },
                accent: {
                    50: '#F5F3FF',
                    100: '#EDE9FE',
                    200: '#DDD6FE',
                    300: '#C4B5FD',
                    400: '#A78BFA',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                    700: '#6D28D9',
                },
                blue: {
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                },
                // Text — dark on light
                'text-primary': '#111827',
                'text-secondary': '#4B5563',
                'text-muted': '#9CA3AF',

                // Status
                success: '#16A34A',
                warning: '#D97706',
                error: '#DC2626',
                info: '#2563EB',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)',
                'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 100%)',
                'glow-gradient': 'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)',
            },
            boxShadow: {
                'glow-sm': '0 0 12px rgba(99,102,241,0.2)',
                'glow': '0 0 24px rgba(99,102,241,0.25)',
                'glow-lg': '0 0 48px rgba(99,102,241,0.2)',
                'card': '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
                'card-hover': '0 4px 24px rgba(0,0,0,0.1), 0 1px 6px rgba(99,102,241,0.1)',
                'sidebar': '2px 0 16px rgba(0,0,0,0.06)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
}
