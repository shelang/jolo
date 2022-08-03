import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Divider, Space, Tooltip, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { tooltips } from '../../utils/constants'
import { WebhookModal } from './content/webhookModal'

const { Title } = Typography

const WebhookSection = (props) => {
  const { webhookData, onSearch, isLoading, onSelectedWebhook } = props

  const [webhooks, setWebhooks] = useState([])
  const [webhookName, setWebhookName] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [selectedWebhook, setSelectedWebhook] = useState()
  const [webhookModalVisible, setWebhookModalVisible] = useState(false)

  const [createWebhookData, createWebhook] = useFetch()

  const onSelect = (data) => {
    const selectedWebhook = webhooks.filter(
      (webhook) => webhook.value === data,
    )[0]
    setSelectedWebhook(selectedWebhook)
    onSelectedWebhook(selectedWebhook)
  }

  const createNewWebhook = async () => {
    try {
      await createWebhook({
        url: 'webhook',
        method: 'POST',
        data: {
          name: webhookName,
          url: webhookUrl,
        },
      })
      setWebhookModalVisible(false)
    } catch (e) {
    } finally {
    }
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
      <WebhookModal
        onIsLoading={isLoading}
        onwebhookModalVisible={webhookModalVisible}
        onCancel={() => setWebhookModalVisible(false)}
        onWebhookName={webhookName}
        onChangeWebhookName={(e) => {
          setWebhookName(e.target.value)
        }}
        onWebhookUrl={webhookUrl}
        onChengeWebhookUrl={(e) => {
          setWebhookUrl(e.target.value)
        }}
        onCreateNewWebhook={createNewWebhook}
      />
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
