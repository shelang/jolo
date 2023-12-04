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
import { useParams } from 'react-router-dom'

import { AppCard } from '../../components/appCard'
import useFetch from '../../hooks/asyncAction'
import './style.scss'

const UserEdit = ({ query }) => {
  const [selectedKeys, setSelectedKeys] = useState([])

  const [{ response, isLoading }, doFetch] = useFetch()
  const [edittingData, editUser] = useFetch()
  const [userworkspacesData, userWorkspaces] = useFetch()
  const [allWorkspacesData, allWorkspaces] = useFetch()

  const params = useParams()
  const [form] = Form.useForm()

  const fetchUser = async () => {
    await doFetch({
      url: `users/${params?.id}`,
      method: 'GET',
    })
  }

  const fetchUserWorkspace = async () => {
    await userWorkspaces({
      url: `users/${params?.id}/workspaces`,
      method: 'GET',
    })
  }
  const fetchAllWorkspace = async () => {
    await allWorkspaces({
      url: 'users/workspaces',
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
  const handleDeleteUser = () => {}
  const onChange = async (nextTargetKeys, direction, moveKeys) => {
    const method = direction === 'right' ? 'POST' : 'DELETE'

    try {
      await userWorkspaces({
        url: 'users/workspaces',
        method: method,
        data: {
          userId: params?.id,
          workspaceIds: moveKeys,
        },
      })
      fetchUser()
      fetchUserWorkspace()
      fetchAllWorkspace()
    } catch (e) {
    } finally {
    }
  }
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  useEffect(() => {
    fetchUser()
    fetchUserWorkspace()
    fetchAllWorkspace()
  }, [])
  useEffect(() => {
    form.setFieldsValue(response)
  }, [response])

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
              {/* <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Popconfirm
                  title="Delete the User"
                  description="Are you sure to delete this User?"
                  onConfirm={handleDeleteUser}
                  okText="Yes"
                  cancelText="No">
                  <Button loading={edittingData?.isLoading} danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Form.Item> */}
            </Space>
          </Form>
        </Spin>
        <Divider />
        <Spin
          spinning={
            userworkspacesData.isLoading || allWorkspacesData?.isLoading
          }>
          <Transfer
            listStyle={{
              width: 450,
              height: 300,
            }}
            dataSource={allWorkspacesData?.response?.workspaces ?? []}
            titles={['All Workspaces', 'User Workspaces']}
            targetKeys={userworkspacesData?.response?.workspaces?.map(
              (w) => w.id,
            )}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            rowKey={(record) => record.id}
            render={(item) => item.name}
          />
        </Spin>
      </>
    </AppCard>
  )
}

export default UserEdit
