import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          950: '#030d06',
          900: '#071a0d',
          800: '#0d2e17',
          700: '#144522',
          600: '#1a5c2d',
          500: '#227539',
          400: '#2d9e50',
          300: '#4dbe70',
          200: '#82d49e',
          100: '#c0eacc',
          50:  '#e8f7ee',
        },
        olive: {
          600: '#4a6741',
          500: '#5e8252',
          400: '#74a066',
        },
        sage: {
          500: '#6b8f71',
          400: '#8aaa90',
          300: '#aec5b2',
          100: '#ddeee1',
          50:  '#f0f8f2',
        },
        amber: {
          harvest: '#c9890e',
          warm:    '#e0a020',
          light:   '#f5c842',
        },
        earth: {
          red:    '#b84040',
          orange: '#cc6030',
        }
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-in':   'slideIn 0.4s ease forwards',
        'pulse-slow': 'pulse 2.5s ease-in-out infinite',
        'bar-fill':   'barFill 1.2s cubic-bezier(.4,0,.2,1) forwards',
      },
      keyframes: {
        fadeUp:  { from:{ opacity:'0', transform:'translateY(14px)' }, to:{ opacity:'1', transform:'none' } },
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        slideIn: { from:{ opacity:'0', transform:'translateX(-10px)' }, to:{ opacity:'1', transform:'none' } },
        barFill: { from:{ width:'0%' }, to:{ width:'var(--bar-w)' } },
      },
      boxShadow: {
        'card':       '0 2px 16px rgba(13,51,32,0.08), 0 1px 3px rgba(13,51,32,0.06)',
        'card-hover': '0 8px 32px rgba(13,51,32,0.14), 0 2px 8px rgba(13,51,32,0.08)',
        'glow-green': '0 0 24px rgba(45,158,80,0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #e4f5ea 0%, #c8ecd5 50%, #d6f0e0 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232,247,238,0.6) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
