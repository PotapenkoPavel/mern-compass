// libs
import React from 'react'

// components
import Rating from './Rating'

//utils
import { formateDate } from '../../utils/formatters'

const Review = ({ review }) => {
  return (
    <div className='review card mb-3'>
      <div className='card-header'>
        <div className='mb-2'>
          <Rating rating={review.rating} />
        </div>
        <span className='review__author mr-2'>{review.author}</span>
        <small className='review__timestamp text-muted'>
          {formateDate(review.timestamp)}
        </small>
      </div>

      <div className='card-body'>
        <p className='m-0'>{review.reviewText}</p>
      </div>
    </div>
  )
}

export default Review
