import React, { useEffect } from 'react'
import { Spin, Card, List } from 'antd'
import useFetch from '../../hooks/asyncAction'

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
    <Card title="Five Top Ips" style={{ width: 250 }}>
      <Spin spinning={isLoading}>
        <List
          dataSource={response ? response.data.slice(0, 5) : []}
          renderItem={(item) => <List.Item>{item.key}</List.Item>}
        />
      </Spin>
    </Card>
  )
}

export default FiveTopIp
