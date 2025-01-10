import { useEffect, useState } from "react"
import { getImages } from "../../use-cases/queries/courseImages"
import type { CourseImage } from "../types/types"
import toast from "react-hot-toast"

interface CourseBodyProps {
  courseId: number
  description: string
}

const CourseBody = ({ courseId, description }: CourseBodyProps) => {
  const [images, setImages] = useState<CourseImage[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImages(courseId)
        setImages(images)
      } catch (error) {
        toast.error("Błąd podczas pobierania zdjęć")
      }
    }
    fetchImages()
  }, [])
  return (
    <div className="flex flex-col gap-3 my-10 lg:w-9/12 w-full mx-auto z-10">
      <p className="text-text font-semibold">Opis kursu:</p>
      <div
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {images && images.length > 0 && (
        <div className="mt-8">
          <p className="text-text font-semibold mb-4">Galeria kursu:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={image.image}
                  alt={`Zdjęcie kursu ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseBody
