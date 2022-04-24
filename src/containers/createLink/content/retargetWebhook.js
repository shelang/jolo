import { AutoComplete, Button, Tooltip, Typography } from 'antd'
import React from 'react'
import { tooltips } from '../../../utils/constants'

const RetargetWebhook = ({ selectedWebhook, onSearch, onSelect, webhooks }) => {
  const { Title } = Typography

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

export default RetargetWebhook
