import { apiUrl } from "../globals"

export const getAllCourses = async () => {
  const response = await fetch(`${apiUrl}/api/courses`)
  const data = await response.json()
  return data
}

export const getCoursesByTopic = async (topic: string) => {
  const response = await fetch(`${apiUrl}/api/topics/${topic}`)
  const data = await response.json()
  return data
}

export const getCourseById = async (id: string) => {
  const response = await fetch(`${apiUrl}/api/courses/${id}`)
  const data = await response.json()
  return data
}

export const getCoursesByTitle = async (title: string) => {
  const response = await fetch(`${apiUrl}/api/courses/search?title=${title}`)
  const data = await response.json()
  return data
}
