import React, { useEffect, useState } from 'react'
import {
  Divider,
  Button,
  Input,
  Transfer,
  Spin,
  Popconfirm,
  Table,
  Form,
  Tag,
  Space,
} from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import difference from 'lodash/difference'
import debounce from 'lodash/debounce'

import { AppCard } from '../../components/appCard'
import useFetch from '../../hooks/asyncAction'
import './style.scss'

const WorkspacesEdit = ({ query }) => {
  const [targetKeys, setTargetKeys] = useState([])
  const [currentPage, setCurrentPage] = useState({ left: 1, right: 1 })
  const [searchValue, setSearchValue] = useState({ left: '', right: '' })

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
  const fetchWorkspaceMembers = async (page, search) => {
    await workspaceMembers({
      url: `workspaces/${params?.id}/members?page=${
        page ?? currentPage.right
      }&name=${search ?? searchValue.right}`,
      method: 'GET',
    })
  }
  const fetchUsers = async (page, search) => {
    await users({
      url: `users/?page=${page ?? currentPage.left}&name=${
        search ?? searchValue.left
      }`,
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
  const handleSearch = debounce((direction, value) => {
    setSearchValue((prev) => ({
      ...prev,
      [direction]: value,
    }))
    setCurrentPage((prev) => ({
      ...prev,
      [direction]: 1,
    }))
    if (direction === 'left') {
      fetchUsers(1, value)
    } else {
      fetchWorkspaceMembers(1, value)
    }
  }, 400)
  const handlePageChange = (page, direction) => {
    setCurrentPage((prev) => ({
      ...prev,
      [direction]: page,
    }))
    if (direction === 'left') {
      fetchUsers(page)
    } else {
      fetchWorkspaceMembers(page)
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

  const TableColumns = [
    {
      dataIndex: 'id',
      title: 'ID',
    },

    {
      dataIndex: 'username',
      title: 'UserName',
    },
  ]

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
        <TableTransfer
          titles={['All Users', 'Workspace Members']}
          dataSource={usersData?.response?.users ?? []}
          targetKeys={targetKeys}
          showSearch
          onChange={onChange}
          onSearch={handleSearch}
          rowKey={(record) => record.id}
          filterOption={(inputValue, item) =>
            item.title?.indexOf(inputValue) !== -1 ||
            item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={TableColumns}
          rightColumns={TableColumns}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          leftSideLoading={usersData?.isLoading}
          rightSideLoading={workspaceMembersData.isLoading}
        />
      </>
    </AppCard>
  )
}

const TableTransfer = ({
  leftColumns,
  rightColumns,
  currentPage,
  setCurrentPage,
  leftSideLoading,
  rightSideLoading,
  ...restProps
}) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns
      const loading = direction === 'left' ? leftSideLoading : rightSideLoading

      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key)
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys)
          onItemSelectAll(diffKeys, selected)
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected)
        },
        selectedRowKeys: listSelectedKeys,
      }

      return (
        <Spin spinning={loading}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : undefined }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return
                onItemSelect(key, !listSelectedKeys.includes(key))
              },
            })}
            pagination={{
              position: ['bottomCenter'],
              size: 'small',
              current: currentPage[direction],
              total: currentPage[direction] * 4 + 40,
              onChange: (page) => {
                setCurrentPage(page, direction)
              },
            }}
          />
        </Spin>
      )
    }}
  </Transfer>
)
export default WorkspacesEdit
