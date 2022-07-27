import React from 'react'
import { Col, Row } from 'antd'
import FiveTopIp from '../../components/fiveTopIp'
import AgentNames from '../../components/agentNames'

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#fafafa', padding: 16, height: '100%' }}>
      <Row gutter={20}>
        <Col span={4}>
          <FiveTopIp />
        </Col>
        <Col span={8}>
          <AgentNames />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
