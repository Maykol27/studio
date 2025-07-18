import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"], // Can be 'media' or 'class'
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
  		colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
  		},
  		borderRadius: {
        lg: 'var(--radius)', // 8px (Updated based on new root variable)
        md: 'calc(var(--radius) - 2px)', // 6px (Updated)
        sm: 'var(--radius-sm)', // 6px (Updated)
        xs: 'var(--radius-xs)' // 4px (Updated)
  		},
      boxShadow: {
        // Hedera uses subtle shadows
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
      },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'animate-bubble-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.1)', opacity: '0.2' },
          '25%': { transform: 'translate(25vw, -30vh) scale(1.4)', opacity: '0.35' },
          '50%': { transform: 'translate(-28vw, 25vh) scale(0.9)', opacity: '0.4' },
          '75%': { transform: 'translate(20vw, 28vh) scale(1.3)', opacity: '0.3' },
        },
        'animate-bubble-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.1)', opacity: '0.15' },
          '25%': { transform: 'translate(-30vw, 22vh) scale(0.95)', opacity: '0.3' },
          '50%': { transform: 'translate(25vw, -28vh) scale(1.45)', opacity: '0.35' },
          '75%': { transform: 'translate(-20vw, -25vh) scale(1.1)', opacity: '0.25' },
        },
        'animate-bubble-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.18' },
          '25%': { transform: 'translate(38vw, -32vh) scale(1.35)', opacity: '0.32' },
          '50%': { transform: 'translate(-32vw, 35vh) scale(1.05)', opacity: '0.38' },
          '75%': { transform: 'translate(25vw, 28vh) scale(1.25)', opacity: '0.28' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'pulse-subtle-text': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'bubble-1': 'animate-bubble-1 35s ease-in-out infinite',
        'bubble-2': 'animate-bubble-2 40s ease-in-out infinite 7s',
        'bubble-3': 'animate-bubble-3 30s ease-in-out infinite 3s',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle-text': 'pulse-subtle-text 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
