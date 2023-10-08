import React, { useState, useEffect } from 'react'
import menuItems from './menuItems'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import './style.scss'

function KitMenu() {
  const [selectedKeys, setSelectedKeys] = useState('')

  const handleClick = (e) => {
    setSelectedKeys(e.key)
  }

  useEffect(() => {
    menuItems.forEach((menuItem) => {
      const menuItemUrl = `/${menuItem.url.split('?')[0]}`
      const pathname = window.location.pathname

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
      items={menuItems.map((menuItem) => ({
        label: <NavLink to={`/${menuItem.url}`}>{menuItem.title}</NavLink>,
        title: menuItem.title,
        key: menuItem.id.toString(),
        icon: menuItem.icon,
      }))}
    />
  )
}

export default KitMenu
