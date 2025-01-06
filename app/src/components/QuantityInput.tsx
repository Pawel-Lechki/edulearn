interface QuantityInputProps {
  quantity: number
  setQuantity: (quantity: number) => void
}

const QuantityInput = ({ quantity, setQuantity }: QuantityInputProps) => {
  const handleIncrement = () => {
    if (quantity >= 10) return
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }
  return (
    <div>
      <label
        htmlFor="quantity-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Wybierz ilośc:
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-buttonPrimary hover:bg-gray-200 border border-buttonPrimary rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={handleDecrement}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-text text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1"
          value={quantity}
          min={1}
          max={10}
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="bg-buttonPrimary hover:bg-gray-200 border border-buttonPrimary rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={handleIncrement}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Maksmalna ilość to 10
      </p>
    </div>
  )
}

export default QuantityInput
