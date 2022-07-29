import React from 'react'
import Highcharts from 'highcharts/highstock'
import PieChart from 'highcharts-react-official'
import { Card, Spin, Typography } from 'antd'

const { Title } = Typography

const DashboardCard = ({ props }) => {
  const { title, isLoading, options, error } = props

  return (
    <div>
      <Title level={5} className="cardTitle">
        {title}
      </Title>
      <Card className="cardBody">
        <Spin spinning={isLoading}>
          <PieChart highcharts={Highcharts} options={options} />
        </Spin>
      </Card>
    </div>
  )
}

export default DashboardCard
