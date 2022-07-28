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
    <div style={{ backgroundColor: '#fafafa', padding: 16 }}>
      <Row gutter={20} style={{ marginBottom: 32 }}>
        <Col span={6}>
          <Row gutter={20} style={{ marginBottom: 32 }}>
            <Col span={24} style={{ marginBottom: 16 }}>
              <FiveTopIp />
            </Col>
            <Col span={24}>
              <TopOses />
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <Row gutter={20} style={{ marginBottom: 32 }}>
            <Col span={12}>
              <AgentNames />
            </Col>
            <Col span={12}>
              <TopDeviceBrands />
            </Col>
            <Col span={12}>
              <TopDeviceNames />
            </Col>
            <Col span={12}>
              <TopDevices />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
