import { apiServerUrl } from "../globals"

export const getTopics = async () => {
  const response = await fetch(`${apiServerUrl}/api/topics`)
  const data = await response.json()
  return data
}
