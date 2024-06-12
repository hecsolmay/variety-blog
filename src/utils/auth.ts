'use server'

import { getUser } from '@/service/users'
import { createClient } from './supabase/server'

export async function getSession () {
  try {
    const supabase = createClient()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || user === null) {
      return null
    }

    const userData = await getUser(user.id)

    if (userData === null) {
      return null
    }

    return userData
  } catch (error) {
    console.error(error)
    return null
  }
}
