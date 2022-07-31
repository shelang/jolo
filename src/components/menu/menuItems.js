import React from 'react'
import {
  CodeOutlined,
  FileAddOutlined,
  LinkOutlined,
  UserOutlined,
} from '@ant-design/icons'

const menuItems = [
  {
    title: 'Dashboard',
    icon: <FileAddOutlined />,
    url: 'dashboard',
    id: 0,
    permission: 'dashboard:read',
  },
  {
    title: 'Create Link',
    icon: <FileAddOutlined />,
    url: 'dashboard/create-link?isEditing=false',
    id: 1,
    permission: 'link:create',
  },
  {
    title: 'Links',
    icon: <LinkOutlined />,
    url: 'dashboard/links',
    id: 2,
    permission: 'links:read',
  },
  {
    title: 'Scripts',
    icon: <CodeOutlined />,
    url: 'dashboard/scripts',
    id: 3,
    permission: 'scripts:read',
  },
  ,
  {
    title: 'Webhooks',
    icon: <CodeOutlined />,
    url: 'dashboard/webhooks',
    id: 4,
    permission: 'webhooks:read',
  },
  {
    title: 'Profile',
    icon: <UserOutlined />,
    url: 'dashboard/profile',
    id: 5,
    permission: 'profile:read',
  },
]

export default menuItems
