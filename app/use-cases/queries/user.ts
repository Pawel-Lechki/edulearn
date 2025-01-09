import { apiClientUrl } from "../globals"

export const getUsersByName = async (name: string) => {
  const response = await fetch(
    `${apiClientUrl}/api/users/s/search?name=${name}`
  )
  const data = await response.json()
  return data
}

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${apiClientUrl}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  return data
}
