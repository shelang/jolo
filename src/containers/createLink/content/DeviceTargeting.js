import React from 'react'
import {
  Button,
  Card,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { tooltips } from '../../../utils/constants'
import { deleteObjectKey } from '../../../utils/general/deleteObjectKey'
import { reorderObjectKeys } from '../../../utils/general/reorderObjectKeys'

const { Title } = Typography

export const DeviceTargeting = (props) => {
  const {
    Form,
    onSelectedDevices,
    onSetSelectedDevices,
    onTargetDevices,
    onSetTargetDevices,
  } = props

  return (
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
                  rules={[{ required: true, message: 'Missing type' }]}>
                  <Select style={{ width: 200 }} placeholder="Device">
                    {onTargetDevices.map((targetDevice) => {
                      if (
                        Object.values(onSelectedDevices).includes(
                          targetDevice.toLowerCase(),
                        )
                      ) {
                        return null
                      } else {
                        return (
                          <Select.Option value={targetDevice.toLowerCase()}>
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
                  rules={[{ required: true, message: 'Missing URL' }]}>
                  <Input placeholder="url" style={{ width: 300 }} />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    const newSelectedDevices = reorderObjectKeys(
                      deleteObjectKey(onSelectedDevices, name),
                    )
                    onSetSelectedDevices(newSelectedDevices)
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
  )
}

