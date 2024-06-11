import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'background': '#ffffff',
        'primary': '#1b2834',
        'highlight': '#4a90e2',
        'secondary': '#e1e8ed',
        'warning': '#f28c28'
      },
      keyframes: {
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-1px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(1px)' }
        }
      },
      animation: {
        'error-shake': 'shake 1s linear ease-in-out'
      }
    }
  },
  plugins: []
}
export default config
