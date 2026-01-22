// Aside panel for selecting a workspace and providing social media links.

import React from 'react'

import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaArrowRightToBracket } from 'react-icons/fa6'

import Logo from '@components/Logo'
import BufferringLogo from '@components/BufferringLogo'

import Select from '@components/Select'
import Button from '@components/Button'

interface Props {
  workspacesNum: number
  workspace: string | null
  onSelectWorkspace: (value: string) => void
}

// AsideContent: functional component rendering UI for workspace selection and navigation.
const AsideContent: React.FC<Props> = ({ workspace, onSelectWorkspace, workspacesNum }) => (
  <div className="flex w-[90%] flex-col items-start justify-center gap-4 rounded-3xl border-2 border-ui-border bg-ui-base/95 p-10 py-16 shadow-[3px_0px_15px_rgba(0,0,0,0.1)] sm:h-screen sm:w-[50vw] sm:rounded-none sm:border-r-2 sm:bg-ui-base sm:p-16">
    {/* Application logo */}
    <Logo className="h-24 text-ui-text-muted" />

    <h1 className="font-heading text-base font-bold tracking-wide text-ui-text-muted sm:text-xl">
      UNEFA Codex
    </h1>

    <h2 className="mb-2 font-heading text-2xl font-bold tracking-wide text-ui-text sm:text-3xl">
      ¡Bienvenido de Vuelta!
    </h2>

    {/* Workspace selection section */}
    <div className="flex w-full flex-col gap-2">
      <label className="font-body text-sm font-bold text-ui-text-muted">Elige un workspace</label>
      <Select
        placeholder="Selecciona un workspace"
        value={workspace}
        options={Array.from({ length: workspacesNum }, (_, i) => ({
          value: `${i + 1}`,
          label: `Workspace ${i + 1}`,
        }))}
        onChange={onSelectWorkspace}
      />
    </div>

    {/* Entry button */}
    <Button
      className="mt-4 flex w-full flex-row items-center justify-center gap-2 tracking-wide"
      onClick={() => {
        if (workspace) {
          window.location.href = `/user${workspace}`
        }
      }}
    >
      <FaArrowRightToBracket className="text-base" />
      Entrar
    </Button>

    {/* Divider with text */}
    <div className="my-2 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div className="h-px rounded-full bg-ui-border/80" />
      <p className="font-body text-sm font-semibold tracking-wide text-ui-text-muted">
        Sigue a BufferRing
      </p>
      <div className="h-px rounded-full bg-ui-border/80" />
    </div>

    {/* Social media links */}
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
)

export default AsideContent
