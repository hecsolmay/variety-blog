interface SearchParams {
  error?: string
  message?: string
  page?: string
  limit?: string
  q?: string
  categoryId?: string
}

interface Params {
  id: string
}

export interface ServerPageProps {
  searchParams: SearchParams
  params: Params
}
