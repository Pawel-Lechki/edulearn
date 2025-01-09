import { apiServerUrl } from "../globals"

export const getImages = async (courseId: number) => {
  const response = await fetch(`${apiServerUrl}/api/courses/${courseId}/images`)
  if (!response.ok) {
    throw new Error("Failed to fetch images")
  }
  const data = await response.json()
  return data
}
