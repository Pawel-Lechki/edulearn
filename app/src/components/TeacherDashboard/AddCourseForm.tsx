import { useState } from "react"

import toast, { Toaster } from "react-hot-toast"
import TopicSelect from "../Forms/TopicSelect"

const AddCourseForm = () => {
  const [formData, setFormData] = useState<{
    title: string
    short_description: string
    description: string
    price: number
    image: File | null
    topics: number[]
    related: string
    user_id: string
  }>({
    title: "",
    short_description: "",
    description: "",
    price: 0,
    image: null,
    topics: [],
    related: "",
    user_id: localStorage.getItem("userId") || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files ? e.target.files[0] : null,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (typeof value === "string" || value instanceof Blob) {
          data.append(key, value)
        } else if (typeof value === "number") {
          data.append(key, value.toString())
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            data.append(`${key}[${index}]`, item.toString())
          })
        }
      }
    })

    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        body: data,
      })

      if (response.ok) {
        toast.success("Kurs został dodany!")
        // Optional: Clear form or redirect
      } else {
        toast.error("Nie udało się dodać kursu")
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas dodawania kursu")
    }
  }

  return (
    <div className="w-1/2 mx-auto p-6">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">
              Nazwa kursu
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">
              Krótki opis
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              rows={4}
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">Opis</label>
            <p>tu będzie wysiwyg</p>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">Cena</label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">
              Miniaturka kursu
            </label>
            <input
              type="file"
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-background3"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">Tematy</label>
            <TopicSelect
              onChange={(selectedTopics: number[]) =>
                setFormData({ ...formData, topics: selectedTopics })
              }
            />
          </div>
          <div className="mb-3">
            <label className="text-text font-semibold block mb-2">
              {" "}
              Powiązane kursy
            </label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              name="related"
              value={formData.related}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Podaj id powiązanego kursu, aby go dodać
            </p>
          </div>
          <div className="mb-3">
            <button
              className="bg-buttonPrimary text-text font-semibold px-6 py-3 rounded-md"
              type="submit"
            >
              Dodaj
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default AddCourseForm
