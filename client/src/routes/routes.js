// libs
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// pages
import AboutUsPage from '../views/pages/About-Us.Page'
import AuthPage from '../views/pages/Auth.Page'
import LocationDetailPage from '../views/pages/Location-Detail.Page'
import LocationsPage from '../views/pages/Locations-List.Page'
import ReviewFormPage from '../views/pages/Review-Form.Page'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/locations' component={LocationsPage} />
        <Route
          exact
          path='/locations/:locationid'
          component={LocationDetailPage}
        />
        <Route
          exact
          path='/locations/:locationid/review'
          component={ReviewFormPage}
        />
        <Route exact path='/about' component={AboutUsPage} />
        <Redirect to='/locations' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path='/locations' component={LocationsPage} />
        <Route
          exact
          path='/locations/:locationid'
          component={LocationDetailPage}
        />
        <Route exact path='/about' component={AboutUsPage} />
        <Route exact path='/auth' component={AuthPage} />
        <Redirect to='/locations' />
      </Switch>
    )
  }
}
