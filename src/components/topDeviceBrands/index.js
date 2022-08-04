import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import TreemapChart from 'highcharts-react-official'
import addTreemapModule from 'highcharts/modules/treemap'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { TreemapChartConfig } from '../../lib/TreemapChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

addTreemapModule(Highcharts)

const TopDeviceBrands = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_DEVICE_BRANDS, linkId)
    await doFetch({
      url: URL,
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <AppCard noPadding title="Top Device Brands">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <TreemapChart
                highcharts={Highcharts}
                options={response ? TreemapChartConfig(response) : null}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceBrands
