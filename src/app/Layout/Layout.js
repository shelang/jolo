import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import '../styles/layout.css'

const Layout = (props) => {

  return (
    <React.Fragment>
      {
        props.is_login ? (
          <DashboardLayout />
        )
        :
        null
      }         
      <>{props.children}</>
    </React.Fragment>
  );
};

export default React.memo(Layout)