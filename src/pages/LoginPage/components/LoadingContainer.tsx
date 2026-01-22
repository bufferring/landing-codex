// LoadingContainer component shows an animated loading screen.

import React from 'react'

import { motion, type Variants } from 'framer-motion'

import Logo from '@components/Logo'

// Props defining animation variants
interface Props {
  variants: Variants
}

// Component that displays a loading overlay with animation
const LoadingContainer: React.FC<Props> = ({ variants }) => {
  return (
    <motion.div
      key="loading"
      className="absolute z-10 flex h-full w-full items-center justify-center"
      variants={variants}
      initial="initial"
      animate="loading"
      exit="loaded"
    >
      {/* Styled container for logo and text */}
      <div className="flex w-[90%] flex-col items-center gap-4 rounded-3xl border-2 border-ui-border/40 bg-ui-front/70 p-12 shadow-md sm:w-auto">
        {/* Render the brand logo */}
        <Logo className="h-40 text-ui-text" />

        {/* Title indicating startup */}
        <h1 className="text-center font-heading text-3xl font-bold tracking-wide text-ui-text">
          Iniciando Codex
        </h1>

        {/* Spinner and loading text */}
        <div className="flex flex-row items-center justify-center gap-4">
          {/* Animated spinner */}
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-ui-text border-t-transparent"
            aria-hidden="true"
          />
          {/* Loading text */}
          <span className="font-body text-base text-ui-text">Pensando...</span>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingContainer
