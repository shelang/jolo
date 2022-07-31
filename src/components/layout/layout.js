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
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{_}</Link>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <PageHeader
              className="site-page-header"
              onBack={() => history.goBack()}
              title={titleCase(pathSnippets[pathSnippets.length - 1])}
            />
            {breadcrumbItems.length > 1 && (
              <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            )}
          </div>

          {props.children}
        </Content>
      </Layout>
      <Footer
        style={{
          alignItems: 'center',
          height: 50,
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
        }}>
        LinkComposer ©2021 Created by LinkComposer Team
      </Footer>
    </Layout>
  )
}
export default AppLayout
