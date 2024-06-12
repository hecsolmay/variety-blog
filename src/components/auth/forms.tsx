'use client'

import { FormItem } from '@/components/common/form'
import Input from '@/components/common/input'
import Button from '@/components/common/button'
import Link from 'next/link'

export function LoginForm () {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email')
    const password = formData.get('password')

    alert(JSON.stringify({ email, password }))
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-6 pb-7'>
      <FormItem label='Correo electrónico'>
        <Input type='text' placeholder='example@mail.com' />
      </FormItem>
      <FormItem label='Contraseña'>
        <Input type='password' placeholder='Escribe tu contraseña' />
      </FormItem>
      <Button className='mt-3 w-full' type='submit'>
        Iniciar sesión
      </Button>

      <p className='mt-2 inline-flex justify-center gap-2 text-sm text-primary'>
        Nuevo usuario?
        <Link href='/signup' className='text-highlight underline'>Regístrate</Link>
      </p>
    </form>
  )
}
