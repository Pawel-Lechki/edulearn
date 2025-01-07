import { useEffect, useState } from "react"
import type { CourseVariant } from "../types/types"
import QuantityInput from "./Forms/QuantityInput"

const LocalCart = () => {
  const [cartItems, setCartItems] = useState<CourseVariant[]>([])

  useEffect(() => {
    const savedCart =
      typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") || "{}")
        : []
    setCartItems(savedCart)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (index: number, newQuantity: number) => {
    const updatedCart = [...cartItems]
    const unitPrice = updatedCart[index].price / updatedCart[index].quantity // Get price per unit
    updatedCart[index] = {
      ...updatedCart[index],
      quantity: newQuantity,
      price: unitPrice * newQuantity,
    }
    setCartItems(updatedCart)
  }

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== index)
    setCartItems(updatedCart)
  }

  const total = cartItems
    ?.reduce((amount: number, item: CourseVariant) => item.price + amount, 0)
    .toFixed(2)

  return (
    <div className="py-20 text-text lg:w-[800px] mx-auto w-full">
      <h1 className="text-4xl font-bold mb-10">
        Twój koszyk: {cartItems.length}
      </h1>
      <div className="flex flex-col gap-5 bg-background2 p-20">
        {cartItems.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-semibold text-xl">
                {item.courseTitle} × {item.quantity}
              </p>
              <div>
                <QuantityInput
                  quantity={item.quantity}
                  setQuantity={(newQuantity) =>
                    updateQuantity(index, newQuantity)
                  }
                />
              </div>
            </div>
            <p>{item.price}</p>
          </div>
        ))}
        <div className="flex justify-between items-center border-t-2 border-text pt-4">
          <p className="font-semibold text-xl">Razem:</p>
          <p>{total}</p>
        </div>
        <a
          className="bg-text text-primary p-3 mt-10 rounded font-semibold text-center"
          href="/checkout"
        >
          Do kasy
        </a>
      </div>
    </div>
  )
}

export default LocalCart
