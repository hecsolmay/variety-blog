import prisma from '@/utils/prisma'

export async function getUser (id: string)  {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  })

  return user
}
