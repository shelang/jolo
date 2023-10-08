import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { Table, Space, Spin, Button, Card } from 'antd'
import useFetch from '../../hooks/asyncAction'

const Workspaces = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [{ response, isLoading, error }, doFetch] = useFetch()

  const cookies = parseCookies()
  const workspace = cookies['x-ws'] && JSON.parse(cookies['x-ws'])

  const fetchWorkspaces = async () => {
    try {
      await doFetch({
        url: `workspaces?page=${currentPage}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  useEffect(() => {
    fetchWorkspaces()
  }, [currentPage])

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
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={isLoading}>
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
  )
}

export default Workspaces
