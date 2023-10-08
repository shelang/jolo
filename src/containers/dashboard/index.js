import React, { useState } from 'react'
import { Col, Row } from 'antd'
import { SubBar } from '../../components/subBar'
import { Sticky } from '../../components/sticky'

const FiveTopIp = React.lazy(() => import('../../components/fiveTopIp'))
const AgentNames = React.lazy(() => import('../../components/agentNames'))
const TopDevices = React.lazy(() => import('../../components/topDevices'))
const TopDeviceNames = React.lazy(() =>
  import('../../components/topDeviceNames'),
)
const TopOses = React.lazy(() => import('../../components/topOses'))
const TopDeviceBrands = React.lazy(() =>
  import('../../components/topDeviceBrands'),
)

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
