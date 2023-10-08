import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Input, message, Spin, Button, Card } from 'antd'

const { Search } = Input

const Users = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchUsers = async () => {
    try {
      await doFetch({
        url: 'users',
        method: 'GET',
      })
    } catch (e) {}
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  console.log(response, 'response')
  return <Spin spinning={isLoading}></Spin>
}

export default Users
