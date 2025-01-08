import { useState, useEffect } from "react"
import type { CourseVariant } from "../types/types"

const CheckoutForm = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
  })

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      window.location.href = "/"
    }
  }, [])

  const { firstName, lastName, email, street, city, postalCode } = state

  const cart =
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "{}")
      : []

  const total = cart?.reduce(
    (amount: number, item: CourseVariant) => item.price + amount,
    0
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Formularz zamówienia</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Imię"
            value={firstName}
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nazwisko"
            value={lastName}
            onChange={(e) => setState({ ...state, lastName: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Ulica"
          value={street}
          onChange={(e) => setState({ ...state, street: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Miasto"
            value={city}
            onChange={(e) => setState({ ...state, city: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Kod pocztowy"
            value={postalCode}
            onChange={(e) => setState({ ...state, postalCode: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <div className="border-t pt-4">
          <p className="text-xl font-bold">Suma: {total} PLN</p>
        </div>
        <button
          type="submit"
          className="w-full bg-buttonPrimary text-white py-3 rounded-lg"
        >
          Zamów
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm
