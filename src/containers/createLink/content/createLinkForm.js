import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/asyncAction'
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Switch,
  Divider,
  Card,
  Space,
  Tooltip,
  Spin,
  AutoComplete,
  Slider,
} from 'antd'
import { redirectModes, linkStatus, tooltips } from '../../../utils/constants'
import TargetDevicesField from './targetDevicesField'
import OsTargetField from './osTargetField'
import RetargetScript from './retargetScript'
import RetargetWebhook from './retargetWebhook'
const marks = {
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
}
const labelCol = {
  lg: { span: 4 },
  md: { span: 12 },
  sm: { span: 24 },
  xs: { span: 24 },
}
const wrapperCol = {
  lg: { span: 12 },
  md: { span: 12 },
  sm: { span: 24 },
  xs: { span: 24 },
}

const CreateLinkForm = ({
  onFinish,
  onFinishFailed,
  isLoading,
  setWebhookModalVisible,
  selectedWebhook,
  linkData,
  setIframe,
  iframe,
  setScriptModalVisible,
  setSelectedScript,
  setSelectedWebhook,
  selectedScript,
}) => {
  const [hash, setHash] = useState(false)
  const [selectedOs, setSelectedOs] = useState({})
  const [selectedDevices, setSelectedDevices] = useState({})
  const [scripts, setScripts] = useState([])
  const [webhooks, setWebhooks] = useState([])
  const [scriptData, fetchScripts] = useFetch()
  const [webhookData, fetchWebhooks] = useFetch()

  const [form] = Form.useForm()
  const { Title, Link } = Typography
  const { TextArea, Search } = Input

  useEffect(() => {
    if (linkData.response) {
      if (linkData.response.scriptId) {
        onSearch('')
        setSelectedScript({
          value: linkData.response.scriptId,
          label: linkData.response.scriptId,
        })
      }
      const newValues = {
        ...linkData.response,
        status: linkData.response === 0 ? 'INACTIVE' : 'ACTIVE',
      }
      form.setFieldsValue(newValues)
    }
  }, [linkData.response])

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
    if (webhookData.response) {
      const normalizedScripts = webhookData.response.webhooks.reduce(
        (total, acc) => {
          total.push({
            label: acc.name,
            value: acc.id,
          })
          return total
        },
        [],
      )
      setWebhooks(normalizedScripts)
    }
  }, [scriptData.response])

  const onFieldsChange = (changedFields) => {
    console.log(changedFields, 'saggg')
    if (changedFields[0].name[0] + changedFields[0].name[2] === 'devicestype') {
      setSelectedDevices({
        ...selectedDevices,
        [changedFields[0].name[1]]: changedFields[0].value,
      })
    }
    if (changedFields[0].name[0] + changedFields[0].name[2] === 'ostype') {
      setSelectedOs({
        ...selectedOs,
        [changedFields[0].name[1]]: changedFields[0].value,
      })
    }
  }
  const onSearch = async (searchText) => {
    try {
      await fetchScripts({
        url: `script/?name=${searchText}`,
        method: 'GET',
      })
      await fetchWebhooks({
        url: `webhook/?name=${searchText}`,
        method: 'GET',
      })
    } catch (e) {}
  }

  const onSelect = (data) => {
    console.log('onSelect', data)
    setSelectedScript(scripts.filter((script) => script.value === data)[0])
    setSelectedWebhook(webhooks.filter((webhook) => webhook.value === data)[0])
  }

  return (
    <Spin spinning={linkData.isLoading}>
      <Form
        form={form}
        scrollToFirstError
        labelAlign="left"
        name="create link"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={onFieldsChange}
        initialValues={
          linkData.response
            ? linkData.response
            : { status: 'ACTIVE', redirectCode: 301, hashLength: 6 }
        }>
        <Form.Item
          label="Friendly Name:"
          name="title"
          tooltip={tooltips.friendlyName}
          rules={[
            {
              required: true,
              message: 'Please input your Title!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Destination URL:"
          name="url"
          tooltip={tooltips.destinationUrl}
          rules={[
            {
              required: true,
              message: 'Please input your URL!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: false,
              message: 'Please input your Status!',
            },
          ]}>
          <Select>
            {Object.keys(linkStatus).map((key) => {
              return (
                <Select.Option value={linkStatus[key]}>{key}</Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Redirect Mode:"
          name="redirectCode"
          tooltip={tooltips.redirectMode}
          rules={[
            {
              required: false,
              message: 'Please input your Redirect Mode!',
            },
          ]}>
          <Select>
            {redirectModes.map((redirectMode) => {
              return (
                <Select.Option value={redirectMode}>
                  {redirectMode}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Expiration Date:"
          name="expireAt"
          tooltip={tooltips.expirationDate}
          rules={[
            {
              required: false,
              message: 'Please input your Expire Date!',
            },
          ]}>
          <DatePicker showTime={{ format: 'HH:mm' }} showNow={false} />
        </Form.Item>
        <Form.Item
          label="Note:"
          name="description"
          tooltip={tooltips.note}
          rules={[
            {
              required: false,
              message: 'Please input your Description!',
            },
          ]}>
          <TextArea maxLength={255} autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        <Form.Item label={hash ? 'Hash Url' : 'Hash Length'}>
          <Switch checked={hash} onChange={setHash} />
        </Form.Item>
        <Form.Item
          name={hash ? 'hash' : 'hashLength'}
          tooltip={tooltips.hashUrl}>
          {hash ? (
            <Input placeholder="Hash Url" />
          ) : (
            <Slider defaultValue={6} min={5} max={12} marks={marks} step={1} />
          )}
        </Form.Item>

        <Form.Item
          label="Forward Parameters:"
          name="forwardParameter"
          tooltip={tooltips.forwardParameters}
          valuePropName="checked">
          <Switch />
        </Form.Item>

        <Row>
          <Col md={16} xs={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <TargetDevicesField
                selectedDevices={selectedDevices}
                setSelectedDevices={setSelectedDevices}
              />

              <OsTargetField
                setSelectedOs={setSelectedOs}
                selectedOs={selectedOs}
              />
            </Space>
          </Col>
        </Row>
        <Card>
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
            <>
              <RetargetScript
                selectedScript={selectedScript}
                scripts={scripts}
                onSelect={onSelect}
                onSearch={onSearch}
              />
              <Divider />
              <Space direction="vertical">
                <Button
                  type="primary"
                  onClick={() => setScriptModalVisible(true)}>
                  add script
                </Button>
              </Space>
            </>
          )}
        </Card>

        <Card>
          {!iframe && (
            <>
              {/* <RetargetingWebhook
                webhooks={webhooks}
                selectedWebhook={selectedWebhook}
                onSelect={onSelect}
                onSearch={onSearch}
              /> */}

              <RetargetWebhook
                webhooks={webhooks}
                selectedWebhook={selectedWebhook}
                onSelect={onSelect}
                onSearch={onSearch}
              />
              <Divider />
              <Space direction="vertical">
                <Button
                  type="primary"
                  onClick={() => setWebhookModalVisible(true)}>
                  Add WebHook
                </Button>
              </Space>
            </>
          )}
        </Card>

        <br />
        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default CreateLinkForm
