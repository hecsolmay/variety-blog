import { PrismaClient } from '@prisma/client'
import { categories } from '../src/constants/categories'

const prisma = new PrismaClient()

async function main () {
  console.log('Seeding data...')

  const promises = categories.map(category =>
    prisma.category.upsert({
      where: {
        id: category.id
      },
      update: {
        id: category.id,
        name: category.name
      },
      create: {
        id: category.id,
        name: category.name
      }
    })
  )

  const categoriesCreated = await prisma.$transaction(promises)

  console.log('Categories created:', categoriesCreated)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
