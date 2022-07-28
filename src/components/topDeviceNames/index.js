import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import BarChart from 'highcharts-react-official'
import { Spin, Card, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'

const { Title } = Typography

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
    <div style={{ height: '100%' }}>
      <Title level={5} style={{ marginBottom: 4 }}>
        Top Device Names
      </Title>
      <Card style={{ width: '100%', borderRadius: 8 }}>
        <Spin spinning={isLoading}>
          <BarChart highcharts={Highcharts} options={options} />
        </Spin>
      </Card>
    </div>
  )
}

export default TopDeviceNames
