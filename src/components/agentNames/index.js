import React, { useEffect } from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { Spin, Card, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'

const { Title } = Typography

const AgentNames = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/top/agent-names',
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const options = {
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
            color: 'black',
          },
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: '',
        color: '#006600',
        lineWidth: 1,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 3,
          states: {
            hover: {
              enabled: true,
              lineWidth: 1,
            },
          },
        },
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
        Top Agent Names
      </Title>
      <Card
        style={{ width: '100%', borderRadius: 4, padding: 2, height: '100%' }}>
        <Spin spinning={isLoading}>
          <PieChart highcharts={Highcharts} options={options} />
        </Spin>
      </Card>
    </div>
  )
}

export default AgentNames
