import React, { useState } from 'react'
import { Layout, Divider, Menu } from 'antd'
import { withRouter, matchPath } from 'react-router'
import language from '../resources/js/languages_dict'
// import { Link } from 'react-router-dom'
import '../styles/sidebar.css'
import logo from '../resources/images/logo.png'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const { Sider } = Layout;

// const isActive = (path, history) => {
//     return matchPath(path, {
//       path: history.location.pathname,
//       exact: true,
//       strict: false
//     })
//   }

const Sidebar = (props) => {
    // const { history } = props
    const [collapsed, set_collapsed] = useState(false)
    const [mode, set_mode] = useState('inline')
    const [active_key, set_active_key] = useState('1')
    // const [items] = useState([
    //     { name: language.tokens['CREATE_LINK'], url : '/create' },
    //     { name: language.tokens['LINKS_LIST'], url : '/list' }
    // ])
    const toggleHandler = () => {
        set_collapsed((previousState) => !previousState)
        set_mode(!collapsed ? 'vertical' : 'inline')
    }

    const menuClickHandler = (item) => {
        set_active_key(item.key)
    }

    // const _menuProcess = (nodes, pkey) => {
    //     return Array.isArray(nodes) && nodes.map((item, i) => {
    //         const menu = _menuProcess(item.child, item.key);
    //         if(item.url && isActive(item.url, history)){
    //             set_active_key(item.key)
    //           }
    //         
    //        if (menu.length === 0) {
    //         return (
    //             <Menu.Item key={item.key}>
    //               {
    //                 item.url ? <Link to={item.url}>
    //                     { item.icon 
    //                     && 
    //                     <Icon type={item.icon} />} </Link> 
    //                 : 
    //                 <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
    //               }
    //             </Menu.Item>
           
    //       )
    //     }
    //     })
    // }
    // const menu = _menuProcess(items);
   
    return (
        <Sider 
            collapsible
            collapsed={collapsed}
            trigger={null}
            className='_sidebar_sider'
        >
            <div src={logo} className="sidebar-logo" alt='sidebar linkcomposer logo'/>
            <Divider className='_custom_divider' />
            <Menu 
                theme='light' 
                mode={mode}
                selectedKeys={[active_key]}
                // defaultSelectedKeys={['1']}
                onClick={(e) => menuClickHandler(e)}
            >
                {/* {menu} */}
                <Menu.Item key="1" icon={<UserOutlined />}>
                    {language.tokens['CREATE_LINK']}
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    {language.tokens['LINKS_LIST']}
                </Menu.Item>
            </Menu>
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