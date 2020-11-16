import React from 'react'

const PageTitle = ({ title }) => {
  title = title ? (
    <h1>{title}</h1>
  ) : (
    <h1>
      Compass <small>найдет ближайшие к тебе места для работы с WiFi</small>
    </h1>
  )

  return (
    <section className='page-title my-4'>
      <div className='container'>{title}</div>
    </section>
  )
}

export default PageTitle
