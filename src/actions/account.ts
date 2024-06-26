'use server'

import { ChangeProfileInput } from '@/schemas/account/change-profile'
import { updateUser } from '@/service/users'
import { revalidateTag } from 'next/cache'

export async function updateAccount (userId: string, data: ChangeProfileInput) {
  const updatedUser = await updateUser({ ...data, id: userId })
  revalidateTag('profile')
  return updatedUser
}

export async function updateImageProfile (userId: string, profileImage: string) {
  const updatedUser = await updateUser({  id: userId, profileImage })
  revalidateTag('profile')
  return updatedUser
}
