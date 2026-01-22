// This component renders a custom accessible dropdown select with keyboard and pointer support

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa6'

type Option = { value: string; label: string; disabled?: boolean }

type SelectProps = {
  name?: string
  options: Option[]
  value?: string | null
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
}

// Render a fully featured select component
export const Select: React.FC<SelectProps> = ({
  name,
  options,
  value = null,
  onChange,
  placeholder = 'Select',
  className = 'w-full',
  id = '',
}) => {
  const uid = id
  const buttonId = `select-button-${uid}`
  const listId = `select-list-${uid}`

  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState<number | null>(null)

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const divListRef = useRef<HTMLDivElement | null>(null)

  // Track active pointer to differentiate tap from drag
  const activePointerRef = useRef<{
    id: number
    startX: number
    startY: number
    moved: boolean
  } | null>(null)

  // Update highlighted option when dropdown opens or value changes
  useEffect(() => {
    if (!open) {
      setHighlighted(null)
      return
    }
    const idx = options.findIndex((o) => o.value === value && !o.disabled)
    if (idx >= 0) {
      setHighlighted(idx)
    } else {
      const first = options.findIndex((o) => !o.disabled)
      setHighlighted(first >= 0 ? first : null)
    }
  }, [open, value, options])

  // Close dropdown when clicking outside of button or list
  useEffect(() => {
    function onDoc(e: PointerEvent) {
      const target = e.target as Node
      if (!buttonRef.current?.contains(target) && !divListRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [])

  // Scroll highlighted option into view if needed
  const scrollIntoViewIfNeeded = (idx: number) => {
    const item = divListRef.current?.querySelector<HTMLElement>(`[data-option-index="${idx}"]`)
    if (item) item.scrollIntoView({ block: 'nearest' })
  }

  // Move highlight forward or backward, skipping disabled options
  const moveHighlight = (dir: 1 | -1) => {
    if (options.length === 0) return
    let idx = highlighted ?? -1
    for (let i = 0; i < options.length; i++) {
      idx = (idx + dir + options.length) % options.length
      if (!options[idx].disabled) {
        setHighlighted(idx)
        scrollIntoViewIfNeeded(idx)
        break
      }
    }
  }

  // Select option by index and close dropdown
  const selectByIndex = (idx: number | null) => {
    if (idx == null) return
    const opt = options[idx]
    if (!opt || opt.disabled) return
    onChange(opt.value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  // Shortcut to select currently highlighted option
  const selectHighlighted = () => selectByIndex(highlighted)

  // Handle keyboard navigation and selection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key
    if (key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      else moveHighlight(1)
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (!open) setOpen(true)
      else moveHighlight(-1)
    } else if (key === 'Home') {
      e.preventDefault()
      const idx = options.findIndex((o) => !o.disabled)
      if (idx >= 0) {
        setHighlighted(idx)
        scrollIntoViewIfNeeded(idx)
      }
    } else if (key === 'End') {
      e.preventDefault()
      for (let i = options.length - 1; i >= 0; i--) {
        if (!options[i].disabled) {
          setHighlighted(i)
          scrollIntoViewIfNeeded(i)
          break
        }
      }
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault()
      if (!open) setOpen(true)
      else selectHighlighted()
    } else if (key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
    } else if (key.length === 1) {
      const char = key.toLowerCase()
      const idx = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(char))
      if (idx >= 0) {
        setHighlighted(idx)
        scrollIntoViewIfNeeded(idx)
      }
    }
  }

  // Minimum movement in pixels to treat pointer action as a drag
  const MOVE_THRESHOLD = 8

  return (
    <div className={`relative ${className}`}>
      {/* Button that toggles the dropdown */}
      <button
        id={buttonId}
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className="w-full cursor-default rounded-full border border-ui-border bg-ui-front py-2 pl-4 pr-10 text-left font-body text-ui-text shadow-ui-2 transition-colors duration-75 hover:bg-gray-50 focus:outline-none sm:text-sm"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
      >
        <span className="block truncate">
          {options.find((o) => o.value === value)?.label ?? placeholder}
        </span>

        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            aria-hidden
            className="flex items-center justify-center"
          >
            <IoIosArrowForward className="text-base text-ui-text-muted" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            ref={divListRef}
            initial={{ opacity: 0, y: -6, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.995 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-hidden rounded-3xl border-2 border-ui-border shadow-ui"
          >
            <ul
              role="listbox"
              aria-labelledby={buttonId}
              aria-activedescendant={highlighted != null ? `opt-${uid}-${highlighted}` : undefined}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              style={{ touchAction: 'pan-y' }}
              className="scrollbar max-h-60 w-full overflow-auto bg-ui-front py-1 text-ui-text ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {options.map((opt, idx) => {
                const selected = value === opt.value
                const isHighlighted = highlighted === idx

                // Pointer down handler to start tracking movement
                const handlePointerDown = (e: React.PointerEvent<HTMLLIElement>) => {
                  if (opt.disabled) return
                  activePointerRef.current = {
                    id: e.pointerId,
                    startX: e.clientX,
                    startY: e.clientY,
                    moved: false,
                  }
                  try {
                    e.currentTarget.setPointerCapture(e.pointerId)
                  } catch {
                    {
                      /* ignore */
                    }
                  }
                }

                // Pointer move handler to detect drag distance
                const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
                  const s = activePointerRef.current
                  if (!s || s.id !== e.pointerId) return
                  const dx = Math.abs(e.clientX - s.startX)
                  const dy = Math.abs(e.clientY - s.startY)
                  if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
                    s.moved = true
                  }
                }

                // Pointer up handler to finalize tap selection
                const handlePointerUp = (e: React.PointerEvent<HTMLLIElement>) => {
                  const s = activePointerRef.current
                  if (!s || s.id !== e.pointerId) {
                    try {
                      e.currentTarget.releasePointerCapture(e.pointerId)
                    } catch {
                      {
                        /* */
                      }
                    }
                    return
                  }
                  try {
                    e.currentTarget.releasePointerCapture(e.pointerId)
                  } catch {
                    {
                      /* */
                    }
                  }
                  const moved = s.moved
                  activePointerRef.current = null
                  if (!moved && !opt.disabled) {
                    onChange(opt.value)
                    setOpen(false)
                    buttonRef.current?.focus()
                  }
                }

                return (
                  <li
                    id={`opt-${uid}-${idx}`}
                    key={opt.value}
                    role="option"
                    aria-selected={selected}
                    data-option-index={idx}
                    className={`relative cursor-default select-none py-2 pl-3 pr-9 text-ui-text ${
                      opt.disabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-500/50'
                    } ${isHighlighted ? 'bg-blue-600/30' : ''}`}
                    onMouseEnter={() => !opt.disabled && setHighlighted(idx)}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  >
                    <span className="block truncate">{opt.label}</span>

                    {selected && (
                      <span
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
                        aria-hidden
                      >
                        <FaCheck />
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {name && (
        <select
          name={name}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          aria-hidden
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default Select
