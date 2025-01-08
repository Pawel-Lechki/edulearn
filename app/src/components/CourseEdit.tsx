import { useEffect, useState } from "react"
import type { Course as CoruseType, CourseVariant } from "../types/types"
import RelatedProducts from "./RelatedCourses"
import CourseBodyEdit from "./CourseBodyEdit"
import courseImg from "../assets/course.svg"
import VariantSelector from "./VariantSelector"
import { FaPencilAlt } from "react-icons/fa"
import toast from "react-hot-toast"
import { updateCourse } from "../../use-cases/mutations/updateCourse"

interface CourseProps {
  course: CoruseType
}

type EditableFields = {
  title: string
  short_description: string
  description: string
  price: number
}

const CourseEdit = ({ course }: CourseProps) => {
  const [buttonText, setButtonText] = useState<string>("Dodaj do koszyka")
  const [currentPrice, setCurrentPrice] = useState(course.price)
  const [editing, setEditing] = useState({
    title: false,
    short_description: false,
    description: false,
    currentPrice: false,
    price: false,
  })

  const [values, setValues] = useState({
    title: course.title,
    short_description: course.short_description,
    description: course.description,
    price: course.price,
  })

  const handleEdit = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: true }))
  }

  const handleSave = async (field: keyof EditableFields) => {
    try {
      await updateCourse(course.id, {
        [field]: values[field],
        id: 0,
        title: "",
        short_description: "",
        description: "",
        price: 0,
        related: 0,
        user_id: Number(localStorage.getItem("userId")) || 0,
        topics: [],
      })
      setEditing((prev) => ({ ...prev, [field]: false }))
      toast.success("Zaktualizowano pomyślnie")
    } catch (error) {
      toast.error("Wystąpił błąd podczas aktualizacji")
    }
  }

  return (
    <>
      <div className="flex lg:flex-row gap-2 w-full items-center flex-col">
        <div className="flex flex-col text-text w-[400px]">
          <div className="flex items-center gap-2">
            {editing.title ? (
              <input
                value={values.title}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, title: e.target.value }))
                }
                onBlur={() => handleSave("title")}
                autoFocus
              />
            ) : (
              <>
                <h1 className="font-extrabold text-5xl mb-3">{values.title}</h1>
                <button onClick={() => handleEdit("title")}>
                  <FaPencilAlt className="text-gray-500 hover:text-gray-700" />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {editing.short_description ? (
              <textarea
                value={values.short_description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    short_description: e.target.value,
                  }))
                }
                onBlur={() => handleSave("short_description")}
                autoFocus
              />
            ) : (
              <>
                <p className="text-xl">{values.short_description}</p>
                <button onClick={() => handleEdit("short_description")}>
                  <FaPencilAlt className="text-gray-500 hover:text-gray-700" />
                </button>
              </>
            )}
          </div>
        </div>
        <img
          src={course.image ? course.image : courseImg.src}
          alt={course.title}
          className="w-[500px] object-cover rounded-sm mx-auto"
        />
        <div className="lg:mb-0 mb-5">
          <div className="w-60 h-80 bg-background1 rounded-md py-10 px-5 flex flex-col justify-center items-center text-center">
            Tutaj klient będzie mógł wybrać wariant kursu
          </div>
        </div>
      </div>
      <div className="flex z-10 justify-between lg:w-5/12 w-8/12 mx-auto bg-background1 p-5 text-text rounded-xl">
        <div>
          <p className="font-semibold text-sm">Koszt:</p>
          <div className="flex items-center gap-2">
            {editing.title ? (
              <input
                value={values.title}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, title: e.target.value }))
                }
                onBlur={() => handleSave("title")}
                autoFocus
              />
            ) : (
              <>
                <p className="font-bold text-lg">
                  {" "}
                  {values.price.toLocaleString("pl-PL")} PLN
                </p>
                <button onClick={() => handleEdit("title")}>
                  <FaPencilAlt className="text-gray-500 hover:text-gray-700" />
                </button>
              </>
            )}
          </div>
        </div>
        <button className="bg-background2 px-4 rounded-xl" disabled>
          {buttonText}
        </button>
      </div>
      {/* TODO: Add CourseBody */}
      <CourseBodyEdit course={course} />
      <p className="text-text mb-4 font-semibold">Powiązane kursy:</p>
      {/* <RelatedProducts products={course.relatedProducts} /> */}
    </>
  )
}

export default CourseEdit
