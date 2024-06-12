import { GithubIcon } from '@/components/icons/github'

export default function Footer () {
  return (
    <footer className='flex h-20 w-full flex-wrap items-center justify-between gap-2 bg-primary px-4 text-white'>
      <div className='grid flex-1 place-content-center md:block md:flex-none'>
        <p className='text-sm md:text-base'>Copyright © 2022 Variety blog</p>
      </div>
      <div className='flex items-center gap-4'>
        <a
          href='https://github.com/hecsolmay/variety-blog'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-x-2 transition-transform duration-100 hover:scale-105 hover:text-highlight hover:opacity-75'
        >
          <GithubIcon />
          GitHub
        </a>
      </div>
    </footer>
  )
}
