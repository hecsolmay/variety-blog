import HomeHero from '@/components/common/hero'
import HomeCategoriesSection from '@/components/sections/home/categories'
import HomePostSection from '@/components/sections/home/post'

export default function Home () {

  return (
    <main className='m-auto max-w-7xl pb-8'>
      <HomeHero />
      <HomeCategoriesSection />
      <HomePostSection />
    </main>
  )
}
