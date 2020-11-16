import React from 'react'

export const formateRating = (rating) => {
  let array = []

  for (let i = 0; i < 5; i++) {
    rating = Math.round(rating * 10) / 10
    if (rating >= 0.3 && rating <= 0.7) array.push(0.5)
    else if (rating < 0.3) array.push(0)
    else if (rating > 0.7) array.push(1)

    rating -= 1
  }

  function createImgElement(index, src) {
    return (
      <img
        key={index}
        src={src}
        alt='star-empty'
        className='rating__item'
      />
    )
  }

  array = array.map((item, index) => {   
    if (item === 0) return createImgElement(index, '/star-empty.svg')
    else if (item === 0.5) return createImgElement(index, '/star-half.svg')
    else if (item === 1) return createImgElement(index, '/star-fill.svg')

    return null
  })

  return array
}

export const formateDistance = (distance) => {
  distance = parseFloat(distance)
  if (distance > 1000) {
    distance /= 1000

    if (distance % 1 !== 0) distance = distance.toFixed(2) + ' км'
    else distance = distance.toFixed(0) + ' км'
    
  } else {
    distance = distance.toFixed(0) + ' м'
  }
  return distance
}

export const formateDate = (dateString) => {
  const date = new Date(dateString)

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let dt = date.getDate()

  let hours = date.getHours()
  let minutes = date.getMinutes()

  if (dt < 10) {
    dt = '0' + dt
  }
  if (month < 10) {
    month = '0' + month
  }
  if (hours < 10) {
    hours = '0' + hours
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  return year + '-' + month + '-' + dt + ' ' + hours + ':' + minutes
}
