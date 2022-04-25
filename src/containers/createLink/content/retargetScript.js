import React from 'react'
import { Button, Form, Select, Tooltip, Typography } from 'antd'
import { tooltips } from '../../../utils/constants'

const RetargetScript = ({ scripts, handleSearch }) => {
  const { Title } = Typography

  const options = scripts.map((script) => (
    <Select.Option key={script.value} value={script.value}>
      {script.label}
    </Select.Option>
  ))

  return (
    <>
      <Title level={3}>
        Retargeting codes
        <Tooltip
          className={'customTooltip'}
          placement="top"
          title={tooltips.textTargeting}>
          <Button>?</Button>
        </Tooltip>
      </Title>
      <Form.Item name="ScriptId">
        <Select showSearch onSearch={handleSearch} filterOption={false}>
          {options}
        </Select>
      </Form.Item>
    </>
  )
}

export default RetargetScript
