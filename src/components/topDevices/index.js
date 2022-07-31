import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import AppCard from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { PieChartConfig } from '../../lib/PieChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

const TopDevices = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_DEVICES, linkId)
    await doFetch({
      url: URL,
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
