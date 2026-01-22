import montserratUrl from '@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2?url'
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'

for (const url of [montserratUrl, interUrl]) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

import '@styles/global.css'
import '@styles/fonts.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
