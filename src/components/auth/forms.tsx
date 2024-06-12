'use client'

import { login, register as registerAction } from '@/actions/auth'
import Button from '@/components/common/button'
import { FormItem } from '@/components/common/form'
import Input from '@/components/common/input'
import { LoginInput, loginSchema } from '@/schemas/auth/login'
import { RegisterInput, registerSchema } from '@/schemas/auth/register'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

interface LoginFormProps {
  error?: string
}

export function LoginForm ({ error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data)
    } catch (error) {
      console.error(error)
    }
  }

  const hasError = !!error

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 px-6 pb-7'
    >
      <FormItem label='Correo electrónico'>
        <Input
          disabled={isSubmitting}
          register={register('email')}
          error={errors.email?.message}
          hasError={hasError}
          type='text'
          placeholder='example@mail.com'
        />
      </FormItem>
      <FormItem label='Contraseña'>
        <Input
          disabled={isSubmitting}
          register={register('password')}
          error={errors.password?.message}
          hasError={hasError}
          type='password'
          placeholder='Escribe tu contraseña'
        />
      </FormItem>
      <div>
        <Button loading={isSubmitting} className='mt-3 w-full' type='submit'>
          Iniciar sesión
        </Button>

        {error && (
          <p className='mt-2 animate-shake text-center text-sm text-red-500'>
            {error}
          </p>
        )}
      </div>

      <p className='mt-2 inline-flex flex-wrap justify-center gap-2 text-sm text-primary'>
        Nuevo usuario?
        <Link href='/register' className='text-highlight underline'>
          Regístrate
        </Link>
      </p>
    </form>
  )
}

interface RegisterFormProps {
  error?: string
}

export function RegisterForm ({ error }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterInput) => {
    try {
      const { confirmPassword, password } = data
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden')
      }
      await registerAction(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 px-6 pb-7'
    >
      <FormItem label='Nombre de usuario'>
        <Input
          disabled={isSubmitting}
          register={register('username')}
          error={errors.username?.message}
          type='text'
          placeholder='johndoe'
        />
      </FormItem>

      <FormItem label='Correo electrónico'>
        <Input
          disabled={isSubmitting}
          register={register('email')}
          error={errors.email?.message}
          type='text'
          placeholder='example@mail.com'
        />
      </FormItem>

      <FormItem label='Contraseña'>
        <Input
          disabled={isSubmitting}
          register={register('password')}
          error={errors.password?.message}
          type='password'
          placeholder='Escribe tu contraseña'
        />
      </FormItem>

      <FormItem label='Confirmar contraseña'>
        <Input
          disabled={isSubmitting}
          register={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          type='password'
          placeholder='Repite tu contraseña'
        />
      </FormItem>

      <div>
        <Button loading={isSubmitting} className='mt-3 w-full' type='submit'>
          Registrarse
        </Button>

        {error && (
          <p className='mt-2 animate-shake text-center text-sm text-red-500'>
            {error}
          </p>
        )}
      </div>

      <p className='mt-2 inline-flex justify-center gap-2 text-sm text-primary'>
        Ya tienes una cuenta?
        <Link href='/login' className='text-highlight underline'>
          Iniciar sesión
        </Link>
      </p>
    </form>
  )
}
