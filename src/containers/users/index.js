import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Table,
  Space,
  Spin,
  message,
  Divider,
  Input,
  Modal,
  QRCode,
  Tag,
} from 'antd'
import useFetch from '../../hooks/asyncAction'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { AppCard } from '../../components/appCard'
import moment from 'moment'
import { parseCookies } from 'nookies'

const { Search } = Input

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const [{ response, isLoading }, doFetch] = useFetch()

  const fetchUsers = async () => {
    await doFetch({
      url: 'users',
      method: 'GET',
    })
  }

  const searchByName = (value) => {
    setSearchValue(value)
  }

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
  ]

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

  return (
    <AppCard>
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
