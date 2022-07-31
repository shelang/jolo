import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Divider, Space, Tooltip, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { tooltips } from '../../utils/constants'

const { Title } = Typography

const WebhookSection = () => {
  const [webhooks, setWebhooks] = useState([])
  const [selectedWebhook, setSelectedWebhook] = useState()
  const [webhookModalVisible, setWebhookModalVisible] = useState(false)

  const [webhookData, fetchWebhooks] = useFetch()

  const onSelect = (data) => {
    console.log('onSelect', data)
    setSelectedWebhook(webhooks.filter((webhook) => webhook.value === data)[0])
  }
  const onSearch = async (searchText) => {
    try {
      await fetchWebhooks({
        url: `webhook/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  useEffect(() => {
    if (webhookData.response) {
      const normalizedScripts = webhookData.response.webhooks.reduce(
        (total, acc) => {
          total.push({
            label: acc.name,
            value: acc.id,
          })
          return total
        },
        [],
      )
      setWebhooks(normalizedScripts)
    }
  }, [webhookData.response])

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
      <Divider />
      <Space direction="vertical">
        <Button type="primary" onClick={() => setWebhookModalVisible(true)}>
          Add WebHook
        </Button>
      </Space>
    </>
  )
}

export default WebhookSection
