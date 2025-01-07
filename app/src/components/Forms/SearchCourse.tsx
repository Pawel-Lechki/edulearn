import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import type { Course } from "../../types/types"
import CourseTable from "../Tables/CourseTable"
import { getCoursesByTitle } from "../../../use-cases/queries/courses"

const SearchCourse = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([])

  const handleSearch = async () => {
    try {
      const data = await getCoursesByTitle(searchTerm)
      setCourses(data)
    } catch (error) {
      toast.error("Błąd podczas wyszukiwania użytkowników")
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="Wyszukaj kurs"
          className="w-full p-4 border border-gray-300 rounded-l-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-buttonSecondary rounded-r-md p-4 text-buttonText border border-buttonSecondary"
          onClick={handleSearch}
        >
          Wyszukaj
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Wyniki wyszukiwania</h2>
        <CourseTable courses={courses} setCourses={setCourses} />
      </div>
    </>
  )
}

export default SearchCourse
