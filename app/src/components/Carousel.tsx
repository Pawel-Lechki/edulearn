import { useEffect, useState } from "react"

interface CarouselProps {
  autoPlayInterval?: number
  images: string[]
}

const Carousel = ({ autoPlayInterval = 3000, images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlayInterval, images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative w-full max-w-8xl mx-auto">
      <div className="relative h-96 overflow-hidden rounded-lg mb-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="w-full h-full flex items-center justify-between p-8">
              <div className="w-1/3 bg-background1 p-8 rounded-lg shadow-lg mr-8">
                <h2 className="text-3xl font-bold mb-4">
                  Course Title {index + 1}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Course description goes here. This is a detailed explanation
                  of what students will learn in this course.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Duration:</span>
                    <span>8 weeks</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Level:</span>
                    <span>Intermediate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Price:</span>
                    <span>$99</span>
                  </div>
                </div>
                <button className="mt-6 bg-buttonPrimary text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
              <div className="w-2/3 h-full">
                <img
                  src={image}
                  alt={`Course ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        onClick={goToPreviousSlide}
      >
        ←
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        onClick={goToNext}
      >
        →
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-1 transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-blue-600" : "w-4 bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
