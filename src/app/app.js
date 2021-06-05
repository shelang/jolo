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
  const alert = useSelector(state => state.app.alert)
  const { onAutoSignIn } = props
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(actions.checkAuthState())
  }, [onAutoSignIn])

  useEffect(() => {
		if (alert.show)
            setTimeout(dispatch, 5000, { 'type': 'APP_SET_ALERT' })
	}, [alert])


    let routes = (
      <Switch>
        <Route path="/login" component={Login}/>
        <Redirect to="/login" />
      </Switch>
    )

    if(is_launched_account) {
    
      routes = (
        <Switch>
          <Route path='/create' exact component={CreateLink}/>
          <Route path='/list' component={LinksList}/>
          <Route path="/logout" component={LogOut}/>
          <Redirect to='/create' />
        </Switch>
      );
    }

    return(
      <Layout is_login={is_launched_account} is_alert={alert}>{routes}</Layout>
    )
}
    
export default withRouter(AppWrapper)