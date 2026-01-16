import { type ReactNode, type ButtonHTMLAttributes, forwardRef, useMemo } from 'react'

type ColorsType = 'primary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  color?: ColorsType
}

const styles: Record<ColorsType, { classes: string }> = {
  primary: {
    classes: 'text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-400',
  },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, color = 'primary', className, ...rest } = props

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

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
