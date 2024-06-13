interface PostsBadgeProps {
  postsCount: number
}

export default function PostsBadge ({ postsCount }: PostsBadgeProps) {
  const postCountText = postsCount > 99 ? '99+' : postsCount.toString()

  return (
    <span className='mt-1 block rounded-full bg-slate-800 px-1.5 py-[2px] text-center text-sm font-medium text-white'>
      {postCountText} posts
    </span>
  )
}
