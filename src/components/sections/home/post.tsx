import PostCard from '@/components/posts/card'

const categories = [
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'negocios-y-finanzas', name: 'Negocios y finanzas' },
  { id: 'tecnología-y-desarrollo', name: 'Tecnología y desarrollo' },
  { id: 'ciencia-y-tecnología', name: 'Ciencia y tecnología' },
  { id: 'economía', name: 'Economía' }
]

const author = {
  id: '1232422',
  username: 'Juan',
  email: 'juan@example.com',
  profileImage: '/assets/images/user-avatar.webp'
}

const examplePost = {
  title: 'El post de ejemplo',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image:
    'https://puregaming.es/wp-content/uploads/2024/06/Mortal-Kombat-1-560x370.jpg',
  date: new Date(),
  categories,
  author
}

const generateSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-')
const posts = Array.from({ length: 10 }).map((_, index) => ({
  id: `${generateSlug(examplePost.title)}-${index}`,
  ...examplePost
}))

export default function HomePostSection () {
  return (
    <section className='mt-12 max-w-7xl px-4 md:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
        Publicaciones recientes
      </h2>

      <div className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 2xl:grid-cols-4'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
