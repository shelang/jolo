import React from 'react'
import { Layout } from 'antd'
import Header from '../components/CustomHeader'
import Sidebar from '../components/Sidebar'
// import NavPath from '../components/NavPath'
import '../styles/layout.css'
// import { Route, Redirect } from 'react-router-dom'
// import authHOC from '../utils/auth'
// import { childRoutes } from '../route/index'
import notify from '../utils/notify'
import '../styles/layout.css'

const { Content } = Layout

const layout = (props) => {
  
  return (
    <React.Fragment>
        {
          props.is_login ? ( 
              <Layout className="ant-layout-has-sider">
                <Sidebar />
                <Layout>
                  <Header />
                    <Content style={{ margin: '0 16px' }}>
                        <div className='layout-content'>
                        {props.children}
                          {/* <Redirect to="/create"/>
                          {childRoutes.map((route, index) => (
                            <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
                          ))} */}
                        </div>
                  </Content>
                </Layout> 
                {
                    props.is_alert.show && (
                       <>
                         {notify(props.is_alert.text, props.is_alert.type) }    
                       </>                                        
                    )  
                }       
              </Layout>
   
         )
         : <>{props.children}</>
        }
         
    </React.Fragment>
  );
};


export default layout