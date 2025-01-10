import { useCartStore } from "../store/cartStore"
import QuantityInput from "./Forms/QuantityInput"

const LocalCart = () => {
  const { items, removeItem, updateQuantity } = useCartStore()

  const total =
    items && items.length > 0
      ? Number(
          items.reduce((sum, item) => sum + Number(item.price), 0)
        ).toFixed(2)
      : "0.00"

  return (
    <div className="py-20 text-text lg:w-[800px] mx-auto w-full">
      <h1 className="text-4xl font-bold mb-10">Twój koszyk: {items.length}</h1>
      <div className="flex flex-col gap-5 bg-background2 p-20">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-semibold text-xl">
                {item.courseTitle} × {item.quantity}
              </p>
              <div>
                <QuantityInput
                  quantity={item.quantity}
                  setQuantity={(newQuantity) =>
                    updateQuantity(item.courseId, newQuantity)
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p>{item.price}</p>
              <button
                onClick={() => removeItem(item.courseId)}
                className="text-red-500 hover:text-red-700"
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center border-t-2 border-text pt-4">
          <p className="font-semibold text-xl">Razem:</p>
          <p>{total} PLN</p>
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
