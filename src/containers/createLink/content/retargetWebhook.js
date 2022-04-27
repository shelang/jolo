import { Button, Form, Select, Tooltip, Typography } from 'antd'
import React from 'react'
import { tooltips } from '../../../utils/constants'

const RetargetWebhook = ({ handleSearch, webhooks, isLoading }) => {
  const { Title } = Typography

  const options = webhooks.map((webhook) => (
    <Select.Option key={webhook.value} value={webhook.value}>
      {webhook.label}
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
      <Form.Item name="webhookId">
        <Select
          placeholder="Search Webhooks"
          loading={isLoading}
          allowClear
          showSearch
          onSearch={handleSearch}
          notFoundContent={null}
          filterOption={false}>
          {options}
        </Select>
      </Form.Item>
    </>
  )
}

export default RetargetWebhook
