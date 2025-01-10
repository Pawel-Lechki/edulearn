import { apiClientUrl } from "../globals"

export const createCourse = async (formData: FormData) => {
  const response = await fetch(`${apiClientUrl}/api/courses`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to create course")
  }
  return response.json()
}
