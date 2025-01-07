import { apiUrl } from "../globals"

export const getAllCourses = async () => {
  const response = await fetch(`${apiUrl}courses`)
  const data = await response.json()
  return data
}

export const getCoursesByTopic = async (topic: string) => {
  const response = await fetch(`${apiUrl}topics/${topic}`)
  const data = await response.json()
  return data
}

export const getCourseById = async (id: string) => {
  const response = await fetch(`${apiUrl}courses/${id}`)
  const data = await response.json()
  return data
}

export const getCoursesByTitle = async (title: string) => {
  const response = await fetch(`${apiUrl}courses/search?title=${title}`)
  const data = await response.json()
  return data
}
