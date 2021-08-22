import React from 'react';
import isAuthenticated from './isAuthenticated';
import { Route, Redirect } from 'react-router-dom';
import Can from '../components/can/can';

function PrivateRoute(props) {
  if (isAuthenticated()) {
    return (
      <Can
        yes={() => <Route {...props} />}
        no={() => <Redirect to='/dashboard' />}
        perform={props.perform}
        depth={props.depth}
      />
    );
  } else {
    return <Redirect to='/login' />;
  }
}
export default PrivateRoute;
