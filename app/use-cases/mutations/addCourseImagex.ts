import { apiClientUrl } from "../globals"

export const addCourseImage = async (courseId: number, image: File) => {
  const formData = new FormData()
  formData.append("image", image)
  const response = await fetch(
    `${apiClientUrl}/api/courses/${courseId}/images`,
    {
      method: "POST",
      body: formData,
    }
  )
  if (!response.ok) {
    throw new Error("Failed to add course image")
  }
  return response.json()
}
