import { apiUrl } from "../globals"

export const getTopics = async () => {
  const response = await fetch(`${apiUrl}/api/topics`)
  const data = await response.json()
  return data
}
