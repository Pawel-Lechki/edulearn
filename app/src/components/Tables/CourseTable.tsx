import toast from "react-hot-toast"
import type { Course } from "../../types/types"

interface CourseTableProps {
  courses: Course[]
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
}

const CourseTable = ({ courses, setCourses }: CourseTableProps) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        toast.success("Kurs został usunięty")
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== id)
        )
      } else {
        toast.error("Błąd podczas usuwania kursu")
      }
    } catch (error) {
      toast.error("Błąd podczas usuwania kursu")
    }
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right text-text ">
      <thead className="text-xs text-text uppercase bg-background2">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Nazwa
          </th>
          <th scope="col" className="px-6 py-3">
            Cena
          </th>
          <th scope="col" className="px-6 py-3">
            user_id
          </th>
          <th scope="col" className="px-6 py-3">
            Akcje
          </th>
        </tr>
      </thead>
      <tbody>
        {courses.length ? (
          courses.map((course) => (
            <tr key={course.id} className="bg-buttonText border-b">
              <td className="px-6 py-4">{course.id}</td>
              <td className="px-6 py-4">{course.title}</td>
              <td className="px-6 py-4">{course.price}</td>
              <td className="px-6 py-4">{course.user_id}</td>
              <td className="px-6 py-4">
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(course.id)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-buttonText border-b">
            <td colSpan={4} className="text-center py-4">
              Brak wyników
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default CourseTable
