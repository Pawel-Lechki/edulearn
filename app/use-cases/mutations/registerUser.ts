import { apiClientUrl } from "../globals"

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  role: string = "user",
  newsletter: boolean = false
) => {
  const response = await fetch(`${apiClientUrl}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, email, password, role }),
  })

  const data = await response.json()
  return data
}
