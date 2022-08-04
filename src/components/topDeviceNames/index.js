import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import Chart from 'highcharts-react-official'
import addTreemapModule from 'highcharts/modules/treemap'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'

import { TreemapChartConfig } from '../../lib/TreemapChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

addTreemapModule(Highcharts)

const TopDeviceBrands = ({ queryParams }) => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_DEVICE_NAMES, linkId, queryParams)

    await doFetch({
      url: URL,
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])
  useEffect(() => {
    if (Object.keys(queryParams).length) {
      fetchLinks()
    }
  }, [queryParams.from, queryParams.to])

  return (
    <AppCard noPadding title="Top Device Names">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <Chart
                highcharts={Highcharts}
                options={response?.data ? TreemapChartConfig(response) : {}}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceBrands
