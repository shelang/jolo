import { AutoComplete, Button, Form, Select, Tooltip, Typography } from 'antd'
import React from 'react'
import useFetch from '../../../hooks/asyncAction'
import { tooltips } from '../../../utils/constants'

const RetargetWebhook = ({
  selectedWebhook,
  handleSearch,
  webhooks,
  setWebhook,
}) => {
  const { Title } = Typography

  console.log(webhooks)

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
      {/* 
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={webhooks}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Search Webhook"
        value={selectedWebhook ? selectedWebhook.label : undefined}
      /> */}
      <Form.Item name="WebhookId">
        <Select showSearch onSearch={handleSearch} filterOption={false}>
          {/* {webhooks.map((webhook) => (
            <Select.Option value={webhook.value}>{webhook.label}</Select.Option>
          ))} */}
          {options}
        </Select>
      </Form.Item>
    </>
  )
}

export default RetargetWebhook
