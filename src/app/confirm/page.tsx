import { LinkButton } from '@/components/common/button'
import { ServerPageProps } from '@/types/props'
import { BadgeCheck } from 'lucide-react'

export default function Confirm ({ searchParams }: ServerPageProps) {
  const { message } = searchParams
  return (
    <div className='flex h-[80dvh] flex-col items-center justify-center gap-3'>
      <BadgeCheck className='size-24 text-green-600' />
      <h1 className='text-3xl font-bold'>Registro exitoso</h1>

      <p className='mt-3 text-xl text-gray-600'>{message}</p>

      <LinkButton href='/' className='mt-4'>
        Regresar al inicio
      </LinkButton>
    </div>
  )
}
