import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './actions/index'
import 'antd/dist/antd.css'
import Login from './screens/Login'
import Layout from './Layout/Layout'
import CreateLink from './screens/CreateLink'
import LinksList from './screens/LinksList'
import LogOut from './screens/LogOut'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

export const AppWrapper = (props) => {

  const is_launched_account = useSelector(state => state.app.is_launched_account)
  const { onAutoSignIn } = props
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(actions.checkAuthState())
  }, [onAutoSignIn])

  let routes = (
    <Switch>
      <Route path="/login" exact component={Login}/>
      <Redirect to="/login" />
    </Switch>
  )

    if(is_launched_account) {
      routes = (
        <Switch>
          {/* <Route path="/login" component={Login}/> */}
          <Route path='/create' exact component={CreateLink}/>
          <Route path='/list' component={LinksList}/>
          <Route path="/logout" component={LogOut}/>
          <Route path="/" component={Layout}/>
        </Switch>
      );
    }

    return(
      <Layout is_login={is_launched_account}>{routes}</Layout>
    )
}
    
export default withRouter(AppWrapper)