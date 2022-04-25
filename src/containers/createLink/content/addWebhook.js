import { Button, Card, Divider, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import useFetch from '../../../hooks/asyncAction'
import CreateWebHookModal from './createWebHookModal'
import RetargetWebhook from './retargetWebhook'

const AddWebhook = ({ selectedWebhook }) => {
  const [webhookModalVisible, setWebhookModalVisible] = useState(false)

  const [webhooks, setWebhooks] = useState([])

  const [{ response, isLoading, error }, doFetch] = useFetch()

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

  useEffect(() => {
    const getWebhookAdded = async () => {
      await fetchWebhooks({
        url: `webhook`,
        method: 'GET',
      })
      setWebhooks(webhookData)
    }
    getWebhookAdded()
  }, [selectedWebhook])

  const handleSearch = async (searchText) => {
    try {
      await fetchWebhooks({
        url: `webhook/?name=${searchText}`,
        method: 'GET',
      })
      setWebhooks()
    } catch (e) {}
  }

  return (
    <>
      <Card>
        <RetargetWebhook
          webhooks={webhooks}
          setWebhooks={setWebhooks}
          handleSearch={handleSearch}
          selectedWebhook={selectedWebhook}
        />
        <Divider />

        <Space direction="vertical">
          <Button type="primary" onClick={() => setWebhookModalVisible(true)}>
            Add WebHook
          </Button>
        </Space>
      </Card>

      <CreateWebHookModal
        webhookData={webhookData}
        isLoading={isLoading}
        webhookModalVisible={webhookModalVisible}
        setWebhookModalVisible={setWebhookModalVisible}
      />
    </>
  )
}

export default AddWebhook
