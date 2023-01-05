import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { destroyCookie } from 'nookies'
import { UserOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons'
import { Layout, Breadcrumb, Dropdown, Menu } from 'antd'
import KitMenu from '../menu/menu'
import { titleCase } from '../../utils/titlePath'
import './layout.scss'

const { Content, Sider, Header } = Layout

function AppLayout(props) {
  const location = useLocation()
  const history = useHistory()

  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbItems = pathSnippets.map((pathSnippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    return (
      <Breadcrumb.Item key={url}>
        <Link style={{ fontSize: 16 }} to={url}>
          {titleCase(pathSnippet)}
        </Link>
      </Breadcrumb.Item>
    )
  })

  const menu = (
    <Menu>
      <Menu.Item
        style={{}}
        onClick={() => {
          destroyCookie(null, 'linkComposerUser')
          history.push('/login')
        }}
        icon={<LogoutOutlined />}>
        Sign Out
      </Menu.Item>{' '}
      <Menu.Item
        style={{}}
        onClick={() => {
          history.push('/workspaces')
        }}
        icon={<GlobalOutlined />}>
        Workspace
      </Menu.Item>{' '}
    </Menu>
  )

  const menuStyle = {
    boxShadow: '0px 0px 10px rgba(86, 135, 147, 0.2)',
    padding: 8,
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={true}
        className="site-layout-background"
        width={72}>
        <KitMenu />
      </Sider>
      <Layout>
        <Header className="bread_crumb_wrapper">
          <Breadcrumb separator={'>'}>{breadcrumbItems}</Breadcrumb>
          <Dropdown
            overlay={menu}
            dropdownRender={(menu) =>
              React.cloneElement(menu, { style: menuStyle })
            }
            trigger={['click']}
            className="userMenuWrapper">
            <UserOutlined />
          </Dropdown>
        </Header>
        <Content className="ant_content" id="content">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout
