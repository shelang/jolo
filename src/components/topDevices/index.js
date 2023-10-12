import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'
import { SemiPieChartConfig } from '../../lib/SemiPieChartConfig'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'

const TopDevices = ({ queryParams }) => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkId = params.id
    const URL = makingUrl(apiRoutes.TOP_DEVICES, linkId, queryParams)
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
    <AppCard noPadding title="Top Devices">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || (
              <PieChart
                highcharts={Highcharts}
                options={response?.data ? SemiPieChartConfig(response) : {}}
              />
            )}
      </Spin>
    </AppCard>
  )
}

export default TopDevices
