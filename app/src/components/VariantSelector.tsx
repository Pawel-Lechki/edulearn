import { useState } from "react"
import QuantityInput from "./Forms/QuantityInput"
import type { CourseVariant } from "../types/types"

interface VariantSelectorProps {
  cousrseVariant: CourseVariant
  setCourseVariant: (variant: any) => void
  besePrice: number
  onPriceChange: (price: number) => void
}

const VariantSelector = ({
  cousrseVariant,
  setCourseVariant,
  besePrice,
  onPriceChange,
}: VariantSelectorProps) => {
  const [quantity, setQuantity] = useState<number>(cousrseVariant.quantity)
  const [discountCode, setDiscountCode] = useState<string>("")

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity)
    setCourseVariant({ ...cousrseVariant, quantity })
    const newPrice = besePrice * quantity
    onPriceChange(newPrice)
  }

  const handleDiscountCodeChange = (code: string) => {
    setDiscountCode(code)
    if (code === "PROMO") {
      const newPrice = besePrice * 0.9 * quantity
      onPriceChange(newPrice)
    } else {
      const newPrice = besePrice * quantity
      onPriceChange(newPrice)
    }
  }

  return (
    <div className="w-60 bg-background1 rounded-md py-10 px-5">
      <QuantityInput quantity={quantity} setQuantity={handleQuantityChange} />
      <div className="mt-2">
        <label
          htmlFor="size-select"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Kod promocyjny
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="size-select"
            className="w-full h-11 border rounded-lg p-2"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button
            className="bg-buttonPrimary py-2 px-2 rounded-lg font-semibold border-2 border-buttonPrimary text-text hover:bg-transparent hover:text-buttonPrimary"
            onClick={() => handleDiscountCodeChange(discountCode)}
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  )
}
export default VariantSelector
