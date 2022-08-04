import React from 'react'
import { Card } from 'antd'
import './style.scss'

export const AppCard = ({ children, title, noPadding }) => {
  return (
    <>
      {title && <p className="cardTitle">{title}</p>}
      <Card
        bodyStyle={{ padding: noPadding ? 4 : 24, width: '100%' }}
        className="cardBody">
        {children}
      </Card>
    </>
  )
}
