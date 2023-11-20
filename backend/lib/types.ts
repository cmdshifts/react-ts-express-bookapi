export type Query = {
  categories?: {
    $in: String[]
  }
  pageCount?: {
    $gte: Number
  }
}
