import React, { Suspense } from 'react';
import PrivateRoute from './utils/privateRoute';
import AppLayout from './components/layout/layout';
import LoginLayout from './components/layout/LoginLayout';
import Welcome from './welcome';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

const Login = React.lazy(() => import('./containers/auth'));
const CreateLink = React.lazy(() => import('./containers/createLink'));
const Links = React.lazy(() => import('./containers/links'));
const LinkDetail = React.lazy(() => import('./containers/linkDetail'));

function Routes() {
  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route
          exact
          path='/login'
          render={() => (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )}
        />
        <PrivateRoute
          path='/'
          exact
          render={() => (
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          )}
        />
        <PrivateRoute
          path='/dashboard'
          exact
          render={() => (
            <AppLayout>
              <Welcome sectionName='Main Dashboard' />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path='/dashboard/create-link'
          exact
          render={() => (
            <AppLayout>
              <CreateLink />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path='/dashboard/links'
          exact
          render={() => (
            <AppLayout>
              <Links />
            </AppLayout>
          )}
        />
        <PrivateRoute
          path='/dashboard/links/:id'
          exact
          render={(props) => (
            <AppLayout>
              <LinkDetail {...props} />
            </AppLayout>
          )}
        />
      </Switch>
    </Suspense>
  );
}
export default Routes;
