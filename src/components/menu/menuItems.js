import React from 'react'
import {
  CodeOutlined,
  FileAddOutlined,
  LinkOutlined,
  UserSwitchOutlined,
  HomeOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

const menuItems = [
  {
    title: 'Dashboard',
    icon: <HomeOutlined />,
    url: 'dashboard',
    id: 1,
    permission: 'dashboard:read',
  },
  // {
  //   title: 'Users',
  //   icon: <UserSwitchOutlined />,
  //   url: 'dashboard/users',
  //   id: 7,
  //   permission: 'users:read',
  // },
  {
    title: 'Create Link',
    icon: <FileAddOutlined />,
    url: 'dashboard/create-link?isEditing=false',
    id: 2,
    permission: 'link:create',
  },
  {
    title: 'Links',
    icon: <LinkOutlined />,
    url: 'dashboard/links',
    id: 3,
    permission: 'links:read',
  },
  {
    title: 'Scripts',
    icon: <CodeOutlined />,
    url: 'dashboard/scripts',
    id: 4,
    permission: 'scripts:read',
  },

  {
    title: 'Webhooks',
    icon: <CodeOutlined />,
    url: 'dashboard/webhooks',
    id: 5,
    permission: 'webhooks:read',
  },
  // {
  //   title: 'Workspaces',
  //   icon: <GlobalOutlined />,
  //   url: 'dashboard/workspaces',
  //   id: 6,
  //   permission: 'webhooks:read',
  // },
  {
    title: 'Settings',
    icon: <SettingOutlined />,
    url: 'dashboard/settings',
    id: 8,
    permission: 'settings:read',
  },
]

export default menuItems
