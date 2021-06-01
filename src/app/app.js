import React, { useEffect } from 'react'
import 'antd/dist/antd.css'
// import route from './route'
import Login from './screens/Login'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './Layout/Layout'

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

export const AppWrapper = (props) => {   
     const { history } = props
     
     useEffect(()=>{
      if (history.location.pathname !== "/login") {
        history.replace("/login");
      }
     },[])

     const routes = (
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Redirect to="/" />
        </Switch>
     )
    return(
      <React.Fragment>{routes}</React.Fragment>
    )
}
    
export default withRouter(AppWrapper)