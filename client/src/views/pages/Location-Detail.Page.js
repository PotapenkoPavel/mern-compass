// libs
import React, { Fragment , useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// utils
import { createMap } from '../../utils/yandex-api/index'

//action-creators
import { setCurrentLocation } from '../../redux/actionCreators/locations'

// hooks
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../hooks/useHttp.Hook'
import { useMessage } from '../hooks/useMessage.Hook'

// components
import PageTitle from '../components/Page-Title'
import Rating from '../components/Rating'
import Review from '../components/Review'
import Loader from '../components/Loader'

const LocationDetailPage = () => {
  const locationsList = useSelector((state) => state.locations)
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  const [location, setLocation] = useState(null)
  const match = useRouteMatch()
  const locationid = match.params.locationid
  const { loading, request } = useHttp()
  const message = useMessage()
  const dispatch = useDispatch()

  useEffect(() => {
    const currentLocation = locationsList.find((item) => item._id === locationid)

    if (currentLocation) {
      setLocation(currentLocation)
      dispatch(setCurrentLocation(currentLocation))
    } else {
      request(`/api/locations/${locationid}`)
        .then((res) => {
          setLocation(res)
          dispatch(setCurrentLocation(res))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    if (location) {
      createMap(location.loc.coordinates, 'map', {
        name: location.name,
        address: location.address,
      })
    }
  }, [location])

  if (loading) return <Loader />

  const onClickHandler = () => {
    message('Чтобы оставлять отзывы необходимо авторизироваться')
  }

  if (!location) return null

  return (
    <Fragment>
      <PageTitle title={location.name} />

      <section className='location-detail'>
        <div className='container'>
          <div className='row mb-5'>
            <div className='col-md-12 col-lg-4'>
              <Rating rating={location.rating} _class='location-detail__rating' />
              <p className='location-detail__name'>{location.name}</p>

              <div className='row mb-md-3 mb-lg-0'>
                <div className='location-detail__opening-hours col-md-6 col-lg-12 mb-3 mb-md-0 mb-lg-3'>
                  <div className='card'>
                    <div className='card-header'>Часы работы</div>
                    <div className='card-body'>
                      {location.openingTimes.length
                        ? location.openingTimes.map((item, index) => {
                            if (item.closed) return <p key={index}>{`${item.days}: Выходной`}</p>
                            else return <p key={index}>{`${item.days}: ${item.opening} - ${item.closing}`}</p>
                          })
                        : 'Часы работы не известны'}
                    </div>
                  </div>
                </div>
                <div className='location-detail__facilities col-md-6 col-lg-12 mb-3 mb-md-0'>
                  <div className='card'>
                    <div className='card-header'>Услуги</div>
                    <div className='card-body'>
                      {location.facilities.length
                        ? location.facilities.map((item, index) => {
                            return (
                              <span key={index} className='badge badge-success'>
                                {item}
                              </span>
                            )
                          })
                        : 'Услуги не известны'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-12 col-lg-8'>
              <div className='location-detail__map card'>
                <div className='card-header'>Местоположение</div>
                <div className='card-body p-0'>
                  <div id='map'></div>
                </div>
              </div>
            </div>
          </div>

          <div className='location-detail__reviews row'>
            <div className='col-12'>
              <div className='review-block'>
                <div className='review-block__header mb-3'>
                  <h2 className='review-block__title mb-2 mb-md-0'>Отзывы посетителей</h2>
                  {isAuthenticated ? (
                    <Link
                      to={`/locations/${location._id}/review`}
                      className='review-block__btn btn btn-primary'
                    >
                      Добавить отзыв
                    </Link>
                  ) : (
                    <div className='review-block__btn btn btn-primary' onClick={onClickHandler}>
                      Добавить отзыв
                    </div>
                  )}
                </div>
                <div className='review-block__body'>
                  {location.reviews.length ? (
                    location.reviews.map((item) => <Review review={item} key={item._id} />).reverse()
                  ) : (
                    <p>Никто не оставил отзыв для данного заведения, станьте первым!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default LocationDetailPage
