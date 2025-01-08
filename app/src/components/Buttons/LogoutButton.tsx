import { logout } from "../../../use-cases/actions/logout"

const LogoutButton = () => {
  return (
    <button
      className="bg-buttonPrimary text-white px-4 py-2 rounded-lg"
      onClick={() => logout()}
    >
      Wyloguj
    </button>
  )
}

export default LogoutButton
