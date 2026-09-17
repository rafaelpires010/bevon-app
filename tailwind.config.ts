import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-bevon)', 'system-ui', 'sans-serif'],
      },
      /**
       * Escala tipográfica do guia da marca.
       *
       * A hierarquia do guia é aplicada aqui, na escala inteira, em vez de
       * classe por classe nas páginas: display (24px pra cima) em 120% de
       * entrelinha, texto em 140%, e o afunilamento do espaçamento conforme
       * o corpo cresce. Assim todo `text-4xl` que já existe no site herda o
       * guia sem ninguém precisar reescrever marcação.
       *
       * As linhas do guia caem exatas em: 6xl = H1 (60/120, -1%),
       * 4xl ≈ H2 (40/120, -1%), 2xl = H3 (24/120, 0%),
       * base = corpo (16/140, 0%), sm = legenda (14/140, +2%).
       */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        sm: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        base: ['1rem', { lineHeight: '1.4', letterSpacing: '0' }],
        lg: ['1.125rem', { lineHeight: '1.4', letterSpacing: '0' }],
        xl: ['1.25rem', { lineHeight: '1.35', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        '8xl': ['6rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
