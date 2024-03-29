import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Divider, Space, Tooltip, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { tooltips } from '../../utils/constants'
import { ScriptModal } from './content/scriptModal'

const { Title } = Typography

export const ScriptSection = (props) => {
  const { onScriptData, onSearch, isLoading, onSelectedScript } = props

  const [scriptContent, setScriptContent] = useState('')
  const [scriptName, setScriptName] = useState('')
  const [scripts, setScripts] = useState([])
  const [selectedScript, setSelectedScript] = useState()
  const [scriptModalVisible, setScriptModalVisible] = useState(false)

  const [createScriptData, createScripts] = useFetch()

  const onSelect = (data) => {
    const selectedScript = scripts.filter((script) => script.value === data)[0]
    setSelectedScript(selectedScript)
    onSelectedScript(selectedScript)
  }
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

  useEffect(() => {
    if (onScriptData.response) {
      const normalizedScripts = onScriptData.response.scripts.reduce(
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
  }, [onScriptData.response])

  return (
    <>
      <ScriptModal
        onScriptModalVisible={scriptModalVisible}
        onScriptName={scriptName}
        onScriptContent={scriptContent}
        onChangeScriptName={(e) => {
          setScriptName(e.target.value)
        }}
        onChangeScriptContent={(e) => {
          setScriptContent(e.target.value)
        }}
        onIsLoading={isLoading}
        onCreateNewScript={createNewScript}
        onCancel={() => setScriptModalVisible(false)}
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
      <Space>
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{ width: 300 }}
          options={scripts}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="Search Scripts"
          value={selectedScript ? selectedScript.label : undefined}
        />

        <Button
          type="primary"
          style={{ width: 140 }}
          onClick={() => setScriptModalVisible(true)}>
          Add Script
        </Button>
      </Space>
    </>
  )
}
