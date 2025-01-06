export type Product = {
  id: number
  title: string
  description: string
  imageUrl?: string
  price: number
  topics: string[]
}

export type Course = {
  id: number
  title: string
  short_description: string
  description: string
  image?: string
  price: number
  related: number
  user_id: number
  topics: string[]
}

export type CourseVariant = {
  courseId: number
  courseTitle: string
  quantity: number
  discount: number
  price: number
}

export type Topic = {
  id: number
  name: string
}
