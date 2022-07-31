import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { Spin } from 'antd'
import AppCard from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { PieChartConfig } from '../../lib/PieChartConfig'
import { makingUrl } from '../../utils/makingUrl'

const AgentNames = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()
  
  const fetchLinks = async () => {
    const linkedId = params.id
    const URL = makingUrl('AgentNames', linkedId)
    await doFetch({
      url: URL,
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
                options={response ? PieChartConfig(response) : null}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default AgentNames
