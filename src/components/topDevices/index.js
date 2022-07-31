import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import AppCard from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { PieChartConfig } from '../../lib/PieChartConfig'
import { Spin } from 'antd'

const TopDevices = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/devices',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <AppCard title="Top Devices">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <PieChart
                highcharts={Highcharts}
                options={response ? PieChartConfig(response) : null}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDevices
