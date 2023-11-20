export interface Filter {
  getCategory: (categories: string[]) => void
  getPageCount: (count: number) => void
}

export interface QueryProps {
  category: Array<string>
  pageCount: number
}
