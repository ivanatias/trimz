import { type Config } from 'tailwindcss'

export default {
  content: [
    '{routes,islands,auth,links,common}/**/*.{ts,tsx}',
  ],
} satisfies Config
