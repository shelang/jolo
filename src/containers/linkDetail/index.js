import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import moment from 'moment'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import {
  DatePicker,
  Row,
  Col,
  Spin,
  Card,
  Typography,
  Select,
  Space,
} from 'antd'
import AgentNames from '../../components/agentNames'
import TopDevices from '../../components/topDevices'
import TopDeviceNames from '../../components/topDeviceNames'
import TopDeviceBrands from '../../components/topDeviceBrands'
import TopOses from '../../components/topOses'
import { encodeQueryData } from '../../utils/queryParams'
import { timeframes } from '../../utils/constants'
import { ColumnChartConfig } from '../../lib/ColumnChartConfig'
const { RangePicker } = DatePicker
const { Title } = Typography
const { Option } = Select

const LinkDetail = (props) => {
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())
  const [bucket, setBucket] = useState(null)
  const [timeFrame, setTimeFrame] = useState('0')
  const [buckets, setBuckets] = useState([])

  const [{ response, isLoading }, doFetch] = useFetch()

  useEffect(() => {
    fetchLinkDetail()
  }, [startDate, endDate, bucket])

  const fetchLinkDetail = async () => {
    const queryParams = encodeQueryData({
      from: startDate.utc().startOf('day').format(),
      to: endDate.utc().format(),
      bucket,
    })
    await doFetch({
      url: `analytics/${props.match.params.id}?${queryParams}`,
      method: 'GET',
    })
  }
  const handleChangeDates = (dates, datesString) => {
    setStartDate(dates[0])
    setEndDate(dates[1])
  }
  const handleChangeBucket = (value) => {
    setBucket(value)
  }
  const handleChangeTimeFrame = (value) => {
    setTimeFrame(value)
    let endDate = null
    let startDate = null

    switch (value) {
      case 'current': {
        endDate = moment()
        startDate = moment().startOf('month')

        break
      }
      case 'prev': {
        endDate = moment().startOf('month')
        startDate = moment().subtract(1, 'months').startOf('month')
        break
      }
      case 'prevYear': {
        endDate = moment().startOf('year')
        startDate = moment().subtract(1, 'years').startOf('year')
        break
      }

      default: {
        endDate = moment()
        startDate = moment().subtract(value, 'days')
        break
      }
    }

    setStartDate(startDate)
    setEndDate(endDate)
  }

  useEffect(() => {
    if (response && response.buckets) {
      const normalizedResponse = response.buckets.reduce((total, acc) => {
        const newFrom = acc.from && acc.from.split('T')[0]

        if (!total[`${newFrom} `]) {
          total[`${newFrom} `] = [acc.count]
        } else {
          total[`${newFrom}`] = [total[`${newFrom} `] + acc.count]
        }
        return total
      }, {})

      const newValues = Object.keys(normalizedResponse).reduce((total, acc) => {
        total.push({
          name: acc,
          data: normalizedResponse[acc],
        })
        return total
      }, [])

      setBuckets(newValues)
    }
  }, [response])

  return (
    <>
      <Card>
        <Spin spinning={isLoading}>
          <Row>
            <Col span={24}>
              <Space>
                <RangePicker
                  value={[startDate, endDate]}
                  onChange={handleChangeDates}
                  disabled={timeFrame !== 'custom'}
                />
                <Select
                  defaultValue={timeFrame}
                  onChange={handleChangeTimeFrame}
                  style={{ minWidth: 200 }}>
                  {Object.keys(timeframes).map((timeFrameKey) => {
                    return (
                      <Option value={timeFrameKey}>
                        {timeframes[timeFrameKey]}
                      </Option>
                    )
                  })}
                </Select>
                <Select defaultValue={bucket} onChange={handleChangeBucket}>
                  <Option value={null}>None</Option>
                  <Option disabled={timeFrame === '0'} value="hour">
                    Hourly
                  </Option>
                  <Option value="daily">Daily</Option>
                  <Option value="monthly">Monthly</Option>
                </Select>
              </Space>
            </Col>
            <br />
            <Col span={24}>
              <Title level={3}>Count: {response && response.count}</Title>
            </Col>
            <br />
            <Col span={24}>
              {timeFrame !== "0" && bucket && (
                <ColumnChart
                  highcharts={Highcharts}
                  options={ColumnChartConfig(buckets) || {}}
                />
              )}
            </Col>
          </Row>
        </Spin>
      </Card>
      <section style={{ padding: '2rem' }}>
        <Row gutter={20}>
          <Col span={8}>
            <TopOses />
          </Col>
          <Col span={8}>
            <AgentNames />
          </Col>
          <Col span={8}>
            <TopDevices />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <TopDeviceBrands />
          </Col>
          <Col span={12}>
            <TopDeviceNames />
          </Col>
        </Row>
      </section>
    </>
  )
}
export default LinkDetail
