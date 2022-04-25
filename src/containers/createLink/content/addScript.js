import React, { useState, useEffect } from 'react'
import { Button, Card, Divider, Space } from 'antd'
import useFetch from '../../../hooks/asyncAction'
import CreateScriptModal from './createScriptModal'
import RetargetScript from './retargetScript'

const AddScript = () => {
  const [scriptModalVisible, setScriptModalVisible] = useState(false)
  const [scripts, setScripts] = useState([])

  const [{ response, isLoading, error }, doFetch] = useFetch()

  const [scriptData, fetchScripts] = useFetch()

  useEffect(() => {
    if (scriptData.response) {
      const normalizedScripts = scriptData.response.scripts.reduce(
        (total, acc) => {
          total.push({
            label: acc.name,
            value: acc.id,
          })
          return total
        },
        [],
      )
      setScripts(normalizedScripts)
    }
  }, [scriptData.response])

  const handleSearch = async (searchText) => {
    try {
      await fetchScripts({
        url: `script/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  return (
    <>
      <Card>
        <RetargetScript scripts={scripts} handleSearch={handleSearch} />
        <Divider />
        <Space direction="vertical">
          <Button type="primary" onClick={() => setScriptModalVisible(true)}>
            add script
          </Button>
        </Space>
      </Card>
      <CreateScriptModal
        isLoading={isLoading}
        setScriptModalVisible={setScriptModalVisible}
        scriptModalVisible={scriptModalVisible}
      />
    </>
  )
}

export default AddScript
