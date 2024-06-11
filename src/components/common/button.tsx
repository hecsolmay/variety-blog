import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

const buttonVariants = cva(
  `focus-visible:ring-ring inline-flex h-9 
  items-center justify-center whitespace-nowrap rounded-md 
  px-4 py-2 text-sm font-medium 
  shadow transition-opacity 
  hover:opacity-85
  focus-visible:outline-none focus-visible:ring-1 
  disabled:pointer-events-none disabled:opacity-65`,
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        secondary: 'bg-white hover:opacity-95 text-primary',
        warning: 'bg-warning text-white',
        danger: 'bg-red-500 text-white'
      },
      loading: {
        true: 'cursor-progress opacity-70 hover:opacity-70'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading = false, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, loading }), className)}
        {...props}
      />
    )
  }
)

export default Button
