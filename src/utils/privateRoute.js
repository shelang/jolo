import React from 'react'
import isAuthenticated from './isAuthenticated'
import { Route, Navigate } from 'react-router-dom'
import Can from '../components/can/can'

function PrivateRoute(props) {
  if (isAuthenticated()) {
    return (
      <Can
        yes={() => props.element}
        no={() => <Navigate to="/dashboard" replace={true} />}
        perform={props.perform}
        depth={props.depth}
      />
    )
  } else {
    return <Route {...props} element={<Navigate to="/login" />} />
  }
}
export default PrivateRoute
