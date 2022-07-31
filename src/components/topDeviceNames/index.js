import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import AppCard from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { ColumnChartConfig } from '../../lib/ColumnChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

const TopDeviceNames = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_DEVICE_NAMES, linkId)
    await doFetch({
      url: URL,
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
