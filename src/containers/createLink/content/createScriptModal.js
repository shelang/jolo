import React, { useState } from 'react'
import { Button, Input, Modal, Space } from 'antd'
import useFetch from '../../../hooks/asyncAction'

const CreateScriptModal = ({ scriptModalVisible, setScriptModalVisible }) => {
  const [scriptContent, setScriptContent] = useState('')
  const [scriptName, setScriptName] = useState('')

  const { TextArea } = Input
  const [{ isLoading }, createScripts] = useFetch()

  const createNewScript = async () => {
    try {
      await createScripts({
        url: 'script',
        method: 'POST',
        data: {
          name: scriptName, // script name, useful for searching in UI
          timeout: 180000, // timeout that after that user will be redirected to next page
          content: scriptContent, // js script that should be load on the page
        },
      })
      setScriptModalVisible(false)
    } catch (e) {
    } finally {
    }
  }
  return (
    <Modal
      title="Create Script"
      visible={scriptModalVisible}
      onCancel={() => setScriptModalVisible(false)}
      footer={null}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Script Name"
          style={{ width: '100%' }}
          value={scriptName}
          onChange={(e) => {
            setScriptName(e.target.value)
          }}
        />
        <TextArea
          placeholder="Script Content"
          style={{ width: '100%' }}
          rows={4}
          value={scriptContent}
          onChange={(e) => {
            setScriptContent(e.target.value)
          }}
        />
        <Button loading={isLoading} type="primary" onClick={createNewScript}>
          Submit
        </Button>
      </Space>
    </Modal>
  )
}

export default CreateScriptModal
