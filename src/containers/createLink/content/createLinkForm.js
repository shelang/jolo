import React, { useEffect, useState } from 'react'
import { labelCol, wrapperCol, marks } from '../utils/constants'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Switch,
  Card,
  Space,
  Tooltip,
  Spin,
  Slider,
} from 'antd'
import { redirectModes, linkStatus, tooltips } from '../../../utils/constants'
import TargetDevicesField from './targetDevicesField'
import OsTargetField from './osTargetField'
import AddWebhook from './addWebhook'
import AddScript from './addScript'
import useFetch from '../../../hooks/asyncAction'

const CreateLinkForm = ({
  onFinishFailed,
  linkId,
  linkData,
  onFinishForm,
  form,
}) => {
  const [hash, setHash] = useState(false)
  const [iframe, setIframe] = useState(false)
  const [selectedOs, setSelectedOs] = useState({})

  const [selectedDevices, setSelectedDevices] = useState({})
  const { TextArea } = Input

  const [{ response, isLoading, error }, doFetch] = useFetch()

  const onFinish = (data) => {
    const { scriptId, iframe } = data
    const formData = {
      ...data,
      hash: linkData.response.hash,
      type: iframe ? 'IFRAME' : scriptId && scriptId ? 'SCRIPT' : 'REDIRECT',
    }

    onFinishForm(formData)
  }
  const onFieldsChange = (changedFields) => {
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

  useEffect(() => {
    if (linkData.response) {
      const newValues = {
        ...linkData.response,
        status: linkData.response === 0 ? 'INACTIVE' : 'ACTIVE',
      }
      form.setFieldsValue(newValues)
    }
  }, [linkData.response])

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
        </Card>

        {!iframe && (
          <>
            <AddScript linkData={linkData.response} />
            <AddWebhook />
          </>
        )}

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
