import { DEFAULT_PAGINATION } from '@/constants'
import { paginationSchema } from '@/schemas/pagination'

export function formatPostDate (date: Date) {
  const dateString = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return dateString
}

export function formatPagination (pagination: any = DEFAULT_PAGINATION) {
  const result = paginationSchema.safeParse(pagination ?? {})

  if (!result.success) return DEFAULT_PAGINATION

  const skip = (result.data.page - 1) * result.data.limit

  return {
    ...result.data,
    skip
  }
}
