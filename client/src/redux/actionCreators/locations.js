import { SET_LOCATIONS_LIST, AUTH, SET_CURRENT_LOCATION } from '../actions/locations'

export const setLocationsList = (locations) => {
  return {
    type: SET_LOCATIONS_LIST,
    payload: Array.isArray(locations) ? locations : [locations],
  }
}

export const setCurrentLocation = (location) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location
  }
} 

export const initAuth = (auth) => {
  return {
    type: AUTH,
    payload: auth,
  }
}
