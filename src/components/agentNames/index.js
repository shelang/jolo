import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import AppCard from '../appCard'
import { Spin } from 'antd'
import ChartConfig from './config'

const AgentNames = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/agent-names',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <AppCard title="Top Agent Names">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <PieChart
                highcharts={Highcharts}
                options={response ? ChartConfig(response) : null}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default AgentNames
