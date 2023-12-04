import React, { useEffect, useState } from 'react'
import { Table, Button, Spin, Divider, Input, Modal, Form, Steps } from 'antd'
import { NavLink } from 'react-router-dom'
import useFetch from '../../hooks/asyncAction'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { AppCard } from '../../components/appCard'

const { Search } = Input

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const [{ response, isLoading }, doFetch] = useFetch()

  const fetchUsers = async () => {
    await doFetch({
      url: `users/?page=${currentPage}&name=${searchValue}`,
      method: 'GET',
    })
  }

  const searchByName = (value) => {
    setSearchValue(value)
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  useDidMountEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1)
    } else {
      fetchUsers()
    }
  }, [searchValue])

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <NavLink to={`/dashboard/users/${id}`}>Edit</NavLink>
      },
    },
  ]

  return (
    <AppCard>
      <Button type="primary">
        <NavLink to={`/dashboard/users/create`}> Create New User</NavLink>
      </Button>
      <Divider />

      <Spin spinning={isLoading}>
        <Search onSearch={searchByName} enterButton="Search" />
        <Divider />

        <Table
          columns={columns}
          dataSource={response?.users ?? []}
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
    </AppCard>
  )
}
export default Users
