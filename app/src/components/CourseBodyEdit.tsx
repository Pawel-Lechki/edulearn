import { FaPencilAlt, FaUpload } from "react-icons/fa"
import { updateCourse } from "../../use-cases/mutations/updateCourse"
import toast from "react-hot-toast"
import { useState } from "react"

interface CourseBodyEditProps {
  course: {
    id: number
    description: string
  }
}

const CourseBodyEdit = ({ course }: CourseBodyEditProps) => {
  const [editing, setEditing] = useState(false)
  const [description, setDescription] = useState(course.description)
  const [images, setImages] = useState<File[]>([])

  const handleSave = async () => {
    try {
      await updateCourse(course.id, { description })
      setEditing(false)
      toast.success("Zaktualizowano opis")
    } catch (error) {
      toast.error("Wystąpił błąd podczas aktualizacji")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      try {
        await updateCourse(course.id, { image: formData })
        toast.success("Zaktualizowano obrazek")
      } catch (error) {
        toast.error("Wystąpił błąd podczas aktualizacji")
      }
    }
  }

  return (
    <div className="flex flex-col gap-3 my-10 lg:w-9/12 w-full mx-auto z-10">
      <p className="text-text font-semibold">Opis kursu:</p>
      <div className="flex items-start gap-2">
        {editing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleSave}
            autoFocus
            className="w-full min-h-[200px] p-2 border rounded"
          />
        ) : (
          <>
            <p className="text-text">{description}</p>
            <button onClick={() => setEditing(true)}>
              <FaPencilAlt className="text-gray-500 hover:text-gray-700" />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <label className="cursor-pointer bg-background2 px-4 py-2 rounded-xl flex items-center gap-2">
          <FaUpload />
          <span>Dodaj zdjęcia</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      <div className="flex gap-2">
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 my-4">
            {Array.from(images).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseBodyEdit
