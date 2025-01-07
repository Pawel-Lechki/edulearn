import toast from "react-hot-toast"

interface User {
  // Define the properties of the User interface here
  // For example:
  id: number
  username: string
  email: string
}

interface UsersTableProps {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersTable = ({ users, setUsers }: UsersTableProps) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        toast.success("Użytkownik został usunięty")
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      } else {
        toast.error("Błąd podczas usuwania użytkownika")
      }
    } catch (error) {
      toast.error("Błąd podczas usuwania użytkownika")
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
            UserName
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Akcje
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users.map((user) => (
            <tr key={user.id} className="bg-buttonText border-b">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <button
                  className="text-buttonText bg-buttonSecondary border border-buttonSecondary hover:bg-buttonText hover:text-buttonSecondary rounded px-4 py-2"
                  onClick={() => handleDelete(user.id)}
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

export default UsersTable
