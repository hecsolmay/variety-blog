import { MainProps } from '@/types/components'
import { cn } from '@/utils/cn'

export function MainContainer ({ className, ...props }: MainProps) {
  return (
    <main
      {...props}
      className={cn(
        'mx-auto min-h-[80dvh] max-w-7xl px-4 py-6 md:px-8',
        className
      )}
    />
  )
}
