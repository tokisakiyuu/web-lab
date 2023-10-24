import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#39C5BB',
        'secondary-color': '#2196f3',
        'background-color': 'white',
      }
    },
  },
  plugins: [],
}
export default config
