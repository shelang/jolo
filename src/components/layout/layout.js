import React from 'react';
import KitMenu from '../menu/menu';
import Logo from '../../assets/logo-light-New.png';
import { Layout, Image } from 'antd';
import './layout.scss';

const { Header, Content, Footer, Sider } = Layout;

function AppLayout(props) {
  console.log('hereeee');
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
      <Footer style={{ textAlign: 'center' }}>
        LinkComposer ©2021 Created by LinkComposer Team
      </Footer>
    </Layout>
  );
}
export default AppLayout;
