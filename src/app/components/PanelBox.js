import React from 'react'
import { Card } from 'antd'
import '../styles/panel-box.css'

const PanelBox = (props) => {

    return (
      <Card className={"panel-box " + props.className} title={props.title} bordered={false} bodyStyle={props.bodyStyle}>
        {props.children}
      </Card>
    )
  }

export default PanelBox
