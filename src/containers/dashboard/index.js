import React from 'react'
import { Col, Row } from 'antd'
import FiveTopIp from '../../components/fiveTopIp'

const Dashboard = () => {
  return (
    <Row style={{ padding: 16 }}>
      <Col span={4}>
        <FiveTopIp />
      </Col>
    </Row>
  )
}

export default Dashboard
