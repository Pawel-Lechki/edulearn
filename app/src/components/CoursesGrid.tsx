import CourseCard from "./CourseCard"
import FuturedCourseCard from "./FuturedCourseCard"
import type { Course } from "../types/types"

interface CourseType {
  courses: Course[]
}

const CoursesGrid = ({ courses }: CourseType) => {
  return (
    <div className="mt-10 grid grid-cols-3 gap-2">
      {courses.map((course, index) => {
        if ((index + 1) % 4 === 0) {
          return (
            <div key={index} className="col-span-3">
              <FuturedCourseCard {...course} />
            </div>
          )
        }
        return (
          <div key={index} className="col-span-1">
            <CourseCard {...course} />
          </div>
        )
      })}
    </div>
  )
}

export default CoursesGrid
