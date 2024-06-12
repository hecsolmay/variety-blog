'use server'

import { createClient } from './supabase/server'

export async function getSession () {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || user === null) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    username: user.user_metadata.username ?? 'Nombre de usuario',
    profileImage: '/assets/images/user-avatar.webp'

  }
}
