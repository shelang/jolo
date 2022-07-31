import React from 'react'
import { Typography, Card } from 'antd'
import './style.scss'

const { Title } = Typography

export const AppCard = ({ children, title }) => {
  return (
    <div>
      <Title level={5} className="cardTitle">
        {title}
      </Title>
      <Card className="cardBody">{children}</Card>
    </div>
  )
}
