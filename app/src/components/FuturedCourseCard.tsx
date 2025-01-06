import { TopicsDisplayer } from "./TopicsDisplayer"

interface FuturedCourseCardProps {
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

const FuturedCourseCard = ({
  id,
  title,
  image,
  price,
  topics,
  description,
}: FuturedCourseCardProps) => {
  return (
    <a href={`/shop/${id}`} className="w-full grid grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col justify-evenly lg:w-128 px-5 bg-background2 h-80 p-5 rounded-xl w-full lg:items-start items-center">
        <div className="w-60 lg:text-left text-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="mt-4">{description}</p>
        <p className="mt-4">{price}</p>
        <TopicsDisplayer topics={topics.map((topic) => ({ name: topic }))} />
      </div>
      <div className="col-span-2 h-80">
        <img
          src={image ? image : "https://via.placeholder.com/300"}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </a>
  )
}

export default FuturedCourseCard
