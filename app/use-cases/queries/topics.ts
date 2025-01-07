import { apiUrl } from "../globals"

export const getTopics = async () => {
  const response = await fetch(`${apiUrl}topics`)
  const data = await response.json()
  return data
}
