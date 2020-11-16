import React from 'react'

const Alert = ({ status, message, type, styles }) => {
  return (
    <div className={`alert alert-${type}`} role='alert' style={styles}>
      {status && <h4 className='alert-heading'>{status}</h4>}
      <p className='font-weight-ligh mb-0'>{message}</p>
    </div>
  )
}

export default Alert
