import React, { useEffect } from "react"
import AstroLogo from "../assets/astro.svg"
import { BasketButton } from "./Buttons/BasketButton"
import DashboardButton from "./Buttons/DashboardButton"
import LoginButton from "./Buttons/LoginButton"
import RegisterButton from "./Buttons/RegisterButton"
import SearchBar from "./Forms/SearchBar"

const Header = () => {
  const role = localStorage.getItem("role")
  const [isLogged, setIsLogged] = React.useState(false)
  useEffect(() => {
    setIsLogged(role !== null)
  }, [role])

  return (
    <header className="container flex justify-between mx-auto py-10 w-full">
      <a href="/" title="EduLearn">
        <img src={AstroLogo.src} alt="EduLearn" className="w-48" />
      </a>
      <div className="flex items-center space-x-6">
        <SearchBar />
        {isLogged && (
          <a href={`/dashboard/${role}`} title="Dashboard">
            <DashboardButton />
          </a>
        )}
        {!isLogged && (
          <>
            <a href="/login" title="Login">
              <LoginButton />
            </a>
            <a href="/register" title="Register">
              <RegisterButton />
            </a>
          </>
        )}
        <a href="/cart" title="Your cart">
          <BasketButton />
        </a>
      </div>
    </header>
  )
}

export default Header
