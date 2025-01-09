import { apiClientUrl } from "../globals"

export const updateCourse = async (courseId: number, updatedCourse: any) => {
  const response = await fetch(`${apiClientUrl}/api/courses/${courseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCourse),
  })

  if (!response.ok) {
    throw new Error("Failed to update course")
  }
  const data = await response.json()
  return data
}
