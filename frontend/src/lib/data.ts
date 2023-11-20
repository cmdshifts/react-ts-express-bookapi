export const fetchBooks = async (
  categories?: Array<String>,
  pageCount?: number,
) => {
  const API_URL = 'http://localhost:8080'
  const categoryArray = categories || ''
  const pageCountValue = pageCount || 0
  const books = await fetch(
    `${API_URL}/getBooks?categories=${categoryArray}&pageCount=${pageCountValue}`,
  )
  return books.json()
}

export const fetchCategoryList = async () => {
  const API_URL = 'http://localhost:8080'
  const categories = await fetch(`${API_URL}/getCategoryList`)
  return categories.json()
}
