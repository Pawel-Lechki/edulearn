import { TopicsDisplayer } from "./TopicsDisplayer"
import courseImg from "../assets/course.svg"

interface CourseCardProps {
  id: number
  title: string
  short_description: string
  description: string
  image?: string
  price: number
  related: number
  user_id: number
  topics: string[]
}

const CourseCard = ({
  id,
  title,
  short_description,
  image,
  price,
  topics,
  description,
}: CourseCardProps) => {
  return (
    <a
      href={`/shop/${id}`}
      className="flex flex-col lg:bg-background1 rounded-xl lg:h-[600px] p-4 bg-background2 w-full h-auto min-h-[400px]"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <TopicsDisplayer topics={topics.map((topic) => ({ name: topic }))} />
          <p className="self-end">{price} PLN</p>
        </div>
        <div className="flex-grow">
          <img
            src={image ? image : courseImg.src}
            alt={title}
            className="w-full h-52 object-fill rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-bold text-center m-auto">{title}</h2>
        <p className="text-center">{short_description}</p>
      </div>
    </a>
  )
}
export default CourseCard
