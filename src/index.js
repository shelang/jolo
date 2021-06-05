import React from 'react'
import ReactDOM from 'react-dom'
import AppWrapper from './app/app'
import registerServiceWorker from './registerServiceWorker'
import Store from './app/utils/create_store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const app = (
    <Provider store={Store}>
      <BrowserRouter>
         <AppWrapper />
      </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
