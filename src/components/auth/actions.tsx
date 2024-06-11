import { LinkButton } from '@/components/common/button'
import { DropDownItem } from '@/components/common/dropdown'

export function SingOutButton () {
  return (
    <DropDownItem className='text-red-400'>Cerrar sesión</DropDownItem>
  )
}

export function GoToLogin () {
  return (
    <LinkButton href='/login'>Iniciar sesión</LinkButton>
  )
}
