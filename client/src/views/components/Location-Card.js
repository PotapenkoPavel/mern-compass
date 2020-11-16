// libs
import React from 'react'
import { Link } from 'react-router-dom'

// components
import Rating from './Rating'

// utils
import { formateDistance } from '../../utils/formatters'

const LocationCard = ({ location }) => {
  return (
    <div className='location-card mb-2 p-2'>
      <div className='location-card__header'>
        <Link to={`/locations/${location._id}`} className='location-card__name'>
          {location.name}
        </Link>
        <Rating rating={location.rating} _class='location-card__rating' />
        { location.distance ? (
          <span className='location-card__distance badge badge-primary'>
            {formateDistance(location.distance)}
          </span>
        ) : (
          null
        ) 
        }
      </div>

      <div className='location-card__body'>
        <p className='location-card__address'>{location.address}</p>
      </div>

      <div className='location-card__footer'>
        <div className='location-card__facilities'>
          {location.facilities.map((tag, index) => (
            <span
              className='location-card__tag badge badge-success'
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationCard
