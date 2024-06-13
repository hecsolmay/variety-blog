import { Workflow } from 'lucide-react'

interface CommentsListProps {
  postId: string
}

// const EXAMPLE_COMMENTS = [
//   { id: '1', author: { id: '1', username: 'User 1', email: 'user1@example.com', profileImage: '/assets/images/user-avatar.webp' }, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', createdAt: '2022-01-01T00:00:00.000Z' },
//   { id: '2', author: { id: '2', username: 'User 2', email: 'user2@example.com', profileImage: '/assets/images/user-avatar.webp' }, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', createdAt: '2022-01-01T00:00:00.000Z' },
//   { id: '3', author: { id: '3', username: 'User 3', email: 'user3@example.com', profileImage: '/assets/images/user-avatar.webp' }, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', createdAt: '2022-01-01T00:00:00.000Z' }
// ]

export function CommentsList ({ postId }: CommentsListProps) {
  return (
    <div className="grid h-32 place-content-center">
      <h1 className='inline-flex gap-2 text-xl text-primary'>Se esta trabajando en esta funcionalidad <Workflow className='size-6'/></h1>
    </div>
    // <ul className='mt-6 flex flex-wrap gap-4 pb-8'>
    //   {EXAMPLE_COMMENTS.map((comment) => (
    //     <li key={comment.id}>
    //       <div className='flex items-center gap-4'>
    //         <img
    //           src={comment.author.profileImage ?? '/assets/images/user-avatar.webp'}
    //           className='size-10 rounded-full'
    //           alt={`Imagen de perfil del usuario ${comment.author.email}`}
    //         />

  //         <div className='text-sm'>
  //           <p className='text-base font-medium text-primary'>
  //             {comment.author.username}
  //           </p>
  //           <p className='mt-1 font-normal text-gray-700'>
  //             {comment.createdAt}
  //           </p>
  //         </div>
  //       </div>

  //       <p className='mt-4 w-full whitespace-pre-line text-balance text-primary opacity-90'>
  //         {comment.content}
  //       </p>
  //     </li>
  //   ))}
  // </ul>
  )
}
