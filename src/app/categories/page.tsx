import Badge, { getBadgeColor } from '@/components/common/badges'
import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import { categories } from '@/constants/categories'
import Link from 'next/link'

export default function CategoriesPage () {
  return (
    <MainContainer>
      <H1>Nuestras categorías</H1>

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
