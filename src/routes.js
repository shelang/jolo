import React, { Suspense } from 'react'
import PrivateRoute from './utils/privateRoute'
import AppLayout from './components/layout/layout'
import LoginLayout from './components/layout/LoginLayout'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'

const Login = React.lazy(() => import('./containers/auth'))
const CreateLink = React.lazy(() => import('./containers/createLink'))
const Links = React.lazy(() => import('./containers/links'))
const Scripts = React.lazy(() => import('./containers/scripts'))
const Webhook = React.lazy(() => import('./containers/webhook'))
const Profile = React.lazy(() => import('./containers/profile'))
const RefreshToken = React.lazy(() => import('./containers/refresh'))
const LinkDetail = React.lazy(() => import('./containers/linkDetail'))
const Dashboard = React.lazy(() => import('./containers/dashboard'))
const Workspaces = React.lazy(() => import('./containers/workspaces'))

function Routes() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Spin />
        </div>
      }>
      <Switch>
        <Route
          exact
          path="/refresh"
          render={() => (
            <LoginLayout>
              <RefreshToken />
            </LoginLayout>
          )}
        />
        <Route exact path="/login" render={() => <Login />} />
        <PrivateRoute
          path="/"
          exact
          render={() => {
            return (
              <Redirect
                to={{
                  pathname: '/dashboard',
                }}
              />
            )
          }}
        />
        <PrivateRoute path="/workspaces" exact render={() => <Workspaces />} />
        <PrivateRoute
          path="/dashboard"
          exact
          render={() => (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/create-link"
          exact
          render={() => (
            <AppLayout>
              <CreateLink />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/links"
          exact
          render={() => (
            <AppLayout>
              <Links />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/links/:id"
          exact
          render={(props) => (
            <AppLayout>
              <LinkDetail {...props} />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/scripts"
          exact
          render={() => (
            <AppLayout>
              <Scripts />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/webhooks"
          exact
          render={() => (
            <AppLayout>
              <Webhook />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/profile"
          exact
          render={() => (
            <AppLayout>
              <Profile />
            </AppLayout>
          )}
        />
      </Switch>
    </Suspense>
  )
}
export default Routes
