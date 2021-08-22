import React, { Suspense } from 'react';
import PrivateRoute from './utils/privateRoute';
import AppLayout from './components/layout/layout';
import LoginLayout from './components/layout/LoginLayout';
import Welcome from './welcome';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';

const Login = React.lazy(() => import('./containers/auth'));
const CreateLink = React.lazy(() => import('./containers/createLink'));

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
      </Switch>
    </Suspense>
  );
}
export default Routes;
