interface SearchParams {
  error?: string
  message?: string
  page?: string
  limit?: string
  q?: string
  categoryId?: string
  userId?: string
}

interface Params {
  id: string
  userId: string
}

export interface ServerPageProps {
  searchParams: SearchParams
  params: Params
}
