import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5f2',
          100: '#f5ebe5',
          200: '#ead5cc',
          300: '#d9b8a6',
          400: '#c4927a',
          500: '#b37357',
          600: '#a5634a',
          700: '#89503e',
          800: '#714439',
          900: '#5d3931',
          950: '#321d18',
        },
        wine: {
          50: '#faf5f0',
          100: '#f4e8d8',
          200: '#e8ceb1',
          300: '#daae82',
          400: '#cc8957',
          500: '#c06d3f',
          600: '#b25935',
          700: '#94452e',
          800: '#78392b',
          900: '#623227',
          950: '#341813',
        },
      },
    },
  },
  plugins: [],
}
export default config







