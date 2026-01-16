import { useState, useEffect, type FC } from 'react'
import { motion, AnimatePresence, easeOut, easeInOut, type Variants } from 'framer-motion'

import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaArrowRightToBracket } from 'react-icons/fa6'

import Logo from '@components/Logo'
import BufferringLogo from '@components/BufferringLogo'

import Select from '@components/Select'
import Button from '@components/Button'

import BgPhoto from '@assets/bg.webp'

export const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [workspace, setWorkspace] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
      await sleep(3000)
      setIsLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    console.log(workspace)
  }, [workspace])

  const onSelectWorkspace = (value: string) => {
    setWorkspace(value)
  }

  const gridVariants: Variants = {
    initial: { width: '200%' },
    loaded: {
      width: '100%',
      transition: {
        width: { duration: 0.5, ease: easeOut },
      },
    },
  }

  const backgroundVariants: Variants = {
    initial: { y: '-50%', opacity: 0 },
    loading: {
      y: '-45%',
      opacity: 1,
      transition: {
        opacity: { duration: 1.5, ease: easeOut },
        y: { duration: 10 },
      },
    },
    loaded: {
      y: '-25%',
      opacity: 1,
      transition: { y: { duration: 1, ease: easeInOut } },
    },
  }

  const loadingContainerVariants: Variants = {
    initial: { y: -10, opacity: 0 },
    loading: {
      y: 0,
      opacity: 1,
      transition: {
        opacity: { duration: 1.5, ease: easeOut },
        y: { duration: 1 },
      },
    },
    loaded: {
      y: 10,
      opacity: 0,
      transition: {
        opacity: { duration: 0.5, ease: easeOut },
        y: { duration: 0.5, ease: easeOut },
      },
    },
  }

  return (
    <div className="h-full w-full bg-black">
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 z-0 grid grid-cols-2"
          variants={gridVariants}
          initial="initial"
          animate={!isLoading && 'loaded'}
        >
          <aside className="flex flex-row items-start justify-end bg-ui-base">
            <div className="flex h-screen w-[50vw] flex-col items-start justify-center gap-4 p-16">
              <Logo className="h-20 text-ui-text-muted" />

              <h1 className="font-heading text-xl font-bold tracking-wide text-ui-text-muted">
                UNEFA Codex
              </h1>

              <h2 className="mb-2 font-heading text-3xl font-bold tracking-wide text-ui-text">
                ¡Bienvenido de Vuelta!
              </h2>

              <div className="flex w-full flex-col gap-2">
                <label className="font-body text-sm font-bold text-ui-text-muted">
                  Elige un workspace
                </label>
                <Select
                  placeholder="Selecciona un workspace"
                  value={workspace}
                  options={Array.from({ length: 9 }, (_, i) => ({
                    value: `${i + 1}`,
                    label: `Workspace ${i + 1}`,
                  }))}
                  onChange={onSelectWorkspace}
                />
              </div>

              <Button className="mt-4 flex w-full flex-row items-center justify-center gap-2">
                <FaArrowRightToBracket className="text-base" />
                Entrar
              </Button>

              <div className="my-2 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="h-px rounded-full bg-ui-border/80" />

                <p className="font-body text-sm font-semibold text-ui-text-muted">
                  Sigue a BufferRing
                </p>

                <div className="h-px rounded-full bg-ui-border/80" />
              </div>

              <div className="flex w-full flex-row items-center justify-center gap-4 text-2xl">
                <a
                  href="https://github.com/BufferRing"
                  className="ease flex items-center justify-center rounded-full border-2 border-ui-border bg-ui-front p-2 text-ui-text-muted shadow-ui-2 transition-all hover:scale-110 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://instagram.com/bufferringorg"
                  className="ease flex items-center justify-center rounded-full border-2 border-ui-border bg-ui-front p-2 text-ui-text-muted shadow-ui-2 transition-all hover:scale-110 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://tiktok.com/@bufferringorg"
                  className="ease flex items-center justify-center rounded-full border-2 border-ui-border bg-ui-front p-2 text-ui-text-muted shadow-ui-2 transition-all hover:scale-110 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok />
                </a>

                <a
                  href="https://bufferring.org"
                  className="ease flex items-center justify-center rounded-full border-2 border-ui-border bg-ui-front p-2 text-ui-text-muted shadow-ui-2 transition-all hover:scale-110 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BufferringLogo className="size-6" />
                </a>
              </div>
            </div>
          </aside>

          <motion.img
            src={BgPhoto}
            className="w-full object-cover opacity-80"
            variants={backgroundVariants}
            initial="initial"
            animate={isLoading ? 'loading' : 'loaded'}
          />
        </motion.div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loading"
              className="absolute z-10 flex h-full w-full items-center justify-center"
              variants={loadingContainerVariants}
              initial="initial"
              animate="loading"
              exit="loaded"
            >
              <motion.div className="flex flex-col items-center gap-2 rounded-3xl bg-ui-front p-12 pt-8 opacity-70 shadow-md backdrop-blur-sm">
                <Logo className="h-40 text-ui-text" />

                <h1 className="font-heading text-3xl font-bold tracking-wide">Iniciando Codex</h1>

                <div className="mt-2 flex flex-row items-center justify-center gap-4">
                  <div
                    className="h-4 w-4 animate-spin rounded-full border-2 border-ui-text border-t-transparent"
                    aria-hidden="true"
                  />
                  <span className="font-body text-base text-ui-text">Pensando...</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LoginPage
