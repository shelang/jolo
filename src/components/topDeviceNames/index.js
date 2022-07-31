import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import AppCard from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { ColumnChartConfig } from '../../lib/ColumnChartConfig'
import { Spin } from 'antd'

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
                options={response ? ColumnChartConfig(response) : {}}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceNames
