import { combineReducers } from 'redux'
import app from './app'
import auth from './auth'
import createlink from './createlink'
import links_list from './links_list'

export default combineReducers({
    app,
    auth,
    createlink,
    links_list
});