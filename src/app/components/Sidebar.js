import React, { useState } from 'react'
import { Layout, Divider } from 'antd'
import { withRouter } from 'react-router'
import language from '../resources/js/languages_dict'
import MenuItem from './MenuItem'
import '../styles/sidebar.css'
import logo from '../resources/images/logo.png'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const { Sider } = Layout

const Sidebar = () => {

    const [collapsed, set_collapsed] = useState(false)
    const [mode, set_mode] = useState('inline')
    const [active_key, set_active_key] = useState('1')
   
    const toggleHandler = () => {
        set_collapsed((previousState) => !previousState)
        set_mode(!collapsed ? 'vertical' : 'inline')   
    }

    const menuClickHandler = (item) => {
        set_active_key(item.key)
    }

    return (
        <Sider 
            collapsible
            collapsed={collapsed}
            trigger={null}
            className='_sidebar_sider'
        >
            <div src={logo} className="sidebar-logo" alt='sidebar linkcomposer logo'/>
            <Divider className='_custom_divider' />
            <MenuItem
                theme='light' 
                mode={mode}
                selectedKeys={[active_key]}
                click={(e) => menuClickHandler(e)}                
                item={{
                    title:language.tokens['CREATE_LINK'], 
                    link: '/create', 
                    active_key : '1',
                    renderIcon: () => <UserOutlined/>,
                }}
            />
            <MenuItem 
                theme='light' 
                mode={mode}
                selectedKeys={[active_key]}
                click={(e) => menuClickHandler(e)}
                item={{
                    title:language.tokens['LINKS_LIST'], 
                    link: '/list', 
                    active_key : '2',
                    renderIcon: () => <VideoCameraOutlined/>,
                }}
            />
            <div className="sider-trigger _sider_trigger" onClick={toggleHandler}>
                {
                    collapsed ?
                        <MenuUnfoldOutlined className="trigger"/>
                    :
                        <MenuFoldOutlined className="trigger"/>    
                }
            </div>
        </Sider>
    );
  };
  
  
  export default withRouter(Sidebar);