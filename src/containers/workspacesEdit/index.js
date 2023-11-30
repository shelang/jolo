import React, { useEffect, useState } from 'react'
import {
  Divider,
  Button,
  Input,
  Transfer,
  Spin,
  Popconfirm,
  Form,
  Space,
} from 'antd'
import { useParams, useNavigate } from 'react-router-dom'

import { AppCard } from '../../components/appCard'
import useFetch from '../../hooks/asyncAction'
import './style.scss'

const WorkspacesEdit = ({ query }) => {
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const [{ response, isLoading }, doFetch] = useFetch()
  const [edittingData, editWorkspace] = useFetch()
  const [workspaceMembersData, workspaceMembers] = useFetch()
  const [updateUsersWorkspaceData, updateUsersWorkspace] = useFetch()
  const [usersData, users] = useFetch()

  const params = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const fetchWorkspace = async () => {
    await doFetch({
      url: `workspaces/${params?.id}`,
      method: 'GET',
    })
  }
  const fetchWorkspaceMembers = async () => {
    await workspaceMembers({
      url: `workspaces/${params?.id}/members`,
      method: 'GET',
    })
  }
  const fetchUsers = async () => {
    await users({
      url: `users`,
      method: 'GET',
    })
  }
  const updateWorkspace = async (values) => {
    try {
      await editWorkspace({
        url: `workspaces/${params?.id}`,
        method: 'PUT',
        data: {
          name: values.name,
        },
      })
      fetchWorkspace()
      form.resetFields()
    } catch (e) {
    } finally {
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleDeleteWorkspace = async () => {
    try {
      await editWorkspace({
        url: `workspaces/${params?.id}`,
        method: 'DELETE',
      })
      navigate('/dashboard/workspaces')
    } catch (e) {
    } finally {
    }
  }

  useEffect(() => {
    fetchWorkspace()
    fetchUsers()
    fetchWorkspaceMembers()
  }, [])
  useEffect(() => {
    form.setFieldsValue(response)
  }, [response])

  useEffect(() => {
    if (workspaceMembersData?.response?.users) {
      setTargetKeys(
        workspaceMembersData?.response?.users.map((user) => user.id),
      )
    }
  }, [workspaceMembersData])

  const onChange = async (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
    const method = direction === 'right' ? 'POST' : 'DELETE'

    try {
      await updateUsersWorkspace({
        url: `workspaces/${params?.id}/members`,
        method: method,
        data: {
          memberIds: moveKeys,
        },
      })
      fetchWorkspaceMembers()
      fetchUsers()
    } catch (e) {
    } finally {
    }
  }

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  return (
    <AppCard>
      <>
        <Spin spinning={isLoading}>
          <Form
            form={form}
            wrapperCol={{ span: 10 }}
            onFinish={updateWorkspace}
            onFinishFailed={onFinishFailed}
            initialValues={response}>
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Workspace Name',
                  initialValue: response?.name,
                },
              ]}>
              <Input />
            </Form.Item>

            <Space>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button
                  loading={edittingData?.isLoading}
                  type="primary"
                  htmlType="submit">
                  Update
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Popconfirm
                  title="Delete the Workspace"
                  description="Are you sure to delete this Workspace?"
                  onConfirm={handleDeleteWorkspace}
                  okText="Yes"
                  cancelText="No">
                  <Button loading={edittingData?.isLoading} danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Form.Item>
            </Space>
          </Form>
        </Spin>
        <Divider />
        <Spin spinning={workspaceMembersData.isLoading || usersData?.isLoading}>
          <Transfer
            listStyle={{
              width: 450,
              height: 300,
            }}
            dataSource={usersData?.response?.users ?? []}
            titles={['All Users', 'Workspace Members']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            rowKey={(record) => record.id}
            render={(item) => item.username}
          />
        </Spin>
      </>
    </AppCard>
  )
}

export default WorkspacesEdit
