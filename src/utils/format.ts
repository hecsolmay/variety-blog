export function formatPostDate (date: Date) {
  const dateString = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return dateString
}
