import React from 'react'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes />
    </Router>
  )
}

export default App
