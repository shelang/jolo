import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import DashboardCard from '../dashboardCard'

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
    <DashboardCard
      props={{ title: 'Top Device Brands', isLoading, options, error }}
    />
  )
}

export default TopDeviceBrands
