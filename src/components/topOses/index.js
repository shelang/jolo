import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import useFetch from '../../hooks/asyncAction'
import Chart from 'highcharts-react-official'
import AppCard from '../appCard'
import { Spin } from 'antd'
import ChartConfig from './config'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts)

const TopOses = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/oses',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <AppCard title="Top Operation Systems">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || <Chart highcharts={Highcharts} options={response ? ChartConfig(response) : null} />}
      </Spin>
    </AppCard>
  )
}

export default TopOses
