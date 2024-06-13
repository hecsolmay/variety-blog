interface SearchParams {
  error?: string
  message?: string
  page?: string
  limit?: string
  q?: string
  categoryId?: string
  userId?: string
  slug?: string
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
