import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { registerUser } from "../../../use-cases/mutations/registerUser"

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
    role: "user",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await registerUser(
        formData.username,
        formData.email,
        formData.password
      )

      if (data) {
        toast.success("Rejestracja przebiegla pommyslnie!")
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      } else {
        toast.error("Coś poszło nie tak")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Imie i nazwisko"
          className="w-full p-4 border border-gray-300 rounded-lg text-xl"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
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
      <div className="flex items-baseline mb-4 justify-start gap-4">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          className="w-6 h-5 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
        />
        <label
          htmlFor="link-checkbox"
          className="text-xl text-left font-medium text-gray-900"
        >
          Wysylaj mi oferty specjalne, spersonalizowane rekomendacje i wskazówki
          dotyczące nauki.
        </label>
      </div>
      <div className="mb-4">
        <button className="w-full p-4 bg-buttonSecondary text-white rounded-lg text-xl">
          Zarejestruj się
        </button>
      </div>
      <div className="mt-20 bg-background2 p-4 rounded-lg">
        <p className="text-xl">
          Posiadasz juz konto?{" "}
          <a href="/login" className="text-blue-500 text-xl underline">
            Zaloguj się
          </a>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
