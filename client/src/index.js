//libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

//scripts
import 'jquery/dist/jquery.min'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'

//styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'materialize-css'
import './styles/index.sass'
import './styles/burger.scss'

//components
import App from './views/App'

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
