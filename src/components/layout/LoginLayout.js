import React from 'react';
import Logo from '../../assets/logo-light-New.png';
import { Layout, Image } from 'antd';
import './layout.scss';

const { Header, Content, Footer } = Layout;

function LoginLayout(props) {
  return (
    <Layout>
      <Header className='header'>
        <div className='logo'>
          <Image src={Logo} alt='logo' width={200} />
        </div>
      </Header>
      <Content className='content'>
        <Layout className='site-layout-background'>
          <Content className='internal_content'>{props.children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        LinkComposer ©2021 Created by LinkComposer Team
      </Footer>
    </Layout>
  );
}
export default LoginLayout;
