import Badge, { getBadgeColor } from '@/components/common/badges'
import { MainContainer } from '@/components/common/containers'
import { categories } from '@/constants/categories'
import Link from 'next/link'

export default function CategoriesPage () {
  return (
    <MainContainer>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Nuestras categorías</h1>

      <ul className='mt-6 flex flex-wrap gap-4 pb-8'>
        {categories.map((category, index) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Badge variant={getBadgeColor(index)}>{category.name}</Badge>
          </Link>
        ))}
      </ul>
    </MainContainer>
  )
}
