import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Select, Space, Tooltip, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { tooltips, devices } from '../../../utils/constants'
import { deleteObjectKey } from '../../../utils/general/deleteObjectKey'
import { reorderObjectKeys } from '../../../utils/general/reorderObjectKeys'
import { titleCase } from '../../../utils/titlePath'

const { Title } = Typography

export const DeviceTargeting = ({
  Form,
  devices,
  selectedDevices,
  setSelectedDevices,
}) => {
  return (
    <>
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
                  name={[name, 'key']}
                  fieldKey={[fieldKey, 'key']}
                  rules={[{ required: true, message: 'Missing type' }]}>
                  <Select style={{ width: 200 }} placeholder="Device">
                    {devices.map((device, index) =>
                      Object.values(selectedDevices).includes(
                        device.toLowerCase(),
                      ) ? null : (
                        <Select.Option value={device.toLowerCase()}>
                          {titleCase(device)}
                        </Select.Option>
                      ),
                    )}
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
                      deleteObjectKey(selectedDevices, name),
                    )
                    setSelectedDevices(newSelectedDevices)
                    remove(name)
                  }}
                />
              </Space>
            ))}
            <Form.Item>
              {fields.length < devices.length && (
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
    </>
  )
}
