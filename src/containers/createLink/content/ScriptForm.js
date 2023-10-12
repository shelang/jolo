import React, { useCallback } from 'react'
import { debounce } from 'lodash'
import { Card, Tooltip, Button, Switch } from 'antd'
import { tooltips } from '../../../utils/constants'
import { ScriptSection } from '../../../components/createLinkScript'
import useFetch from '../../../hooks/asyncAction'

export const ScriptForm = ({ onSelectedScript }) => {
  const [scriptData, fetchScripts] = useFetch()

  const searchScript = async (searchText) => {
    try {
      await fetchScripts({
        url: `script/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  const handler = useCallback(debounce(searchScript, 600), [])

  const onSearch = (searchText) => {
    handler(searchText)
  }

  return (
    <>
      {' '}
      <ScriptSection
        onScriptData={scriptData}
        onSearch={onSearch}
        isLoading={scriptData?.isLoading}
        onSelectedScript={onSelectedScript}
      />
    </>
  )
}
