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

const UserEdit = ({ query }) => {
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const [{ response, isLoading }, doFetch] = useFetch()
  const [edittingData, editUser] = useFetch()
  const [workspaceMembersData, workspaceMembers] = useFetch()
  const [updateUsersWorkspaceData, updateUsersWorkspace] = useFetch()
  const [usersData, users] = useFetch()

  const params = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const fetchUser = async () => {
    await doFetch({
      url: `users/${params?.id}`,
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
  const updateUser = async (values) => {
    try {
      await editUser({
        url: `users/${params?.id}`,
        method: 'PUT',
        data: {
          ...values,
          id: params?.id,
          needChangePassword: true,
        },
      })
      // fetchWorkspace()
      form.resetFields()
    } catch (e) {
    } finally {
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    fetchUser()
    // fetchUsers()
    // fetchWorkspaceMembers()
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
            onFinish={updateUser}
            onFinishFailed={onFinishFailed}
            initialValues={response}>
            <Form.Item
              label="UserName"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your User Name',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}>
              <Input.Password />
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
            titles={['All Workspaces', 'User Workspaces']}
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

export default UserEdit
