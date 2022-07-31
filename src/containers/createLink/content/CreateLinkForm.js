import React, { useEffect, useState } from 'react'
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
  Spin,
  Tooltip,
  AutoComplete,
  Slider,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import useFetch from '../../../hooks/asyncAction'
import {
  redirectModes,
  linkStatus,
  tooltips,
  os,
  devices,
  booleanEnum,
} from '../../../utils/constants'
import { useQuery } from '../../../hooks/queryParams'

const { TextArea } = Input
const { Title } = Typography

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

const CreateLinkForm = () => {
  let query = useQuery()
  const [scripts, setScripts] = useState([])
  const [webhooks, setWebhooks] = useState([])
  const [hash, setHash] = useState(false)
  const [iframe, setIframe] = useState(false)
  const [form] = Form.useForm()
  const [selectedDevices, setSelectedDevices] = useState({})
  const [selectedOs, setSelectedOs] = useState({})

  const [editMode, setEditMode] = useState(booleanEnum[query.get('isEditing')])
  const [linkId, setLinkId] = useState(query.get('id'))
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)

  const [selectedScript, setSelectedScript] = useState()
  const [selectedWebhook, setSelectedWebhook] = useState()
  
  const [scriptModalVisible, setScriptModalVisible] = useState(false)
  const [webhookModalVisible, setWebhookModalVisible] = useState(false)

  const [operationSystems, setOperationSystems] = useState(os)
  const [targetDevices, setTargetDevices] = useState(devices)

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1)
    },
  })

  const [linkData, fetchLinkData] = useFetch()
  const [scriptData, fetchScripts] = useFetch()
  const [webhookData, fetchWebhooks] = useFetch()

  const onFinish = async ({ iframe, ...values }) => {
    if (editMode) {
      const id = (response && response.id) || linkId
      await doFetch({
        url: `links/${id}`,
        method: 'PUT',
        data: {
          ...values,
          scriptId: selectedScript && selectedScript.value,
          type: iframe
            ? 'IFRAME'
            : selectedScript && selectedScript.value
            ? 'SCRIPT'
            : 'REDIRECT',
        },
      })
    } else {
      await doFetch({
        url: 'links',
        method: 'POST',
        data: {
          ...values,
          type: iframe
            ? 'IFRAME'
            : selectedScript && selectedScript.value
            ? 'SCRIPT'
            : 'REDIRECT',
          scriptId: selectedScript && selectedScript.value,
          webhookId: selectedWebhook && selectedWebhook.value,
        },
      })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
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
  const onFetchLinkData = async () => {
    await fetchLinkData({
      url: `links/${linkId}`,
      method: 'GET',
    })
  }

  const deleteObjectKey = (obj, key) => {
    return Object.keys(obj).reduce((total, acc) => {
      if (Number(acc) !== key) {
        total[acc] = obj[acc]
      }
      return total
    }, {})
  }
  const reorderObjectKeys = (obj) => {
    return Object.keys(obj).reduce((total, acc, index) => {
      if (index !== acc) {
        total[index] = obj[acc]
      }
      return total
    }, {})
  }
  const onSelect = (data) => {
    console.log('onSelect', data)
    setSelectedScript(scripts.filter((script) => script.value === data)[0])
    setSelectedWebhook(webhooks.filter((webhook) => webhook.value === data)[0])
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

  useEffect(() => {
    if (linkId) {
      onFetchLinkData()
    }
  }, [linkId])
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
                <Select.Option value={linkStatus[key]} key={key}>
                  {key}
                </Select.Option>
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
              <Card>
                <Title level={3}>
                  Device Targeting:
                  <Tooltip
                    className={'customTooltip'}
                    placement="top"
                    title={tooltips.textTargeting}>
                    <Button>?</Button>
                  </Tooltip>
                </Title>
                <Form.List name="devices">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          size={0}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="baseline">
                          <Form.Item
                            {...restField}
                            wrapperCol={{ span: 24 }}
                            name={[name, 'type']}
                            fieldKey={[fieldKey, 'type']}
                            rules={[
                              { required: true, message: 'Missing type' },
                            ]}>
                            <Select style={{ width: 200 }} placeholder="Device">
                              {targetDevices.map((targetDevice) => {
                                if (
                                  Object.values(selectedDevices).includes(
                                    targetDevice.toLowerCase(),
                                  )
                                ) {
                                  return null
                                } else {
                                  return (
                                    <Select.Option
                                      value={targetDevice.toLowerCase()}>
                                      {targetDevice}
                                    </Select.Option>
                                  )
                                }
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            wrapperCol={{ span: 24 }}
                            name={[name, 'url']}
                            fieldKey={[fieldKey, 'url']}
                            rules={[
                              { required: true, message: 'Missing URL' },
                            ]}>
                            <Input placeholder="url" style={{ width: 300 }} />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                              const newSelectedDevices = reorderObjectKeys(
                                deleteObjectKey(selectedDevices, name),
                              )
                              setSelectedDevices(newSelectedDevices)
                              remove(name)
                            }}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        {fields.length < 2 && (
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}>
                            Add Device
                          </Button>
                        )}
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
              <Card>
                <Title level={3}>
                  Operation System Targeting:
                  <Tooltip
                    className={'customTooltip'}
                    placement="top"
                    title={tooltips.textTargeting}>
                    <Button>?</Button>
                  </Tooltip>
                </Title>
                <Form.List name="os">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(
                        ({
                          key,
                          name,
                          fieldKey,
                          labelCol,
                          wrapperCol,
                          ...restField
                        }) => (
                          <Space
                            key={key}
                            size={0}
                            style={{ display: 'flex', marginBottom: 8 }}
                            align="baseline">
                            <Form.Item
                              {...restField}
                              wrapperCol={{ span: 24 }}
                              name={[name, 'type']}
                              fieldKey={[fieldKey, 'type']}
                              rules={[
                                { required: true, message: 'Missing type' },
                              ]}>
                              <Select
                                style={{ width: 200 }}
                                placeholder="Operation System">
                                {operationSystems.map((operationSystem) => {
                                  if (
                                    Object.values(selectedOs).includes(
                                      operationSystem.toLowerCase(),
                                    )
                                  ) {
                                    return null
                                  } else {
                                    return (
                                      <Select.Option
                                        value={operationSystem.toLowerCase()}>
                                        {operationSystem}
                                      </Select.Option>
                                    )
                                  }
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              wrapperCol={{ span: 24 }}
                              name={[name, 'url']}
                              fieldKey={[fieldKey, 'url']}
                              rules={[
                                { required: true, message: 'Missing URL' },
                              ]}>
                              <Input placeholder="url" style={{ width: 300 }} />
                            </Form.Item>
                            <MinusCircleOutlined
                              style={{ marginLeft: 10 }}
                              onClick={() => {
                                const newSelectedOs = reorderObjectKeys(
                                  deleteObjectKey(selectedOs, name),
                                )
                                setSelectedOs(newSelectedOs)
                                remove(name)
                              }}
                            />
                          </Space>
                        ),
                      )}
                      <Form.Item>
                        {fields.length < 2 && (
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}>
                            Add Operation System
                          </Button>
                        )}
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
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
                options={webhooks}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="Search Webhook"
                value={selectedWebhook ? selectedWebhook.label : undefined}
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
