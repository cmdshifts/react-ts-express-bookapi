export type BookQuery = {
  categories: Array<String>
  pageCount: {
    $gte: Number
  }
}
