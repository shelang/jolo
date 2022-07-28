import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { Spin, Card, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts)

const { Title } = Typography

const TopOses = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/oses',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const series = response
    ? response.data.map((item) => {
        return {
          name: item.key,
          data: [{ value: Number(item.value) }],
        }
      })
    : []

  const options = {
    colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],

    chart: {
      type: 'packedbubble',
      height: '100%',
    },

    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>',
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      packedbubble: {
        minSize: '30%',
        maxSize: '80%',
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
          splitSeries: false,
          seriesInteraction: true,
          dragBetweenSeries: true,
        },
        dataLabels: {
          enabled: true,
          format: '{series.name}',

          style: {
            color: '#a5a5a5',
            fontFamily: 'Verdana',
            fill: '#a5a5a5',
            letterSpacing: '1px',
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: series,
  }

  return (
    <div style={{ height: '100%' }}>
      <Title level={5} style={{ marginBottom: 4 }}>
        Top Operation Systems
      </Title>
      <Card style={{ width: '100%', borderRadius: 8 }}>
        <Spin spinning={isLoading}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={'chart'}
          />
        </Spin>
      </Card>
    </div>
  )
}

export default TopOses
