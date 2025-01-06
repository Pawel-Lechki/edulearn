import toast, { Toaster } from "react-hot-toast"
import CourseTable from "./CourseTable"
import { useState } from "react"
import type { Course } from "../types/types"

const SearchCourse = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([])

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/courses/search?title=${searchTerm}`
      )
      const data = await response.json()
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
