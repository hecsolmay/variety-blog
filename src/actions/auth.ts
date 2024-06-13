'use server'

import type { LoginInput } from '@/schemas/auth/login'
import { RegisterInput } from '@/schemas/auth/register'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login (data: LoginInput, redirectTo?: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword(data)
  const redirectUrl = redirectTo ?? '/'

  if (error !== null) {
    const message = 'Credenciales incorrectas'
    redirect(`/login?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/', 'layout')
  redirect(redirectUrl)
}

export async function register (data: RegisterInput) {
  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_name: data.username,
        profile_image: '/assets/images/user-avatar.webp'
      }
    }
  })

  if (error !== null) {
    console.error(error)
    const message = 'Hubo un error al registrarse'
    redirect(`/register?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/confirm?message=El proceso de registro ha sido exitoso')
}

export async function logOut () {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
