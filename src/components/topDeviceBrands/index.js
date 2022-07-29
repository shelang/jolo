import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import AppCard from '../appCard'
import { Spin } from 'antd'

const TopDeviceBrands = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/device-brands',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const options = {
    colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
      },
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        size: '60%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          alignTo: 'connectors',
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: '#a5a5a5',
            fontFamily: 'Verdana',
            fill: '#a5a5a5',
            letterSpacing: '1px',
          },
        },
        showInLegend: false,
      },
    },
    series: [
      {
        innerSize: '30%',
        data: response
          ? response.data.map((item) => {
              return { name: item.key, y: Number(item.value) }
            })
          : [],
      },
    ],
  }

  return (
    <AppCard title="Top Device Brands">
      <Spin spinning={isLoading}>
        {error
          ? 'There is something wrong, please try again later'
          : null || <PieChart highcharts={Highcharts} options={options} />}
      </Spin>
    </AppCard>
  )
}

export default TopDeviceBrands
