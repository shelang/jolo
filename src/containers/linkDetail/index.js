import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import utc from 'dayjs/plugin/utc'
import { Row, Col, Spin, Card, Typography, Space, Select } from 'antd'
import AgentNames from '../../components/agentNames'
import TopDevices from '../../components/topDevices'
import TopDeviceNames from '../../components/topDeviceNames'
import TopDeviceBrands from '../../components/topDeviceBrands'
import TopOses from '../../components/topOses'
import { encodeQueryData } from '../../utils/queryParams'
import { ColumnChartConfig } from '../../lib/ColumnChartConfig'
import { Sticky } from '../../components/sticky'

import { SubBar } from '../../components/subBar'
import { AppCard } from '../../components/appCard'

dayjs.extend(utc)

const LinkDetail = (props) => {
  const [buckets, setBuckets] = useState([])
  const [time, setTime] = useState({
    from: dayjs().startOf('day').utc().format(),
    to: dayjs().utc().format(),
  })
  const [bucket, setBucket] = useState('daily')

  const params = useParams()

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
      url: `analytics/${params?.id}?${queryParams}`,
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
        <Sticky topOffset={-16}>
          <SubBar
            onChange={(time, bucket) => {
              setTime(time)
              setBucket(bucket)
            }}
            hasBucket
          />
        </Sticky>

        <Row>
          <Col span={24} style={{ marginBottom: 24 }}>
            <AgentNames queryParams={time} linkData={response} />
          </Col>

          {bucket ? (
            <Col span={24} style={{ marginBottom: 24 }}>
              <AppCard title="Click Counts">
                <ColumnChart
                  highcharts={Highcharts}
                  options={ColumnChartConfig(buckets) || {}}
                />
              </AppCard>
            </Col>
          ) : null}
        </Row>

        <Row gutter={10} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Row gutter={20} style={{ marginBottom: 24 }}>
              <Col span={12} style={{ marginBottom: 24 }}>
                <TopOses queryParams={time} />
              </Col>
              <Col span={12} style={{ marginBottom: 24 }}>
                <TopDeviceBrands queryParams={time} />
              </Col>
              <Col span={12} style={{ marginBottom: 24 }}>
                <TopDevices queryParams={time} />
              </Col>{' '}
              <Col span={12}>
                <TopDeviceNames queryParams={time} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  )
}
export default LinkDetail
