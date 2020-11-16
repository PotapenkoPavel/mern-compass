// libs
import React, { Fragment, useEffect, useState } from 'react'

// action-creators
import { setLocationsList } from '../../redux/actionCreators/locations'

// components
import LocationCard from '../components/Location-Card'
import PageTitle from '../components/Page-Title'
import Loader from '../components/Loader'
import Alert from '../components/Alert'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../hooks/useHttp.Hook'
import { useMessage } from '../hooks/useMessage.Hook'

const trialMessage = 'В настоящее время вы видите список всех локаций с Wi-Fi отсортированный по рейтингу. Что бы найти ближайшие к вам места - необходимо разрешить приложению доступ к вашей геолокации. Это можно сделать в настройках вашего браузера'

const LocationsPage = () => {
  let locations = useSelector((state) => state.locations)
  const dispatch = useDispatch()
  const message = useMessage()
  const { loading, request } = useHttp()
  const [isTrial, setIsTrial] = useState(false)

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude)
      request(`/api/locations-distance?lng=${pos.coords.latitude}&lat=${pos.coords.longitude}&maxDistance=999999999`)
        .then(res => {
          dispatch(setLocationsList(res))
        })
        .catch(() => message('Что-то пошло не так, попробуйте позже'))
    }, () => {
      request(`/api/locations`)
        .then(res => {
          dispatch(setLocationsList(res))
          setIsTrial(true)
        })
        .catch(() => message('Что-то пошло не так, попробуйте позже')) 
    })
    
  }, [])

  return (
    <Fragment>
      <PageTitle />
      <section className='locations'>
        <div className='container'>
          <div className='row'>
            <div className='locations__list col-12 col-md-8' id='locations-list'>
              {loading ? <Loader /> : locations.map((item) => <LocationCard key={item._id} location={item} />)}
            </div>

            <div className='locations__description col-4 d-none d-md-block'>
              <p>
                Ищете Wi-Fi? Compass поможет вам найти места, где можно поработать на улице. Возможно, с кофе, пирожным и другими
                вкусняшками
              </p>
            </div>
          </div>
          {isTrial  ? <Alert message={ trialMessage } type='warning' styles={{marginTop: '40px', fontSize: '14px'}}/> : null}
        </div>
      </section>
    </Fragment>
  )
}

export default LocationsPage
