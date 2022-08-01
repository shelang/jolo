import React from 'react'
import { Button, Input, Modal, Space } from 'antd'
const { TextArea } = Input

const ScriptModal = (props) => {
  const {
    onScriptModalVisible,
    onScriptName,
    onChangeScriptName,
    onScriptContent,
    onChangeScriptContent,
    onIsLoading,
    onCreateNewScript,
    onCancel,
  } = props

  return (
    <Modal
      title="Create Script"
      visible={onScriptModalVisible}
      onCancel={onCancel}
      footer={null}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Script Name"
          style={{ width: '100%' }}
          value={onScriptName}
          onChange={onChangeScriptName}
        />
        <TextArea
          placeholder="Script Content"
          style={{ width: '100%' }}
          rows={4}
          value={onScriptContent}
          onChange={onChangeScriptContent}
        />
        <Button
          loading={onIsLoading}
          type="primary"
          onClick={onCreateNewScript}>
          Submit
        </Button>
      </Space>
    </Modal>
  )
}

export default ScriptModal
