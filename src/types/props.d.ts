interface SearchParams {
  error?: string
  message?: string
  page?: string
  limit?: string
  q?: string
  categoryId?: string
  userId?: string
  slug?: string
  next?: string
  postId?: string
}

interface Params {
  id: string
  userId: string
  slug: string
}

export interface ServerPageProps {
  searchParams: SearchParams
  params: Params
}

export interface Pagination {
  currentPage: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}
