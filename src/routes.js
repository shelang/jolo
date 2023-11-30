import React, { Suspense } from 'react'
import AppLayout from './components/layout/layout'
import PrivateRoute from './utils/privateRoute'
import { Spin } from 'antd'
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom'

const Login = React.lazy(() => import('./containers/auth'))
const CreateLink = React.lazy(() => import('./containers/createLink'))
const Links = React.lazy(() => import('./containers/links'))
const Users = React.lazy(() => import('./containers/users'))
const Scripts = React.lazy(() => import('./containers/scripts'))
const Webhook = React.lazy(() => import('./containers/webhook'))
const Profile = React.lazy(() => import('./containers/profile'))
const RefreshToken = React.lazy(() => import('./containers/refresh'))
const LinkDetail = React.lazy(() => import('./containers/linkDetail'))
const Dashboard = React.lazy(() => import('./containers/dashboard'))
const Workspaces = React.lazy(() => import('./containers/workspaces'))
const Setting = React.lazy(() => import('./containers/setting'))
const CreateUser = React.lazy(() => import('./containers/createUser'))
const UserEdit = React.lazy(() => import('./containers/userEdit'))
const WorkspacesEdit = React.lazy(() => import('./containers/workspacesEdit'))
const WorkspacesSetting = React.lazy(() =>
  import('./containers/workspacesSetting'),
)

const Loading = () => {
  return (
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
  )
}

function Routes() {
  return (
    <ReactRoutes>
      <Route
        exact
        path="/refresh"
        element={
          <Suspense fallback={<Loading />}>
            <RefreshToken />
          </Suspense>
        }
      />
      <Route
        exact
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/"
        exact
        element={<Navigate to="/dashboard" replace={true} />}
      />
      <Route
        path="/workspaces"
        exact
        element={
          <Suspense fallback={<Loading />}>
            <Workspaces />
          </Suspense>
        }
      />
      <Route path="/dashboard" element={<AppLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Dashboard />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Users />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users/create"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<CreateUser />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users/:id"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<UserEdit />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/create-link"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<CreateLink />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/links"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Links />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/links/:id"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<LinkDetail />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/scripts"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Scripts />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/webhooks"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Webhook />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/profile"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Profile />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/workspaces"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<WorkspacesSetting />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/workspaces/:id"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<WorkspacesEdit />} />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/settings"
          exact
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute element={<Setting />} />
            </Suspense>
          }
        />
      </Route>
    </ReactRoutes>
  )
}
export default Routes
