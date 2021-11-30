import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'

import './theme/Dark.css'
import './theme/Light.css'

require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
