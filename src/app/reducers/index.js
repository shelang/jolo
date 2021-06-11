import { combineReducers } from 'redux'
import app from './app'
import auth from './auth'
import createlink from './createlink'

export default combineReducers({
    app,
    auth,
    createlink
});