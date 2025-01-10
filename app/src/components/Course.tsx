import { useEffect, useState } from "react"
import type { Course as CourseType, CourseVariant } from "../types/types"
import RelatedProducts from "./RelatedCourses"
import CourseBody from "./CourseBody"
import courseImg from "../assets/course.svg"
import VariantSelector from "./VariantSelector"
import { useCartStore } from "../store/cartStore"
import { apiClientUrl, apiServerUrl } from "../../use-cases/globals"

interface CourseProps {
  course: CourseType
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

  useEffect(() => {
    setCourseVariant((prev) => ({
      ...prev,
      price: currentPrice,
    }))
  }, [currentPrice])

  const addToCart = () => {
    useCartStore.getState().addItem(courseVariant)
    setButtonText("Dodano do koszyka 🎉")
    setTimeout(() => setButtonText("Dodaj do koszyka"), 1000)
  }

  const handlePriceChange = (price: number) => {
    setCurrentPrice(price)
  }

  return (
    <>
      <div className="flex lg:flex-row gap-2 w-full items-center flex-col">
        <div className="flex flex-col text-text w-[400px]">
          <h1 className="font-extrabold text-5xl mb-3">{course.title}</h1>
          <div
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: course.short_description }}
          />
        </div>
        <img
          src={course.image ? `${apiClientUrl}/${course.image}` : courseImg.src}
          alt={course.title}
          className="w-[500px] object-cover rounded-sm mx-auto"
        />
        <div className="lg:mb-0 mb-5">
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
            {currentPrice.toLocaleString("pl-PL")} PLN
          </p>
        </div>
        <button className="bg-background2 px-4 rounded-xl" onClick={addToCart}>
          {buttonText}
        </button>
      </div>
      <CourseBody courseId={course.id} description={course.description} />
      <p className="text-text mb-4 font-semibold">Powiązane kursy:</p>
    </>
  )
}

export default Course
