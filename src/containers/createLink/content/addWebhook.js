import { Button, Card, Divider, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import useFetch from '../../../hooks/asyncAction'
import CreateWebHookModal from './createWebHookModal'
import RetargetWebhook from './retargetWebhook'

const AddWebhook = () => {
  const [webhookModalVisible, setWebhookModalVisible] = useState(false)

  const [webhooks, setWebhooks] = useState([])

  const [webhookData, fetchWebhooks] = useFetch()

  useEffect(() => {
    if (webhookData.response) {
      const normalizedWebhooks = webhookData.response.webhooks.reduce(
        (total, acc) => {
          total.push({
            label: acc.name,
            value: acc.id,
          })
          return total
        },
        [],
      )
      setWebhooks(normalizedWebhooks)
    }
  }, [webhookData.response])

  const handleSearch = async (searchText) => {
    try {
      await fetchWebhooks({
        url: `webhook/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  return (
    <>
      <Card style={{ marginTop: '1rem' }}>
        <RetargetWebhook
          isLoading={webhookData.isLoading}
          webhooks={webhooks}
          handleSearch={handleSearch}
        />

        <Divider />

        <Space direction="vertical">
          <Button type="primary" onClick={() => setWebhookModalVisible(true)}>
            Add WebHook
          </Button>
        </Space>
      </Card>

      <CreateWebHookModal
        webhookModalVisible={webhookModalVisible}
        setWebhookModalVisible={setWebhookModalVisible}
      />
    </>
  )
}

export default AddWebhook
