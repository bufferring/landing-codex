// Provides a reusable button component with predefined styling.

import { type ReactNode, type ButtonHTMLAttributes, forwardRef, useMemo } from 'react'

// Defines allowed color variants.
type ColorsType = 'primary'

// Props for the Button component.
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  color?: ColorsType
}

// Maps color variants to Tailwind class strings.
const styles: Record<ColorsType, { classes: string }> = {
  primary: {
    classes: 'text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-400',
  },
}

// Button component that forwards its ref and applies computed classes.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, color = 'primary', className, ...rest } = props

  // Memoizes the combined class list to avoid recomputation.
  const classes = useMemo(
    () =>
      Object.values({
        base: 'select-none rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors duration-200 ease-in-out shadow-sm',
        btn: styles[color].classes,
        className,
      })
        .map((variants) => variants)
        .join(' '),
    [color, className]
  )

  // Renders a button element with the computed classes and passes through other props.
  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  )
})

// Sets component display name for React DevTools.
Button.displayName = 'Button'
export default Button
