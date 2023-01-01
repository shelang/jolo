import React from 'react'
import Logo from '../../assets/logo-light-New.png'
import { Layout, Image } from 'antd'
import './layout.scss'

const { Header, Content, Footer } = Layout

function LoginLayout(props) {
  return (
    <Layout>
      <Content className="content">{props.children}</Content>
    </Layout>
  )
}
export default LoginLayout
