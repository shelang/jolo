import React, { useState, useEffect } from 'react';
import menuItems from './menuItems';
import Can from '../can/can';
import useCache from '../../hooks/cacheData';
import { Menu } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

function KitMenu() {
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState('');
  const [setLocalStorage, getLocalStorage] = useCache();

  const handleClick = (e) => {
    if (e.key === '0') {
      setLocalStorage('user', null);
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
      mode='inline'
      selectedKeys={[selectedKeys]}
      onClick={handleClick}
      style={{ maxHeight: '94vh', height: '94vh', overflow: 'auto' }}
    >
      {menuItems.map((menuItem, index) => {
        return (
          <Can
            key={index + 1}
            depth={1}
            yes={(props) => (
              <Menu.Item
                key={menuItem.id.toString()}
                icon={menuItem.icon}
                {...props}
              >
                <Link to={`/${menuItem.url}`}>{menuItem.title}</Link>
              </Menu.Item>
            )}
            no={() => null}
            perform={menuItem.permission}
          />
        );
      })}
      <Menu.Item
        key='0'
        icon={<LogoutOutlined />}
        style={{ position: 'absolute', bottom: 10 }}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );
}

export default KitMenu;
