import React from 'react'
import { Typography, Button, Tooltip } from 'antd'
import { tooltips } from '../../../utils/constants'

const { Title, AutoComplete } = Typography
const RetargetingWebhook = ({
  selectedWebhook,
  webhooks,
  onSearch,
  onSelect,
}) => {
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
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={webhooks}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Search Webhook"
        value={selectedWebhook ? selectedWebhook.label : undefined}
      />
    </>
  )
}

export default RetargetingWebhook
