import { apiUrl } from "../globals"

export const createCourse = async (formData: FormData) => {
  const response = await fetch(`${apiUrl}/api/courses`, {
    method: "POST",
    body: formData,
    // headers: {
    //   Accept: "application/json",
    // },
  })

  if (!response.ok) {
    throw new Error("Failed to create course")
  }

  return response.json()
}
