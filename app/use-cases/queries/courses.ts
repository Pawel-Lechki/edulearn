import { apiClientUrl, apiServerUrl } from "../globals"

export const getAllCourses = async () => {
  const response = await fetch(`${apiServerUrl}/api/courses`)
  const data = await response.json()
  return data
}

export const getCoursesByTopic = async (topic: string) => {
  const response = await fetch(`${apiServerUrl}/api/topics/${topic}`)
  const data = await response.json()
  return data
}

export const getCourseById = async (id: string) => {
  const response = await fetch(`${apiServerUrl}/api/courses/${id}`)
  const data = await response.json()
  return data
}

export const getCoursesByTitleServer = async (title: string) => {
  const response = await fetch(
    `${apiServerUrl}/api/courses/search?title=${title}`
  )
  const data = await response.json()
  return data
}

export const getCoursesByTitleClient = async (title: string) => {
  const response = await fetch(
    `${apiClientUrl}/api/courses/search?title=${title}`
  )
  const data = await response.json()
  return data
}
