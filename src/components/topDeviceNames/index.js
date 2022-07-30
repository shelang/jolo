import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import AppCard from '../appCard'
import { Spin } from 'antd'
import { ChartConfig } from './config'

const TopDeviceNames = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/device-brands',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <AppCard title="Top Device Names">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <ColumnChart
                highcharts={Highcharts}
                options={response ? ChartConfig(response) : null}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceNames
