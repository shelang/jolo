import React, { useState, useEffect } from 'react'
import menuItems from './menuItems'
import Can from '../can/can'
import { Menu } from 'antd'
import { useHistory, NavLink } from 'react-router-dom'
import './style.scss'

function KitMenu() {
  const history = useHistory()
  const [selectedKeys, setSelectedKeys] = useState('')

  const handleClick = (e) => {
    setSelectedKeys(e.key)
  }

  useEffect(() => {
    menuItems.forEach((menuItem) => {
      const menuItemUrl = `/${menuItem.url.split('?')[0]}`
      const pathname = history.location.pathname

      if (pathname.includes(menuItemUrl) && pathname === menuItemUrl) {
        setSelectedKeys(menuItem.id.toString())
      }
    })
  }, [])

  return (
    <Menu
      selectedKeys={[selectedKeys]}
      onClick={handleClick}
      className="menu"
      inlineCollapsed>
      {menuItems.map((menuItem) => {
        return (
          <Can
            key={menuItem.id.toString()}
            depth={1}
            yes={(props) => (
              <Menu.Item
                className="menuItem"
                key={menuItem.id.toString()}
                icon={menuItem.icon}
                label={menuItem.title}
                {...props}>
                <NavLink to={`/${menuItem.url}`}>{menuItem.title}</NavLink>
              </Menu.Item>
            )}
            no={() => null}
            perform={menuItem.permission}
          />
        )
      })}
    </Menu>
  )
}

export default KitMenu
