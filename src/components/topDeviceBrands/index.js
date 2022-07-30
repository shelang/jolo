import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import AppCard from '../appCard'
import { Spin } from 'antd'
import { PieChartConfig } from '../../lib/pieChartConfig'

const TopDeviceBrands = () => {
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

  const options = PieChartConfig(response?.data ?? [])

  return (
    <AppCard title="Top Device Brands">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || <PieChart highcharts={Highcharts} options={options} />}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceBrands
