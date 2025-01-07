import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import UsersTable from "../Tables/UsersTable"
import { getUsersByName } from "../../../use-cases/queries/user"

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [users, setUsers] = useState<any[]>([])

  const handleSearch = async () => {
    try {
      const data = await getUsersByName(searchTerm)
      setUsers(data)
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
          placeholder="Wyszukaj użytkownika"
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
        <UsersTable users={users} setUsers={setUsers} />
      </div>
    </>
  )
}

export default SearchUsers
