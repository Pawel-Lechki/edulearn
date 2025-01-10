import { apiClientUrl } from "../globals"

export const getTopics = async () => {
  const response = await fetch(`${apiClientUrl}/api/topics`)
  const data = await response.json()
  return data
}
