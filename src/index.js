import React from 'react'
import ReactDOM from 'react-dom'
import netlifyIdentity from 'netlify-identity-widget'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

// You must run this once before trying to interact with the widget
netlifyIdentity.init()

// Main application wrapped with Redux & React Router
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
