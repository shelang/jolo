import React, { useState } from 'react'
import { Col, Row } from 'antd'
import { SubBar } from '../../components/subBar'
import FiveTopIp from '../../components/fiveTopIp'
import AgentNames from '../../components/agentNames'
import TopDevices from '../../components/topDevices'
import TopDeviceNames from '../../components/topDeviceNames'
import TopDeviceBrands from '../../components/topDeviceBrands'
import TopOses from '../../components/topOses'

const Dashboard = () => {
  const [time, setTime] = useState({})
  return (
    <Row gutter={20} style={{ marginBottom: 32 }}>
      <Col span={24} style={{ marginBottom: 32 }}>
        <SubBar
          onChange={(time) => {
            setTime(time)
          }}
        />
      </Col>
      <Col span={24} style={{ marginBottom: 32 }}>
        <AgentNames queryParams={time} />
      </Col>
      <Col span={6}>
        <Row gutter={20} style={{ marginBottom: 32 }}>
          <Col span={24} style={{ marginBottom: 32 }}>
            <FiveTopIp queryParams={time} />
          </Col>
        </Row>
      </Col>
      <Col span={18}>
        <Row gutter={20} style={{ marginBottom: 32 }}>
          <Col span={12} style={{ marginBottom: 32 }}>
            <TopOses queryParams={time} />
          </Col>
          <Col span={12} style={{ marginBottom: 32 }}>
            <TopDeviceBrands queryParams={time} />
          </Col>
          <Col span={12} style={{ marginBottom: 32 }}>
            <TopDevices queryParams={time} />
          </Col>{' '}
          <Col span={12}>
            <TopDeviceNames queryParams={time} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
