import React from 'react';
import KitMenu from '../menu/menu';
import Logo from '../../assets/logo-light-New.png';
import { Layout, Image } from 'antd';
import './layout.scss';

const { Header, Content, Footer, Sider } = Layout;

function AppLayout(props) {
  return (
    <Layout>
      <Header className='header'>
        <div className='logo'>
          <Image src={Logo} alt='logo' width={200} />
        </div>
      </Header>
      <Content className='content'>
        <Layout className='site-layout-background'>
          <Sider className='site-layout-background' width={200}>
            <KitMenu />
          </Sider>
          <Content className='internal_content'>{props.children}</Content>
        </Layout>
      </Content>
      <Footer
        style={{
          alignItems: 'center',
          height: 50,
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        LinkComposer ©2021 Created by LinkComposer Team
      </Footer>
    </Layout>
  );
}
export default AppLayout;