import type { Course as CourseType } from "../types/types"
import courseImg from "../assets/course.svg"
import { apiClientUrl } from "../../use-cases/globals"

interface RelatedCoursesProps {
  courses: CourseType[]
}

const RelatedCourses = ({ courses }: RelatedCoursesProps) => {
  return (
    <div className="flex w-full items-start flex-wrap gap-1">
      {courses.map((course, index) => (
        <a
          href={`/shop/${course.id}`}
          key={index}
          className="bg-primary px-4 py-3 rounded-xl flex flex-col lg:bg-primary lg:h-96 p-5 lg:w-[300px] w-full"
        >
          <div className="flex justify-between">
            <div className="flex gap-1">
              {course.topics?.map((topic) => (
                <div
                  className="text-sm bg-topicBackground px-2 py-1 rounded-2xl"
                  key={topic}
                >
                  {topic}
                </div>
              ))}
            </div>
            <p className="text-sm">{course.price}</p>
          </div>
          <img
            src={
              course.image ? `${apiClientUrl}/${course.image}` : courseImg.src
            }
            alt={course.title}
            className="w-full h-52 object-cover rounded-lg"
          />
          <h2 className="text-l font-bold text-center m-auto self-end">
            {course.title}
          </h2>
          <p className="text-center">{course.short_description}</p>
        </a>
      ))}
    </div>
  )
}

export default RelatedCourses
