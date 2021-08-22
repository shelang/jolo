import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const menuItems = [
  {
    title: 'Create Link',
    icon: <UserOutlined />,
    url: 'dashboard/create-link',
    id: 1,
    permission: 'link:create',
  },
];

export default menuItems;
