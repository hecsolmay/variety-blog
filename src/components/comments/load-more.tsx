'use client'

import { getCommentsAction } from '@/actions/comments'
import { CommentCard } from '@/components/comments/card'
import { FallbackLoadingComments } from '@/components/fallbacks/comments'
import { SingleComment } from '@/types/comments'
import { Pagination } from '@/types/props'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface LoadMoreProps {
  postId: string
  pagination: Pagination
}

export default function LoadMore ({ postId, pagination }: LoadMoreProps) {
  const { ref, inView } = useInView()
  const [comments, setComments] = useState<SingleComment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPagination, setCurrentPagination] =
    useState<Pagination>(pagination)

  useEffect(() => {
    if (!inView || !currentPagination.hasNext || isLoading) {
      return
    }

    const nextPage = currentPagination.currentPage + 1

    const fetchComments = async () => {
      setIsLoading(true)
      try {
        const newResult = await getCommentsAction({
          postId,
          page: nextPage,
          limit: currentPagination.limit
        })
        if (newResult.error !== undefined) {
          return
        }

        setComments(comments => [...comments, ...newResult.comments])
        setCurrentPagination(newResult.pagination)
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [inView, currentPagination])

  useEffect(() => {
    setComments([])
    setCurrentPagination(pagination)
  }, [pagination])

  const hasMore = currentPagination.hasNext

  return (
    <>
      {comments.map(comment => (
        <li key={comment.id} className='flex flex-wrap gap-4'>
          <CommentCard comment={comment} />
        </li>
      ))}
      {hasMore && <FallbackLoadingComments ref={ref} />}
      {!hasMore && (
        <p className='text-center text-sm text-gray-500'>
          No hay más comentarios
        </p>
      )}
    </>
  )
}
