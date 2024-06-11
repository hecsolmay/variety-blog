import { LinkButton } from '@/components/common/button'

export default function NotFound () {
  return (
    <div className="flex h-[80dvh] items-center justify-center">
      <div className="max-w-md p-6 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl">Oops! La página que estás buscando no existe.</p>
        <LinkButton href="/" variant='default' className='mt-4'>Ir a la página inicial</LinkButton>
      </div>
    </div>
  )
}
