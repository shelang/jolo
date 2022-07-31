import React, { useEffect } from 'react'
import { Spin, List, Typography } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'

const { Title } = Typography

const FiveTopIp = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/last/ips',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <AppCard title="Five Last Ips">
      <Spin spinning={isLoading}>
        <List
          dataSource={response ? response.data.slice(0, 5) : []}
          renderItem={(item) => <List.Item>{item.key}</List.Item>}
        />
      </Spin>
    </AppCard>
  )
}

export default FiveTopIp
