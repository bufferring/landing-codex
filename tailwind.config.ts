import type { Config } from 'tailwindcss'

export const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat Variable'],
        body: ['Inter Variable'],
      },

      spacing: {
        128: '32rem',
        152: '38rem',
      },

      colors: {
        ui: {
          back: 'hsl(220, 45%, 91%)',
          base: 'hsl(220, 100%, 96%)',
          front: 'hsl(220, 100%, 100%)',
          text: 'hsl(224, 75%, 6%)',
          'text-muted': 'hsl(220, 21%, 30%)',
          highlight: 'hsl(220, 100%, 100%)',
          border: 'hsl(220, 15%, 53%)',
          'border-muted': 'hsl(220, 21%, 65%)',
        },
      },

      boxShadow: {
        ui: 'inset 0px 2px 0px hsl(220, 100%, 100%), inset 0px -2px 0px rgba(0,0,0,7%), 0px 3px 5px rgba(0,0,0,20%)',
        'ui-2':
          'inset 0px 2px 0px hsl(220, 100%, 100%), inset 0px -2px 0px rgba(0,0,0,7%), 0px 2px 2px rgba(0,0,0,10%)',
        glass: '0 20px 45px -20px rgba(15, 23, 42, 0.35)',
      },
    },
  },
}

export default config
