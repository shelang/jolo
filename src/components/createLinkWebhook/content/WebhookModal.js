import React from 'react'
import { Button, Input, Modal, Space } from 'antd'
const { TextArea } = Input

export const WebhookModal = (props) => {
  const {
    onIsLoading,
    onwebhookModalVisible,
    onCancel,
    onWebhookName,
    onChangeWebhookName,
    onWebhookUrl,
    onChengeWebhookUrl,
    onCreateNewWebhook,
  } = props
  
  return (
    <Modal
      title="Create Webhook"
      visible={onwebhookModalVisible}
      onCancel={onCancel}
      footer={null}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Webhook Name"
          style={{ width: '100%' }}
          value={onWebhookName}
          onChange={onChangeWebhookName}
        />
        <TextArea
          placeholder="Webhook URL"
          style={{ width: '100%' }}
          rows={4}
          value={onWebhookUrl}
          onChange={onChengeWebhookUrl}
        />
        <Button
          loading={onIsLoading}
          type="primary"
          onClick={onCreateNewWebhook}>
          Submit
        </Button>
      </Space>
    </Modal>
  )
}
