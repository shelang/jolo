import React from 'react'
import { Typography, Space } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import './style.scss'

const { Title, Text } = Typography

const workspaces = [
  { id: 1, title: 'Workspace Number 1' },
  { id: 2, title: 'Workspace Number 2' },
  { id: 3, title: 'Workspace Number 3' },
  { id: 4, title: 'Workspace Number 4' },
  { id: 5, title: 'Workspace Number 5' },
  { id: 6, title: 'Workspace Number 6' },
  { id: 7, title: 'Workspace Number 7' },
  { id: 8, title: 'Workspace Number 8' },
]

const WorkspaceItem = ({ workspace, onClick }) => {
  return (
    <div className="workspace-item" onClick={() => onClick(workspace.id)}>
      <GlobalOutlined style={{ fontSize: 24 }} />
      <Title level={5} style={{ color: '#fff', margin: 0, marginLeft: 8 }}>
        {workspace.title}
      </Title>
    </div>
  )
}

const Workspaces = () => {
  const handleWorkspaceClick = (id) => {
    alert(`you clicked ${id} workspace`)
  }
  return (
    <div className="workspace-wrapper">
      <Space direction="vertical" align="center" style={{ maxWidth: 700 }}>
        <Title style={{ margin: 0 }}>Please Choose Your Workspace</Title>
        <Text type="secondary">You can always change it from your panel</Text>
        <Space
          wrap
          size="large"
          align="center"
          style={{ justifyContent: 'center', marginTop: 32 }}>
          {workspaces.map((workspace, index) => (
            <WorkspaceItem
              key={index}
              workspace={workspace}
              onClick={handleWorkspaceClick}
            />
          ))}
        </Space>
      </Space>
    </div>
  )
}

export default Workspaces
