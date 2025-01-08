import { useEffect, useState } from "react"
import type { Course as CoruseType, CourseVariant } from "../types/types"
import RelatedProducts from "./RelatedCourses"
import CourseBody from "./CourseBody"
import courseImg from "../assets/course.svg"
import VariantSelector from "./VariantSelector"

interface CourseProps {
  course: CoruseType
}

const Course = ({ course }: CourseProps) => {
  const [buttonText, setButtonText] = useState<string>("Dodaj do koszyka")
  const [currentPrice, setCurrentPrice] = useState(course.price)
  const [courseVariant, setCourseVariant] = useState<CourseVariant>({
    courseId: course.id,
    courseTitle: course.title,
    quantity: 1,
    discount: 0,
    price: course.price,
  })
  const [cart, setCart] = useState<any>([])

  useEffect(() => {
    setCourseVariant((prev) => ({
      ...prev,
      price: currentPrice,
    }))
  }, [currentPrice])

  const addToCard = (course: any) => {
    setButtonText("Dodawanie...")
    // setCourseVariant({ ...courseVariant, price: currentPrice })
    const newCart = [...cart, courseVariant]
    setCart(newCart)
    setButtonText("Dodano do koszyka 🎉")
    setTimeout(() => setButtonText("Dodaj do koszyka"), 1000)
    console.log(cart)
  }

  const handlePriceChange = (price: number) => {
    setCurrentPrice(price)
  }

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <div className="flex lg:flex-row gap-2 w-full items-center flex-col">
        <div className="flex flex-col text-text w-[400px]">
          <h1 className="font-extrabold text-5xl mb-3">{course.title}</h1>
          <p className="text-xl">{course.description}</p>
        </div>
        <img
          src={course.image ? course.image : courseImg.src}
          alt={course.title}
          className="w-[500px] object-cover rounded-sm mx-auto"
        />
        <div className="lg:mb-0 mb-5">
          {/* TODO: Add option to add promo code */}
          <VariantSelector
            cousrseVariant={courseVariant}
            setCourseVariant={setCourseVariant}
            besePrice={course.price}
            onPriceChange={handlePriceChange}
          />
        </div>
      </div>
      <div className="flex z-10 justify-between lg:w-5/12 w-8/12 mx-auto bg-background1 p-5 text-text rounded-xl">
        <div>
          <p className="font-semibold text-sm">Koszt:</p>
          <p className="font-bold text-lg">
            {/* // TODO: Add price with discount */}
            {currentPrice.toLocaleString("pl-PL")} PLN
          </p>
        </div>
        <button
          className="bg-background2 px-4 rounded-xl"
          onClick={() => addToCard(course)}
        >
          {buttonText}
        </button>
      </div>
      {/* TODO: Add CourseBody */}
      <CourseBody courseId={course.id} description={course.description} />
      <p className="text-text mb-4 font-semibold">Powiązane kursy:</p>
      {/* <RelatedProducts products={course.relatedProducts} /> */}
    </>
  )
}

export default Course
