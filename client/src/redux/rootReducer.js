import { SET_LOCATIONS_LIST, AUTH, SET_CURRENT_LOCATION } from './actions/locations'

function noop() {}

let initialState = {
  locations: [],
  location: null,
  isAuthenticated: false,
  token: null,
  login: noop,
  logout: noop,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS_LIST:
      return { ...state, locations: action.payload }
    case SET_CURRENT_LOCATION:
      return {...state, location: action.payload}
    case AUTH:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
