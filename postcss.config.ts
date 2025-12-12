import type { Plugin } from 'postcss'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export const config = {
  plugins: [tailwind, autoprefixer] as Plugin[],
}

export default config
