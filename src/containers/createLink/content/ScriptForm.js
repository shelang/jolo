import React, { useCallback } from 'react'
import { debounce } from 'lodash'
import { Card, Tooltip, Button, Switch } from 'antd'
import { tooltips } from '../../../utils/constants'
import { ScriptSection } from '../../../components/createLinkScript'
import useFetch from '../../../hooks/asyncAction'

export const ScriptForm = ({ Form, iframe, setIframe, onSelectedScript }) => {
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
      <Form.Item
        label="URL Masking:"
        name="iframe"
        valuePropName="checked"
        className="urlMasking">
        <Tooltip
          className={'customTooltip'}
          placement="top"
          title={tooltips.urlMask}>
          <Button>?</Button>
        </Tooltip>
        <Switch checked={iframe} onChange={setIframe} />
      </Form.Item>
      {!iframe && (
        <ScriptSection
          onScriptData={scriptData}
          onSearch={onSearch}
          isLoading={scriptData?.isLoading}
          onSelectedScript={onSelectedScript}
        />
      )}
    </>
  )
}
