import React from 'react'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ConfigProvider } from 'antd'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: { colorBgHeader: '#fff' },
          Menu: {
            colorItemText: '#fff',
            colorItemTextSelected: '#fff',
            colorItemTextHover: '#fff',
            colorItemBgSelected: '#568793',
          },
        },
        token: {
          colorPrimary: '#568793',
        },
      }}>
      <Router>
        <ToastContainer />
        <Routes />
      </Router>
    </ConfigProvider>
  )
}

export default App
