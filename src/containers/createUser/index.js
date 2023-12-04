import React, { useEffect, useState } from 'react'
import { Col, Button, Row, Input, Form, Steps, Spin, Transfer } from 'antd'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/asyncAction'
import { AppCard } from '../../components/appCard'
import { toast } from 'react-toastify'

const CreateUser = () => {
  const [step, setStep] = useState(0)
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [createUserdata, createUser] = useFetch()
  const [userworkspacesData, userWorkspaces] = useFetch()
  const [allWorkspacesData, allWorkspaces] = useFetch()

  const createNewUser = async (values) => {
    try {
      await createUser({
        url: 'users',
        method: 'POST',
        data: {
          ...values,
          needChangePassword: true,
        },
      })
      toast.success('User Created Successfully ')
    } catch (e) {
    } finally {
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onChange = async (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
    const method = direction === 'right' ? 'POST' : 'DELETE'

    try {
      await userWorkspaces({
        url: 'users/workspaces',
        method: method,
        data: {
          userId: createUserdata?.response?.id,
          workspaceIds: moveKeys,
        },
      })
      toast.success('Workspaces Added Successfully ')
      userWorkspaces({
        url: `users/${createUserdata?.response?.id}/workspaces`,
        method: 'GET',
      })
      allWorkspaces({
        url: 'users/workspaces',
        method: 'GET',
      })
    } catch (e) {
    } finally {
    }
  }
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  useEffect(() => {
    if (createUserdata?.response) {
      setStep(1)
      form.resetFields()
      userWorkspaces({
        url: `users/${createUserdata?.response?.id}/workspaces`,
        method: 'GET',
      })
      allWorkspaces({
        url: 'users/workspaces',
        method: 'GET',
      })
    }
  }, [createUserdata])

  const stepsContent = {
    0: (
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={createNewUser}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
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
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            loading={createUserdata?.isLoading}
            type="primary"
            htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    ),
    1: (
      <Spin spinning={userworkspacesData.isLoading}>
        <Transfer
          dataSource={allWorkspacesData?.response?.workspaces ?? []}
          titles={['Source', 'Target']}
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
    ),
  }

  return (
    <AppCard>
      <Row>
        <Col span={4}>
          <Steps
            style={{ minHeight: 300 }}
            direction="vertical"
            current={step}
            items={[
              {
                title: 'Create New User',
              },
              {
                title: 'Add Workspace',
              },
            ]}
          />
        </Col>
        <Col span={20}>{stepsContent[step]}</Col>
      </Row>
    </AppCard>
  )
}
export default CreateUser
