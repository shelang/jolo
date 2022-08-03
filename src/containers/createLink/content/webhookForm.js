import React, { useCallback } from 'react'
import { debounce } from 'lodash'
import { Card, Tooltip, Button, Switch } from 'antd'
import { tooltips } from '../../../utils/constants'
import WebhookSection from '../../../components/createLinkWebhook'
import useFetch from '../../../hooks/asyncAction'

export const WebhookForm = ({ Form, iframe, setIframe, onSelectedWebhook }) => {
  const [webhookData, fetchWebhook] = useFetch()

  const searchWebhook = async (searchText) => {
    try {
      await fetchWebhook({
        url: `webhook/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  const handler = useCallback(debounce(searchWebhook, 600), [])

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
        <WebhookSection
          webhookData={webhookData}
          onSearch={onSearch}
          isLoading={webhookData.isLoading}
          onSelectedWebhook={onSelectedWebhook}
        />
      )}
    </>
  )
}
