import React, { useState } from 'react'
import moment from 'moment'
import { DatePicker, Select, Space } from 'antd'
import { timeframes } from '../../utils/constants'
import { AppCard } from '../appCard'
import './style.scss'

const { RangePicker } = DatePicker
const { Option } = Select

export const SubBar = ({ onChange, hasBucket = false }) => {
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())
  const [timeFrame, setTimeFrame] = useState('0')
  const [bucket, setBucket] = useState(null)

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
    onChange(
      {
        from: startDate.utc().set({ hour: 0, minute: 0, second: 0 }).format(),
        to: endDate.utc().set({ hour: 0, minute: 0, second: 0 }).format(),
      },
      hasBucket ? bucket : null,
    )
  }
  const handleChangeDates = (dates, datesString) => {
    setStartDate(dates[0])
    setEndDate(dates[1])
    onChange(
      {
        from: dates[0].format('YYYY-MM-DD'),
        to: dates[1].format('YYYY-MM-DD'),
      },
      hasBucket ? bucket : null,
    )
  }
  const handleChangeBucket = (value) => {
    setBucket(value)

    onChange(
      {
        from: startDate.format('YYYY-MM-DD'),
        to: endDate.format('YYYY-MM-DD'),
      },
      value,
    )
  }

  return (
    <AppCard>
      <Space>
        <Space>
          <span className="title">Date Range:</span>
          <RangePicker
            value={[startDate, endDate]}
            onChange={handleChangeDates}
            disabled={timeFrame !== 'custom'}
          />
        </Space>
        <Space>
          <span className="title">Time Frame:</span>
          <Select
            defaultValue={timeFrame}
            onChange={handleChangeTimeFrame}
            style={{ minWidth: 200 }}>
            {Object.keys(timeframes).map((timeFrameKey) => {
              return (
                <Option value={timeFrameKey}>{timeframes[timeFrameKey]}</Option>
              )
            })}
          </Select>
        </Space>
        {hasBucket && (
          <Space>
            <span className="title">Periodical:</span>
            <Select defaultValue={bucket} onChange={handleChangeBucket}>
              <Option value={null}>None</Option>
              <Option disabled={timeFrame === '0'} value="hour">
                Hourly
              </Option>
              <Option value="daily">Daily</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          </Space>
        )}
      </Space>
    </AppCard>
  )
}
