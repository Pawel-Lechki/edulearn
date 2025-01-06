import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import type { Topic } from "../types/types"

interface TopicSelectProps {
  onChange: (selectedTopics: number[]) => void
}

const TopicSelect = ({ onChange }: TopicSelectProps) => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopics, setSelectedTopics] = useState<number[]>([])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/topics")
        const data = await response.json()
        setTopics(data)
      } catch (error) {
        toast.error("Nie udało się załadować tematów")
      }
    }
    fetchTopics()
  }, [])

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    )
    onChange(selectedOptions)
  }

  return (
    <select
      multiple
      onChange={handleTopicChange}
      className="w-full rounded-md border border-gray-300 px-3 py-2 h-32"
    >
      {topics.map((topic) => (
        <option key={topic.id} value={topic.id}>
          {topic.name}
        </option>
      ))}
    </select>
  )
}

export default TopicSelect
