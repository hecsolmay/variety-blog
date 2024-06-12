import { SpanProps } from '@/types/components'
import { cn } from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-6 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border border-gray-500 bg-primary text-white',
        primary: 'border border-primary bg-white text-primary',
        warning: 'bg-amber-700 text-white',
        danger: 'bg-red-700 text-white',
        success: 'bg-green-700 text-white',
        pink: 'bg-pink-700 text-white',
        blue: 'bg-blue-700 text-white',
        purple: 'bg-purple-700 text-white'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface BadgeProps extends SpanProps, VariantProps<typeof badgeVariants> {}

export default function Badge ({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn(
      badgeVariants({ variant }),
      className
    )}>
      {children}
    </span>
  )
}

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

export function getBadgeColor (number: number): BadgeVariant {
  const variants: BadgeVariant[] = ['default', 'primary', 'warning', 'danger', 'success', 'pink', 'blue', 'purple']

  return variants[number % variants.length] ?? 'default'
}
