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
      }
    }
  },
  plugins: []
}
export default config
