import React, { useEffect } from 'react'
import { Spin, Card, List, Typography, Skeleton } from 'antd'
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
    <div>
      <Title level={5} style={{ marginBottom: 4 }}>
        Five Top Ips
      </Title>
      <Card style={{ width: '100%', borderRadius: 4 }}>
        <Spin spinning={isLoading}>
          <List
            dataSource={response ? response.data.slice(0, 5) : []}
            renderItem={(item) => <List.Item>{item.key}</List.Item>}
          />
        </Spin>
      </Card>
    </div>
  )
}

export default FiveTopIp
