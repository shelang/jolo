import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import TreemapChart from 'highcharts-react-official'
import funnel from 'highcharts/modules/funnel.js'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'
import { PyramidChartConfig } from '../../lib/PyramidChartConfig'

funnel(Highcharts)

const TopDeviceBrands = () => {
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
    <AppCard noPadding title="Top Device Names">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <TreemapChart
                highcharts={Highcharts}
                options={response ? PyramidChartConfig(response) : {}}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceBrands
