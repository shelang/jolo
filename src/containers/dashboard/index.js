import React from 'react'
import { Col, Row } from 'antd'
import FiveTopIp from '../../components/fiveTopIp'
import AgentNames from '../../components/agentNames'
import TopDevices from '../../components/topDevices'
import TopDeviceNames from '../../components/topDeviceNames'
import TopDeviceBrands from '../../components/topDeviceBrands'
import TopOses from '../../components/topOses'

const Dashboard = () => {
  return (
    <Row gutter={20} style={{ marginBottom: 32 }}>
      <Col span={6}>
        <Row gutter={20} style={{ marginBottom: 32 }}>
          <Col span={24} style={{ marginBottom: 32 }}>
            <FiveTopIp />
          </Col>
          <Col span={24}>
            <TopOses />
          </Col>
        </Row>
      </Col>
      <Col span={18}>
        <Row gutter={20} style={{ marginBottom: 32 }}>
          <Col span={12} style={{ marginBottom: 32 }}>
            <AgentNames />
          </Col>
          <Col span={12} style={{ marginBottom: 32 }}>
            <TopDeviceBrands />
          </Col>
          <Col span={12} style={{ marginBottom: 32 }}>
            <TopDeviceNames />
          </Col>
          <Col span={12} style={{ marginBottom: 32 }}>
            <TopDevices />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
