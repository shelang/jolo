import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts/highstock'
import ColumnChart from 'highcharts-react-official'
import AppCard from '../appCard'
import { Spin } from 'antd'

const TopDeviceNames = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/device-brands',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
    if (response) {
      console.log(response.data)
    }
  }, [])

  const options = {
    colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],

    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: response
        ? response.data.map((item) => {
            return item.key
          })
        : [],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>',
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            color: '#a5a5a5',
            fontFamily: 'Verdana',
            fill: '#a5a5a5',
            letterSpacing: '1px',
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: {
      colorByPoint: response ? true : null,
      data: response
        ? response.data.map((item) => {
            return {
              name: item.key,
              y: Number(item.value),
            }
          })
        : [],
    },
  }

  return (
    <AppCard title="Top Device Names">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || <ColumnChart highcharts={Highcharts} options={options} />}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceNames
