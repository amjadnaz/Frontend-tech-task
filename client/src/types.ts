export type Category = {
  name: string
  articles: Article[]
  articleCount: number
  childCategories: ChildCategory[]
}

export type Article = {
  name:  string
  variantName: string
  prices: Prices
  images: Image[]
}

export type ChildCategory = {
  name: string
  urlPath: string
}

export type Prices = {
  currency: string
  value: number
}

export type Image = {
  path: string
}