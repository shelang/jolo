import React from 'react';
import { FileAddOutlined, LinkOutlined } from '@ant-design/icons';

const menuItems = [
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
];

export default menuItems;
