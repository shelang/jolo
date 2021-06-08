import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import '../styles/layout.css'

const Layout = (props) => {

  return (
    <React.Fragment>
      {
        !props.is_login ? (
          <>{props.children}</>   
        )
        :
        <DashboardLayout />
      }         
      
    </React.Fragment>
  );
};

export default Layout