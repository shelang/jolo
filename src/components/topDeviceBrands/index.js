import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts'
import Chart from 'highcharts-react-official'
import funnel from 'highcharts/modules/funnel.js'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { AppCard } from '../appCard'
import { PyramidChartConfig } from '../../lib/PyramidChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

funnel(Highcharts)

const TopDeviceBrands = ({ queryParams }) => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_DEVICE_BRANDS, linkId, queryParams)
    await doFetch({
      url: URL,
      method: 'GET',
    })
  }

  useEffect(() => {
    if (Object.keys(queryParams).length) {
      fetchLinks()
    }
  }, [queryParams.from, queryParams.to])

  return (
    <AppCard noPadding title="Top Device Brands">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <Chart
                highcharts={Highcharts}
                options={response?.data ? PyramidChartConfig(response) : {}}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceBrands
