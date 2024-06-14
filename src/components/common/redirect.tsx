'use client'

import Button from '@/components/common/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface RedirectToLoginProps {
  children?: React.ReactNode
  className?: string
}

export function RedirectToLogin ({ children, className }: RedirectToLoginProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleClick = () => {
    const redirectTo = '/login'
    const currentPath = `${pathname}${searchParams.toString()}`
    router.push(`${redirectTo}?next=${encodeURIComponent(currentPath)}`)
  }

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  )
}
