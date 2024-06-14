import { DEFAULT_PAGINATION } from '@/constants'
import { paginationSchema } from '@/schemas/pagination'

export function formatPostDate (date: Date) {
  const dateString = date.toLocaleDateString('es-MX', {
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

export function formatTitleSlug (title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatCommentDate (date: Date) {
  // With time
  const dateString = date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return dateString
}
