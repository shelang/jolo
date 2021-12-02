import React from "react";
import { CodeOutlined, FileAddOutlined, LinkOutlined } from "@ant-design/icons";

const menuItems = [
  {
    title: "Create Link",
    icon: <FileAddOutlined />,
    url: "dashboard/create-link?isEditing=false",
    id: 1,
    permission: "link:create",
  },
  {
    title: "Links",
    icon: <LinkOutlined />,
    url: "dashboard/links",
    id: 2,
    permission: "links:read",
  },
  {
    title: "Scripts",
    icon: <CodeOutlined />,
    url: "dashboard/scripts",
    id: 3,
    permission: "scripts:read",
  },
  ,
  {
    title: "Webhooks",
    icon: <CodeOutlined />,
    url: "dashboard/webhooks",
    id: 4,
    permission: "webhooks:read",
  },
];

export default menuItems;
