// libs
import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'

// hooks
import { useSelector } from 'react-redux'
import { useMessage } from '../hooks/useMessage.Hook'

// components
import BurgerIcon from './BurgerIcon'

const Header = () => {
  const { logout, isAuthenticated } = useSelector((state) => state)
  const message = useMessage()
  const dropdownMenu = useRef()

  const onClickHandler = () => {
    logout()
    message('Вы вышли из аккаунта')
  }

  const clickOnLinkHandler = () => {
    dropdownMenu.current.classList.remove('active')
    document.querySelector('.burger-icon').classList.remove('clicked')
  }
  

  return (
    <Fragment>
      <header className='header bg-white navbar-light shadow-sm'>
        <div className='container'>
          <div className='header-inner'>
            <Link className='header-logo' to='/locations'>
              <img src='/compass.svg' width='25px' height='25px' alt='logo' className='mr-2'/>
              <span>Compass</span>
            </Link>
            <BurgerIcon />

            <nav className='header-nav'>
              <ul className='header-nav-list'>
                <li className='header-nav-item'>
                  <Link to='/locations' className='header-nav-link active'>Главная</Link>
                </li>
                <li className='header-nav-item'>
                  <Link to='/about' className='header-nav-link'>Обо мне</Link>
                </li>
              </ul>

              <Link 
                to={isAuthenticated ? '#' : '/auth'}
                onClick={() => {if (isAuthenticated) onClickHandler()}}
                className='btn btn-outline-primary'
              >
                {isAuthenticated ? 'Выйти' : 'Войти'}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <nav className='header-nav dropdown' ref={dropdownMenu}>
        <div className='container'>
        <ul className='header-nav-list'>
            <li className='header-nav-item'>
              <Link to='/locations' className='header-nav-link active' onClick={clickOnLinkHandler}>Главная</Link>
            </li>
            <li className='header-nav-item'>
              <Link to='/about' className='header-nav-link'  onClick={clickOnLinkHandler}>Обо мне</Link>
            </li>
          </ul>

          <Link 
            to={isAuthenticated ? '#' : '/auth'}
            onClick={() => {if (isAuthenticated) onClickHandler()}}
            onClick={clickOnLinkHandler}
            className='btn btn-outline-light'
          >
            {isAuthenticated ? 'Выйти' : 'Войти'}
          </Link>
        </div>       
      </nav>  
    </Fragment>
      
  )
}

export default Header
