import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Divider, Space, Tooltip, Typography } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { tooltips } from '../../utils/constants'

const { Title } = Typography

const ScriptSection = () => {
  const [scripts, setScripts] = useState([])
  const [selectedScript, setSelectedScript] = useState()
  const [scriptModalVisible, setScriptModalVisible] = useState(false)

  const [scriptData, fetchScripts] = useFetch()

  const onSelect = (data) => {
    console.log('onSelect', data)
    setSelectedScript(scripts.filter((script) => script.value === data)[0])
  }
  const onSearch = async (searchText) => {
    try {
      await fetchScripts({
        url: `script/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

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

  return (
    <>
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
