import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Spin, Card, List } from 'antd'

const FiveTopIp = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/last/ips',
      method: 'GET',
    })
  }
  let data = []
  useEffect(() => {
    fetchLinks()
    if (response) {
      console.log(response.data.slice(0, 5))
      data = response.data.slice(0, 5)
    }
  }, [])
  return (
    <Card title="Five Top Ips" style={{ width: 250 }}>
      <Spin spinning={isLoading}>
        <List
          dataSource={response ? response.data.slice(0, 5): data}
          renderItem={(item) => <List.Item>{item.key}</List.Item>}
        />
      </Spin>
    </Card>
  )
}

export default FiveTopIp
