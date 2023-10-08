import React from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { destroyCookie } from 'nookies'
import { UserOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons'
import { Layout, Breadcrumb, Dropdown } from 'antd'
import KitMenu from '../menu/menu'
import { titleCase } from '../../utils/titlePath'
import './layout.scss'

const { Content, Sider, Header } = Layout

function AppLayout(props) {
  const location = useLocation()
  const navigate = useNavigate()

  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbItems = pathSnippets.map((pathSnippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    return {
      href: url,
      title: titleCase(pathSnippet),
    }
  })
  const items = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer',
          }}
          onClick={() => {
            destroyCookie(null, 'linkComposerUser')
            navigate('/login')
          }}>
          <LogoutOutlined style={{ marginRight: 12 }} />
          Sign Out
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'not-allowed',
          }}
          onClick={() => {
            // history.push('/workspaces')
          }}>
          <GlobalOutlined style={{ marginRight: 12 }} />
          Workspace
        </div>
      ),
    },
  ]

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
          <Breadcrumb separator={'>'} items={breadcrumbItems} />

          <Dropdown
            menu={{ items }}
            trigger={['click']}
            className="userMenuWrapper">
            <UserOutlined />
          </Dropdown>
        </Header>
        <Content className="ant_content" id="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout
