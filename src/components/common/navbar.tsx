import { NavigationAuthItem } from '@/components/auth/nav-item'
import { NavigationAuthItemFallback } from '@/components/fallbacks/auth'
import LogoIcon from '@/components/icons/logo'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Navbar () {
  return (
    <header className='nav-scroll-shadow sticky left-0 top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-4'>
      <Link href='/' className='inline-flex items-center'>
        <LogoIcon className='h-8 w-auto' />
        <span className='mt-1 hidden text-2xl font-semibold text-primary md:block'>
            ariety blog
        </span>
      </Link>

      <div className='flex items-center'>
        <Suspense fallback={<NavigationAuthItemFallback />}>
          <NavigationAuthItem />
        </Suspense>
      </div>
    </header>
  )
}
