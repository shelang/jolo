import React from 'react'
import { Layout } from 'antd'
import Header from '../components/CustomHeader'
import Sidebar from '../components/Sidebar'
import '../styles/layout.css'
import { Route, Redirect } from 'react-router-dom'
import authHOC from '../utils/auth'
import { childRoutes }  from '../route'
// import notify from '../utils/notify'

const { Content } = Layout

const DashboardLayout = (props) => {
        return (
            <Layout className="ant-layout-has-sider">
                <Sidebar />
                <Layout>
                    <Header />
                        <Content style={{ margin: '0 16px' }}>
                            <div className='layout-content'>
                            <Redirect to="/create"/>
                            {childRoutes.map((route, index) => (
                                <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
                            ))}
                            </div>
                    </Content>
                    </Layout> 
                    {/* {
                        alert.show && (
                            <>
                            {notify(alert.text, alert.type }    
                            </>                                        
                        )  
                    }        */}
            </Layout>
    );
};
      
      
export default DashboardLayout
    