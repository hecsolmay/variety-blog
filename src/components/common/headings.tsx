import { HeadingProps } from '@/types/components'
import { cn } from '@/utils/cn'

export function H1 ({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl',
        className
      )}
      {...props}
    />
  )
}
