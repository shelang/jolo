import React, { useEffect, useState } from 'react'
import CreateLinkFromFile from './CreateLinkFromFile'
import {
  Row,
  Col,
  Input,
  Button,
  Select,
  Form,
  DatePicker,
  Switch,
  Collapse,
  Space,
  Tooltip,
  Slider,
  Typography,
  Spin,
  Divider,
} from 'antd'
import { redirectModes, linkStatus, tooltips } from '../../../utils/constants'
import { DeviceTargeting } from './DeviceTargeting'
import { OperationSystemTargeting } from './OperationSystemTargeting'
import { ScriptForm } from './ScriptForm'
import { WebhookForm } from './webhookForm'

import { AppCard } from '../../../components/appCard'
import { Sticky } from '../../../components/sticky'
import { parseCookies } from 'nookies'

const { TextArea } = Input
const { Title } = Typography

export const CreateLinkForm = ({
  isLoading,
  altTypesData,
  onFinishForm,
  initialValues,
  form,
}) => {
  const [hash, setHash] = useState(false)
  const [iframe, setIframe] = useState(false)
  const [selectedDevices, setSelectedDevices] = useState({})
  const [selectedOs, setSelectedOs] = useState({})
  const [selectedScript, setSelectedScript] = useState()
  const [selectedWebhook, setSelectedWebhook] = useState()

  const onFinish = async ({ iframe, ...values }) => {
    const cookies = parseCookies()

    const data = {
      ...values,
      workspaceId: cookies['x-wsid'],
      scriptId: selectedScript && selectedScript.value,
      type: iframe
        ? 'IFRAME'
        : selectedScript && selectedScript.value
        ? 'SCRIPT'
        : 'REDIRECT',
      webhookId: selectedWebhook && selectedWebhook.value,
    }
    onFinishForm(data)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onFieldsChange = (changedFields) => {
    if (changedFields[0].name[0] + changedFields[0].name[2] === 'deviceskey') {
      setSelectedDevices({
        ...selectedDevices,
        [changedFields[0].name[1]]: changedFields[0].value,
      })
    }
    if (changedFields[0].name[0] + changedFields[0].name[2] === 'oskey') {
      setSelectedOs({
        ...selectedOs,
        [changedFields[0].name[1]]: changedFields[0].value,
      })
    }
  }

  useEffect(() => {
    if (initialValues) {
      const { expireAt, webhookId, scriptId, ...values } = initialValues

      setSelectedScript({
        value: initialValues.scriptId,
        label: initialValues.scriptId,
      })
      setSelectedWebhook({
        value: initialValues.scriptId,
        label: initialValues.scriptId,
      })
      form.setFieldsValue(values)

      console.log(initialValues, 'initialValues')
    }
  }, [initialValues])

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
  const items = [
    {
      key: '1',
      label: 'Advance Setting',
      children: (
        <>
          <AppCard styles={{ marginBottom: 16 }}>
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
                {redirectModes.map((redirectMode, index) => {
                  return (
                    <Select.Option key={index} value={redirectMode}>
                      {redirectMode}
                    </Select.Option>
                  )
                })}
              </Select>
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
                <Slider min={5} max={12} marks={marks} step={1} />
              )}
            </Form.Item>

            <Form.Item
              label="Forward Parameters:"
              name="forwardParameter"
              tooltip={tooltips.forwardParameters}
              valuePropName="checked">
              <Switch />
            </Form.Item>
          </AppCard>

          <AppCard styles={{ marginBottom: 16 }}>
            <Row>
              <Col xs={24}>
                <Space
                  direction="vertical"
                  style={{ width: '100%' }}
                  split={<Divider />}>
                  <Spin spinning={altTypesData.isLoading}>
                    <DeviceTargeting
                      Form={Form}
                      devices={altTypesData.response?.devices ?? []}
                      selectedDevices={selectedDevices}
                      setSelectedDevices={setSelectedDevices}
                    />
                  </Spin>
                  <Spin spinning={altTypesData.isLoading}>
                    <OperationSystemTargeting
                      Form={Form}
                      oss={altTypesData.response?.os ?? []}
                      selectedOs={selectedOs}
                      setSelectedOs={setSelectedOs}
                    />
                  </Spin>
                </Space>
              </Col>
            </Row>
          </AppCard>

          <AppCard styles={{ marginBottom: 116 }}>
            <Row>
              <Col xs={24}>
                <Space
                  direction="vertical"
                  style={{ width: '100%' }}
                  split={<Divider />}>
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
                      <ScriptForm
                        Form={Form}
                        iframe={iframe}
                        setIframe={setIframe}
                        onSelectedScript={setSelectedScript}
                      />
                      <WebhookForm
                        Form={Form}
                        iframe={iframe}
                        setIframe={setIframe}
                        onSelectedWebhook={setSelectedWebhook}
                      />
                    </>
                  )}
                </Space>
              </Col>
            </Row>
          </AppCard>
        </>
      ),
    },
  ]

  return (
    <>
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
          Object.keys(initialValues).length
            ? initialValues
            : {
                status: 'ACTIVE',
                redirectCode: 301,
                hashLength: 6,
              }
        }>
        <Sticky topOffset={-16}>
          <FormHeader isLoading={isLoading} />
        </Sticky>

        <AppCard styles={{ marginBottom: 16 }}>
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
                  <Select.Option value={linkStatus[key]} key={key}>
                    {key}
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
        </AppCard>
        <Collapse items={items} bordered={false} ghost />
      </Form>
    </>
  )
}

const FormHeader = ({ isStick, isLoading }) => {
  return (
    <AppCard
      styles={{
        marginBottom: 16,
        marginLeft: isStick ? -16 : 0,
        minWidth: isStick ? window.innerWidth - 80 : '100%',
        transition: 'all 0.2s ease-in-out',
      }}>
      <Row>
        <Col xs={24}>
          <Space
            direction="row"
            align="center"
            style={{ width: '100%', justifyContent: 'space-between' }}>
            <CreateLinkFromFile />
            <Form.Item style={{ margin: 0 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </AppCard>
  )
}
