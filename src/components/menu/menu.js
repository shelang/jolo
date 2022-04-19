import React, { useState, useEffect } from 'react';
import menuItems from './menuItems';
import Can from '../can/can';
import { Menu } from 'antd';
import { useHistory, NavLink } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { destroyCookie } from 'nookies';

function KitMenu() {
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState('');

  const handleClick = (e) => {
    if (e.key === '0') {
      destroyCookie(null, 'user');
      history.push('/login');
    } else setSelectedKeys(e.key);
  };
  useEffect(() => {
    menuItems.forEach((menuItem) => {
      if (history.location.pathname.includes(menuItem.url)) {
        setSelectedKeys(menuItem.id.toString());
      }
    });
  }, []);

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKeys]}
      onClick={handleClick}
      style={{ maxHeight: '94vh', height: '94vh', overflow: 'auto' }}
    >
      {menuItems.map((menuItem) => {
        return (
          <Can
            key={menuItem.id.toString()}
            depth={1}
            yes={(props) => (
              <Menu.Item
                key={menuItem.id.toString()}
                icon={menuItem.icon}
                {...props}
              >
                <NavLink to={`/${menuItem.url}`}>{menuItem.title}</NavLink>
              </Menu.Item>
            )}
            no={() => null}
            perform={menuItem.permission}
          />
        );
      })}
      <Menu.Item
        key="0"
        icon={<LogoutOutlined />}
        style={{ position: 'absolute', bottom: 10 }}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );
}

export default KitMenu;
