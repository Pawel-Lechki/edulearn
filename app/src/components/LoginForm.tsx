import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8080/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        const token = btoa(`${data.id}:${data.role}:${Date.now()}`)
        localStorage.setItem("session", token)
        localStorage.setItem("userId", data.id)
        localStorage.setItem("role", data.role)
        window.location.href = `/dashboard/${data.role}`
      } else {
        toast.error(data.message || "Niepoprawny email lub haslo")
      }
    } catch (error) {
      console.log("Error details:", error)
      toast.error("Wystąpił błąd. Spróbuj ponownie później.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border border-gray-300 rounded-lg text-xl"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Haslo"
          className="w-full p-4 border border-gray-300 rounded-lg text-xl"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <button className="w-full p-4 bg-buttonSecondary text-white rounded-lg text-xl">
          Zaloguj
        </button>
      </div>
      <div className="mt-20 bg-background2 p-4 rounded-lg">
        <p className="text-xl">
          Nie masz konta?{" "}
          <a href="/register" className="text-blue-500 text-xl underline">
            Zarejestruj się
          </a>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
