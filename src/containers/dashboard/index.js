import React from 'react'
import { Col, Row } from 'antd'
import FiveTopIp from '../../components/fiveTopIp'
import AgentNames from '../../components/agentNames'
import Circle from '../../components/agentNames/Circle'

const Dashboard = () => {
  return (
    <Row style={{ padding: 16 }} gutter={20}>
      <Col span={4}>
        <FiveTopIp />
      </Col>
      <Col span={10} >
        <AgentNames />
      </Col>
    </Row>
  )
}

export default Dashboard
