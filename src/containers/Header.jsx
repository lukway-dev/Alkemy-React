import React, { useContext } from 'react'
import Context from '../context/Context'
import Logo from '@images/Logo.svg'

const Header = () => {
  const {contextData, setContextData } = useContext(Context)

  const handleLogout = () => {
    setContextData({
      ...contextData,
      token: null
    })
    localStorage.removeItem('token')
  }

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Superteam Logo" />
      <button className="header__button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" />
      </button>
    </header>
  )
}

export default Header