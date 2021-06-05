import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LinksList from '../screens/LinksList'
import CreateLink from '../screens/CreateLink'
import { Redirect } from 'react-router-dom'

export const childRoutes = [
  {
    'path':'/create',
    'component': CreateLink,
    'exactly': true,
  },
  {
    'path':'/list',
    'component': LinksList
  }
];

const routes = (
  <Switch>
    {/* <Route path="/login" component={Login}/>
    <Route path="/logout" component={LogOut}/>
    <Route path="/" component={Layout}/> */}
    <Redirect to="/create" />
  </Switch>
);

export default routes
