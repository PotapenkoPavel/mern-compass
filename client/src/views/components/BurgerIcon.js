import React, { useRef } from 'react'

const BurgerIcon = () => {
  const icon = useRef()

  const onClickHandker = () => {
    const dropdown = document.querySelector('.header-nav.dropdown')
    dropdown.classList.toggle('active')
  
    icon.current.classList.toggle('clicked')
  }

  return (
    <div className='burger-wrapper ml-auto'>
      <div ref={icon} className='burger-icon' onClick={onClickHandker}></div>
    </div>
  )
}

export default BurgerIcon
