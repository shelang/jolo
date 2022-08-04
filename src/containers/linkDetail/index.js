import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import moment from 'moment'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import { Row, Col, Spin, Card, Typography, Space, Select } from 'antd'
import AgentNames from '../../components/agentNames'
import TopDevices from '../../components/topDevices'
import TopDeviceNames from '../../components/topDeviceNames'
import TopDeviceBrands from '../../components/topDeviceBrands'
import TopOses from '../../components/topOses'
import { encodeQueryData } from '../../utils/queryParams'
import { ColumnChartConfig } from '../../lib/ColumnChartConfig'

import { SubBar } from '../../components/subBar'
import { AppCard } from '../../components/appCard'

const { Title } = Typography
const { Option } = Select

const LinkDetail = (props) => {
  const [buckets, setBuckets] = useState([])
  const [time, setTime] = useState({})
  const [timeFrame, setTimeFrame] = useState('0')
  const [bucket, setBucket] = useState(null)

  const [{ response, isLoading }, doFetch] = useFetch()

  useEffect(() => {
    fetchLinkDetail()
  }, [time.from, time.to, bucket])

  const fetchLinkDetail = async () => {
    const queryParams = encodeQueryData({
      from: time.from,
      to: time.to,
      bucket,
    })
    await doFetch({
      url: `analytics/${props.match.params.id}?${queryParams}`,
      method: 'GET',
    })
  }

  useEffect(() => {
    if (response && response.buckets) {
      const normalizedResponse = response.buckets.reduce((total, acc) => {
        const newFrom = acc.from && acc.from.split('T')[0]

        total.push({
          name: newFrom,
          count: acc.count,
          uniqCount: acc.uniqCount,
        })

        return total
      }, [])

      setBuckets(normalizedResponse)
    }
  }, [response])

  return (
    <>
      <Spin spinning={isLoading}>
        <Row>
          <Col span={24} style={{ marginBottom: 32 }}>
            <SubBar
              onChange={(time, bucket) => {
                setTime(time)
                setBucket(bucket)
              }}
              hasBucket
            />
          </Col>
          <Col span={24} style={{ marginBottom: 32 }}>
            <AgentNames queryParams={time} />
          </Col>
          <Col span={24} style={{ marginBottom: 32 }}>
            <AppCard title="Click Counts">
              {bucket ? (
                <ColumnChart
                  highcharts={Highcharts}
                  options={ColumnChartConfig(buckets) || {}}
                />
              ) : (
                <span>Please Choose Periodical </span>
              )}
            </AppCard>
          </Col>
        </Row>
      </Spin>
      <Row gutter={20} style={{ marginBottom: 32 }}>
        <Col span={24}>
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
    </>
  )
}
export default LinkDetail
