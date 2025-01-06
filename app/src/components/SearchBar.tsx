import React, { useState } from "react"
import mglassImage from "../assets/mglass.svg"

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Perform search logic here
      try {
        const resoponse = await fetch(
          `http://localhost:8080/api/courses/search?title=${searchTerm}`
        )
        const data = await resoponse.json()
        console.log(data)
      } catch (error) {
        console.error("Something went wrong")
      }
    }
  }

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center bg-background1 rounded-full transition-all duration-300 ${
          isExpanded ? "w-72" : "w-10 px-3"
        }`}
      >
        <input
          type="text"
          placeholder="Wyszukaj..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          className={`bg-transparent outline-none px-6 py-3 w-full rounded-full ${
            isExpanded ? "opacity-100" : "opacity-0 w-0"
          }`}
          onBlur={() => setIsExpanded(false)}
        />
        <button
          className="absolute right-0 p-2 hover:bg-gray-200 rounded-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src={mglassImage.src} alt="search" className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
