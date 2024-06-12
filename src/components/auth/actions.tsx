'use client'

import { logOut } from '@/actions/auth'
import { LinkButton } from '@/components/common/button'
import { DropDownItem } from '@/components/common/dropdown'

export function SingOutButton () {
  return (
    <DropDownItem
      onClick={() => {
        logOut()
      }}
      className='text-red-400'
    >
      Cerrar sesión
    </DropDownItem>
  )
}

export function GoToLogin () {
  return <LinkButton href='/login'>Iniciar sesión</LinkButton>
}
