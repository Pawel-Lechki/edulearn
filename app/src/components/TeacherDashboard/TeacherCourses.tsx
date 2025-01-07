import { useState, useEffect } from "react"
import type { Course } from "../../types/types"
import toast from "react-hot-toast"
import CourseTable from "../Tables/CourseTable"

const TeacherCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const user_id = localStorage.getItem("userId")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/courses/teacher/${user_id}`
        )
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        toast.error("Something went wrong")
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-2xl text-text font-semibold">Twoje kursy:</h3>
      <CourseTable courses={courses} setCourses={setCourses} />
    </div>
  )
}

export default TeacherCourses
