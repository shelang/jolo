import React, { useState } from 'react'
import KitMenu from '../menu/menu'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { destroyCookie } from 'nookies'
import { Space, Layout, Breadcrumb, Dropdown, Menu } from 'antd'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import './layout.scss'
import AcceptCookies from '../../containers/acceptCookies'
import { titleCase } from '../../utils/titlePath'

const { Header, Content, Footer, Sider } = Layout
const text = 'Are you sure to delete this task?'

function AppLayout(props) {
  const [collapsed, setCollapsed] = useState(isMobile)

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
          destroyCookie(null, 'user')
          history.push('/login')
        }}
        icon={<LogoutOutlined />}>
        Sign Out
      </Menu.Item>{' '}
    </Menu>
  )
  return (
    <Layout>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={true}
          className="site-layout-background"
          width={72}>
          <KitMenu />
        </Sider>
        <Content className="internal_content">
          <div className="bread_crumb_wrapper">
            <Breadcrumb separator={'>'}>{breadcrumbItems}</Breadcrumb>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              className="userMenuWrapper">
              <UserOutlined />
            </Dropdown>
          </div>

          <div className="content">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout
