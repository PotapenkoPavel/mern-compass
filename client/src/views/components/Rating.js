// libs
import React from 'react'

//utils
import { formateRating } from '../../utils/formatters'

const Rating = ({ rating, _class }) => {
  rating = formateRating(rating)

  return <div className={`rating ${_class}`}>{rating}</div>
}

export default Rating
