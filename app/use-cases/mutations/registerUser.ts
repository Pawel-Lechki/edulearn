import { apiUrl } from "../globals"

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${apiUrl}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  })

  const data = await response.json()

  return data
}
