import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import Chart from 'highcharts-react-official'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { PieChartConfig } from '../../lib/PieChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts)

const TopOses = ({ queryParams }) => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_OSES, linkId, queryParams)
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
    <AppCard noPadding title="Top Operation Systems">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <Chart
                highcharts={Highcharts}
                options={response?.data ? PieChartConfig(response) : {}}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopOses
