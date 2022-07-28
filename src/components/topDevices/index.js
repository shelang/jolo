import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { Spin, Card, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'

const { Title } = Typography

const TopDevices = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/devices',
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
    <div style={{ height: '100%' }}>
      <Title level={5} style={{ marginBottom: 4 }}>
        Top Devices
      </Title>
      <Card style={{ width: '100%', borderRadius: 8 }}>
        <Spin spinning={isLoading}>
          <PieChart highcharts={Highcharts} options={options} />
        </Spin>
      </Card>
    </div>
  )
}

export default TopDevices
