import React, { useEffect } from 'react'
import { Typography, Space, Skeleton } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { setCookie } from 'nookies'
import { useHistory } from 'react-router-dom'
import useFetch from '../../hooks/asyncAction'
import './style.scss'

const { Title, Text } = Typography

const WorkspaceItem = ({ workspace, onClick }) => {
  return (
    <div className="workspace-item" onClick={() => onClick(workspace.id)}>
      <GlobalOutlined style={{ fontSize: 24 }} />
      <Title level={5} style={{ color: '#fff', margin: 0, marginLeft: 8 }}>
        {workspace.name}
      </Title>
    </div>
  )
}

const Workspaces = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const history = useHistory()

  const fetchWorkspaces = async () => {
    try {
      await doFetch({
        url: 'workspaces',
        method: 'GET',
      })
    } catch (e) {}
  }

  const handleWorkspaceClick = (id) => {
    setCookie(null, ' x-wsid', JSON.stringify(id))
    history.push('/dashboard')
  }

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  return (
    <div className="workspace-wrapper">
      <Space direction="vertical" align="center" style={{ maxWidth: 700 }}>
        <Title style={{ margin: 0 }}>Please Choose Your Workspace</Title>
        <Text type="secondary">You can always change it from your panel</Text>
        <Space
          wrap
          size="large"
          align="center"
          style={{ justifyContent: 'flex-start', marginTop: 32 }}>
          {isLoading ? (
            <>
              <Skeleton.Button style={{ width: 300, height: 40 }} />
              <Skeleton.Button style={{ width: 300, height: 40 }} />
              <Skeleton.Button style={{ width: 300, height: 40 }} />
              <Skeleton.Button style={{ width: 300, height: 40 }} />
            </>
          ) : (
            response?.workspaces?.map((workspace, index) => (
              <WorkspaceItem
                key={index}
                workspace={workspace}
                onClick={handleWorkspaceClick}
              />
            ))
          )}
        </Space>
      </Space>
    </div>
  )
}

export default Workspaces
