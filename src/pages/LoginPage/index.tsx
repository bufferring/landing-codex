// Renders a login page with animated background and responsive layout.

import { useState, useEffect, useMemo, type FC } from 'react'

import { motion, AnimatePresence, easeOut, easeInOut, type Variants } from 'framer-motion'

import { useMediaQuery } from 'react-responsive'

import BgPhoto from '@assets/bg.webp'

import AsideContent from './components/AsideContent'
import LoadingContainer from './components/LoadingContainer'

import envConfig from '@config/env'

// Function component for login page.
export const LoginPage: FC = () => {
  // Determine if viewport is desktop size.
  const isDesktop = useMediaQuery({ query: '(min-width: 640px)' })

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [workspace, setWorkspace] = useState<string | null>(null)
  const [usersNum, setUsersNum] = useState<number>(1)

  // Simulate loading delay and set loading state.
  useEffect(() => {
    const load = async () => {
      const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
      await sleep(1500)

      const response = await fetch(envConfig.API_URL + '/users')

      if (!response.ok) {
        console.error(response)
      }

      const data = await response.json()

      setUsersNum(data.workspaces)
      setIsLoading(false)
    }

    load()
  }, [isDesktop])

  // Update selected workspace.
  const onSelectWorkspace = (value: string) => {
    setWorkspace(value)
  }

  // Define grid animation variants based on screen size.
  const gridVariants: Variants = useMemo(
    () => ({
      initial: isDesktop ? { width: '200%', height: '100%' } : { width: '100%', height: '100%' },
      loaded: {
        width: '100%',
        height: '100%',
        transition: {
          width: { duration: 0.5, ease: easeOut },
        },
      },
    }),
    [isDesktop]
  )

  // Define background animation variants with responsive positions.
  const backgroundVariants: Variants = useMemo(
    () => ({
      initial: {
        y: isDesktop ? '-40%' : '10%',
        scale: isDesktop ? '100%' : '150%',
        opacity: 0,
      },
      loading: {
        y: isDesktop ? '-35%' : '15%',
        scale: isDesktop ? '100%' : '150%',
        opacity: 1,
        transition: {
          opacity: { duration: 1.5, ease: easeOut },
          y: { duration: 10 },
        },
      },
      loaded: {
        y: isDesktop ? '-10%' : '20%',
        scale: isDesktop ? '100%' : '150%',
        opacity: 1,
        transition: { y: { duration: 1, ease: easeInOut } },
      },
    }),
    [isDesktop]
  )

  // Animation variants for loading container.
  const loadingContainerVariants: Variants = {
    initial: { y: -10, opacity: 0 },
    loading: {
      y: 0,
      opacity: 1,
      transition: { opacity: { duration: 1.5, ease: easeOut }, y: { duration: 1 } },
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

  // Animation variants for aside component.
  const asideVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { opacity: { duration: 0.5, ease: easeOut }, y: { duration: 1 } },
    },
    exit: { opacity: 0, y: 10, transition: { opacity: { duration: 0.5 }, y: { duration: 0.5 } } },
  }

  // Render layout with animated grid, background, and conditional aside.
  return (
    <div className="h-full w-full bg-black">
      <div className="relative h-full w-full overflow-hidden">
        {/* Animated grid container with responsive layout. */}
        <motion.div
          className="absolute right-0 top-0 z-0 h-full sm:grid sm:grid-cols-2"
          variants={gridVariants}
          initial="initial"
          animate={isLoading ? 'initial' : 'loaded'}
        >
          {isDesktop ? (
            <aside className="left-0 top-0 z-10 flex w-[90%] items-start sm:static sm:w-full sm:flex-row sm:justify-end sm:rounded-none">
              <AsideContent
                workspace={workspace}
                onSelectWorkspace={onSelectWorkspace}
                workspacesNum={usersNum}
              />
            </aside>
          ) : (
            <AnimatePresence>
              {!isLoading && (
                <motion.aside
                  key="mobile-aside"
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  variants={asideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <AsideContent
                    workspace={workspace}
                    onSelectWorkspace={onSelectWorkspace}
                    workspacesNum={usersNum}
                  />
                </motion.aside>
              )}
            </AnimatePresence>
          )}

          {/* Animated background image. */}
          <motion.img
            src={BgPhoto}
            className="absolute top-0 z-0 h-full object-cover opacity-80 sm:static sm:w-full"
            variants={backgroundVariants}
            initial="initial"
            animate={isLoading ? 'loading' : 'loaded'}
            draggable="false"
          />
        </motion.div>

        {/* Show loading container while loading. */}
        <AnimatePresence>
          {isLoading && <LoadingContainer variants={loadingContainerVariants} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LoginPage
