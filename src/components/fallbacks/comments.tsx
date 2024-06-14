import { DivProps } from '@/types/components'
import LoadingSpinner from './loading'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const FallbackLoadingComments = forwardRef<HTMLDivElement, DivProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cn('grid h-32 place-content-center', className)}>
        <LoadingSpinner className='size-12' />
      </div>
    )
  }
)
