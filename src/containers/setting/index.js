import React, { useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Menu, Card, Row, Col } from 'antd'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Profile from '../profile'
import './style.scss'

const Setting = () => {
  const [selectedMenu, setSelectedMenu] = useState('profile')

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }

  const items = [
    getItem('Profile', 'profile', <UserOutlined />),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />),
    getItem('Navigation Three', 'sub4', <SettingOutlined />),
  ]
  const onClick = (e) => {
    console.log('click', e)
    setSelectedMenu(e.key)
  }

  const renderer = {
    profile: <Profile />,
    sub2: <div>sub2</div>,
    sub4: <div>sub4</div>,
  }

  return (
    <Card>
      <Row>
        <Col span={4}>
          <Menu
            className="settingsMenu"
            onClick={onClick}
            style={{
              width: 256,
            }}
            mode="vertical"
            items={items}
          />
        </Col>
        <Col span={20}>{renderer[selectedMenu]}</Col>
      </Row>
    </Card>
  )
}

export default Setting
