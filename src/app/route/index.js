import React from 'react'
import { Route, Switch } from 'react-router-dom'

// export const childRoutes = [
//   {
//     'path':'/home',
//     'component': Home,
//     'exactly': true
//   },
//   {
//     'path':'/cards',
//     'component': Cards
//   }
// ];

const routes = (
  <Switch>
    <Route path="/login" component={Login}/>
    {/* <Route path="/" component={Layout}/> */}
  </Switch>
);

export default routes
