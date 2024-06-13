'use client'

import { updateAccount } from '@/actions/account'
import Button from '@/components/common/button'
import { FormItem } from '@/components/common/form'
import Input from '@/components/common/input'
import {
  ChangeProfileInput,
  ChangeProfileSchema
} from '@/schemas/account/change-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface ChangeProfileFormProps {
  id: string
  username: string
  email: string
}

export function ChangeProfileForm ({
  id,
  username,
  email
}: ChangeProfileFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ChangeProfileInput>({
    defaultValues: {
      username,
      email
    },
    resolver: zodResolver(ChangeProfileSchema)
  })

  const onSubmit = async (data: ChangeProfileInput) => {
    try {
      console.log(data)

      if (data.email === email && data.username === username) {
        toast.success('Se ha actualizado la información')
        return
      }

      await updateAccount(id, data)
      toast.success('Se ha guardado la información')
    } catch (error) {
      toast.error('Error al guardar la información')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <FormItem label='Nombre de usuario'>
        <Input
          error={errors.username?.message}
          type='text'
          register={register('username')}
        />
      </FormItem>

      <FormItem label='Correo Electrónico'>
        <Input
          error={errors.email?.message}
          type='email'
          register={register('email')}
        />
      </FormItem>

      <div className='mt-6 flex justify-end gap-4'>
        <Button
          type='button'
          onClick={() => {
            reset({ email, username })
          }}
          variant='secondary'
        >
          Cancelar
        </Button>
        <Button loading={isSubmitting} type='submit' variant='warning'>
          Guardar
        </Button>
      </div>
    </form>
  )
}
