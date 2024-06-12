interface SearchParams {
  error?: string
  message?: string
}

interface Params {}

export interface ServerPageProps {
  searchParams: SearchParams
  params: Params
}
