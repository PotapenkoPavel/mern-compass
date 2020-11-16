import React from 'react'

const styles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}

const Loader = () => {
  return (
  <div className='loader-wrapper' style={styles}>
     <div 
        className='spinner-border text-primary mx-auto d-block'    
        role='status'
      ></div>
  </div>
 )
}

export default Loader
