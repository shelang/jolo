import React, { useState } from 'react'
import { Button, Input, Modal, Space } from 'antd'
import useFetch from '../../../hooks/asyncAction'

const CreateWebHookModal = ({
  setWebhookModalVisible,
  webhookModalVisible,
  isLoading,
}) => {
  const [createWebhookData, createWebhook] = useFetch()

  const [webhookName, setWebhookName] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')

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

  const { TextArea } = Input
  return (
    <Modal
      title="Create Webhook"
      visible={webhookModalVisible}
      onCancel={() => setWebhookModalVisible(false)}
      footer={null}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Webhook Name"
          style={{ width: '100%' }}
          value={webhookName}
          onChange={(e) => {
            setWebhookName(e.target.value)
          }}
        />
        <TextArea
          placeholder="Webhook URL"
          style={{ width: '100%' }}
          rows={4}
          value={webhookUrl}
          onChange={(e) => {
            setWebhookUrl(e.target.value)
          }}
        />
        <Button loading={isLoading} type="primary" onClick={createNewWebhook}>
          Submit
        </Button>
      </Space>
    </Modal>
  )
}

export default CreateWebHookModal
