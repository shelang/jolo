import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { Spin, Card, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'

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

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: 'Top Oses',
      align: 'center',
      verticalAlign: 'middle',
      y: 60,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%',
      },
    },
    legend: {
      name: 'd',
    },
    series: [
      {
        type: 'pie',
        innerSize: '50%',
        data: response
          ? response.data.map((item) => {
              return { name: item.key, y: Number(item.value) }
            })
          : [],
        showInLegend: true,
        dataLabels: {
          enabled: true,
          distance: -25,
        },
      },
    ],
  }

  return (
    <div style={{ height: '100%' }}>
      <Title level={5} style={{ marginBottom: 4 }}>
        Top Operation Systems
      </Title>
      <Card style={{ width: '100%', borderRadius: 4 }}>
        <Spin spinning={isLoading}>
          <PieChart highcharts={Highcharts} options={options} />
        </Spin>
      </Card>
    </div>
  )
}

export default TopOses
