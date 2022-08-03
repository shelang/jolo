import React, { useState } from 'react'
import KitMenu from '../menu/menu'
import Logo from '../../assets/logo-light-New.png'
import { Button, Layout, Breadcrumb, PageHeader, Divider } from 'antd'
import { Link, useLocation, useHistory } from 'react-router-dom'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'
import './layout.scss'
import AcceptCookies from '../../containers/acceptCookies'
import { titleCase } from '../../utils/titlePath'

const { Header, Content, Footer, Sider } = Layout

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
  console.log(breadcrumbItems, 'breadcrumbItems')
  return (
    <Layout>
      <Header>
        {' '}
        {isMobile ? (
          <Button
            type="primary"
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginBottom: 16 }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        ) : null}
        <div className="logo">
          <img src={Logo} alt="logo" width={200} />
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="site-layout-background"
          width={200}>
          <KitMenu />
        </Sider>
        <Content className="internal_content">
          <div className="bread_crumb_wrapper">
            <Breadcrumb separator={'>'}>{breadcrumbItems}</Breadcrumb>
          </div>

          <div className="content">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout
