import React, { useEffect, useState, useRef } from 'react'
import { Col, Row } from 'antd'
import { SubBar } from '../../components/subBar'
import FiveTopIp from '../../components/fiveTopIp'
import AgentNames from '../../components/agentNames'
import TopDevices from '../../components/topDevices'
import TopDeviceNames from '../../components/topDeviceNames'
import TopDeviceBrands from '../../components/topDeviceBrands'
import TopOses from '../../components/topOses'
import { Sticky } from '../../components/sticky'

const Dashboard = () => {
  const [time, setTime] = useState({})

  return (
    <Row gutter={10} style={{ marginBottom: 24 }}>
      <Sticky topOffset={-16}>
        <SubBar
          onChange={(time) => {
            setTime(time)
          }}
        />
      </Sticky>
      <Col span={24} style={{ marginBottom: 24 }}>
        <AgentNames queryParams={time} />
      </Col>
      <Col span={6}>
        <FiveTopIp queryParams={time} />
      </Col>
      <Col span={18}>
        <Row gutter={10} style={{ marginBottom: 24 }}>
          <Col span={12} style={{ marginBottom: 24 }}>
            <TopOses queryParams={time} />
          </Col>
          <Col span={12} style={{ marginBottom: 24 }}>
            <TopDeviceBrands queryParams={time} />
          </Col>
          <Col span={12} style={{ marginBottom: 24 }}>
            <TopDevices queryParams={time} />
          </Col>
          <Col span={12}>
            <TopDeviceNames queryParams={time} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
