import Badge, { getBadgeColor } from '@/components/common/badges'
import { categories } from '@/constants/categories'
import Link from 'next/link'

export default function HomeCategoriesSection () {
  const mainCategories = categories.slice(0, 5)

  return (
    <section className='px-4 md:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
        Explora nuestras categorías
      </h2>

      <div className='mt-6 flex flex-row flex-wrap gap-4'>
        {mainCategories.map((category, index) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Badge variant={getBadgeColor(index)}>{category.name}</Badge>
          </Link>
        ))}

        <Link href='/categories'>
          <Badge variant='default'>Ver más</Badge>
        </Link>
      </div>
    </section>
  )
}
