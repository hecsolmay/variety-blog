interface SearchParams {
  error?: string
  message?: string
  page?: string
  limit?: string
  q?: string
}

interface Params {
  id: string
}

export interface ServerPageProps {
  searchParams: SearchParams
  params: Params
}
