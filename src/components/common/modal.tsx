'use client'

import { cn } from '@/utils/cn'
import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  close: () => void
  className?: string
  disabled?: boolean
}

export function ModalBackground (
  { close, isOpen, className, disabled }: Props
) {
  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('overflow-y-hidden')
    }

    return () => {
      document.querySelector('body')?.classList.remove('overflow-y-hidden')
    }
  }, [isOpen])

  const handleClose = () => {
    if (disabled) return
    document.querySelector('body')?.classList.remove('overflow-y-hidden')
    close()
  }

  return (
    <div
      onClick={handleClose}
      className={cn(
        'fixed inset-0 z-40 bg-black/50 transition-opacity',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
      aria-hidden="true"
    />
  )
}
