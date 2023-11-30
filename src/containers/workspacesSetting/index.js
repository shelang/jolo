import React, { useEffect, useState } from 'react'
import { Modal, Button, Input, Table, Spin, Divider, Form } from 'antd'
import { AppCard } from '../../components/appCard'
import useFetch from '../../hooks/asyncAction'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import './style.scss'

const { TextArea, Search } = Input

const WorkspacesSetting = () => {
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [{ response, isLoading }, doFetch] = useFetch()

  const [form] = Form.useForm()

  const fetchWorkspaces = async () => {
    await doFetch({
      url: `workspaces/?page=${currentPage}&q=${searchValue}`,
      method: 'GET',
    })
  }

  const searchByName = (value) => {
    setSearchValue(value)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const createNewWorkspace = async (values) => {
    try {
      await doFetch({
        url: 'workspaces',
        method: 'POST',
        data: {
          name: values.name,
        },
      })
      if (currentPage === 1) {
        fetchWorkspaces()
      } else {
        setCurrentPage(1)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (e) {
    } finally {
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    fetchWorkspaces()
  }, [currentPage])

  useDidMountEffect(() => {
    if (currentPage > 1 || currentPage === 1) {
      setCurrentPage(1)
      fetchWorkspaces()
    }
  }, [searchValue])

  const columns = [
    {
      title: 'Workspace ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Workspace Name',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  console.log(response, 'response')

  return (
    <AppCard>
      <>
        <Button type="primary" onClick={showModal}>
          Add Workspace
        </Button>
        <Divider />
        <Modal
          title="Create Workspace"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}>
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={createNewWorkspace}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="name"
              name="name"
              rules={[
                { required: true, message: 'Please input your Workspace Name' },
              ]}>
              <Input />
            </Form.Item>
            {/* <Form.Item
              label="content"
              name="content"
              rules={[
                { required: true, message: 'Please input your Script Content' },
              ]}>
              <TextArea rows={4} />
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Spin spinning={isLoading}>
          <Search onSearch={searchByName} enterButton="Search" />
          <Divider />

          <Table
            columns={columns}
            dataSource={response?.workspaces ?? []}
            pagination={{
              position: ['bottomCenter'],
              size: 'small',
              current: currentPage,
              total: currentPage * 4 + 40,
              onChange: (page) => {
                setCurrentPage(page)
              },
            }}
            style={{ width: '100%' }}
          />
        </Spin>
      </>
    </AppCard>
  )
}

export default WorkspacesSetting
