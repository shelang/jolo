import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import useFetch from '../../hooks/asyncAction'
import DashboardCard from '../dashboardCard'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts)

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
    <DashboardCard
      props={{ title: 'Top Operation Systems', isLoading, options, error }}
    />
  )
}

export default TopOses
