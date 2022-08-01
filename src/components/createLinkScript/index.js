import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Divider, Space, Tooltip, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { tooltips } from '../../utils/constants'
import { ScriptModal } from './content/scriptModal'

const { Title } = Typography

const ScriptSection = (props) => {
  const { onScriptData, onSearch, onIsLoading } = props

  const [scriptContent, setScriptContent] = useState('')
  const [scriptName, setScriptName] = useState('')
  const [scripts, setScripts] = useState([])
  const [selectedScript, setSelectedScript] = useState()
  const [scriptModalVisible, setScriptModalVisible] = useState(false)

  const [createScriptData, createScripts] = useFetch()

  const onSelect = (data) => {
    console.log('onSelect', data)
    setSelectedScript(scripts.filter((script) => script.value === data)[0])
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
        onIsLoading={onIsLoading}
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
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={scripts}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Search Scripts"
        value={selectedScript ? selectedScript.label : undefined}
      />
      <Divider />
      <Space direction="vertical">
        <Button type="primary" onClick={() => setScriptModalVisible(true)}>
          add script
        </Button>
      </Space>
    </>
  )
}

export default ScriptSection
