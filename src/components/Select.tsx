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

  const scrollIntoViewIfNeeded = (idx: number) => {
    const item = divListRef.current?.querySelector<HTMLElement>(`[data-option-index="${idx}"]`)
    if (item) item.scrollIntoView({ block: 'nearest' })
  }

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

  const selectByIndex = (idx: number | null) => {
    if (idx == null) return
    const opt = options[idx]
    if (!opt || opt.disabled) return
    onChange(opt.value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const selectHighlighted = () => selectByIndex(highlighted)

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

  return (
    <div className={`relative ${className}`}>
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
              className="scrollbar max-h-60 w-full overflow-auto bg-ui-front py-1 text-ui-text ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {options.map((opt, idx) => {
                const selected = value === opt.value
                const isHighlighted = highlighted === idx
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
                    onPointerDown={(e) => {
                      e.preventDefault()
                      if (opt.disabled) return
                      onChange(opt.value)
                      setOpen(false)
                      buttonRef.current?.focus()
                    }}
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
