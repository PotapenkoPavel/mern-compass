// libs
import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { initAuth } from '../redux/actionCreators/locations'

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from '../routes/routes'
import { useAuth } from './hooks/useAuth.Hook'

// components
import Header from './components/Header'
import Footer from './components/Footer'

const exclusionArray = ['/auth']

function App({ location }) {
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  const dispatch = useDispatch()
  const routes = useRoutes(isAuthenticated)
  const auth = useAuth()
  
  useEffect(() => {
    dispatch(initAuth(auth))
  }, [auth])

  return (
    <Fragment>
      {/* {exclusionArray.indexOf(location.pathname) < 0 && <Header />} */}
      <Header />
      {routes}
      {exclusionArray.indexOf(location.pathname) < 0 && <Footer />}
    </Fragment>
  )
}

export default withRouter(App)
