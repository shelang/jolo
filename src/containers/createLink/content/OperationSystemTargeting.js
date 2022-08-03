import React, { useState } from 'react'
import { Button, Card, Input, Select, Space, Tooltip, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { tooltips, os } from '../../../utils/constants'
import { deleteObjectKey } from '../../../utils/general/deleteObjectKey'
import { reorderObjectKeys } from '../../../utils/general/reorderObjectKeys'
import { titleCase } from '../../../utils/titlePath'

const { Title } = Typography

export const OperationSystemTargeting = ({
  Form,
  oss: operationSystems,
  selectedOs,
  setSelectedOs,
}) => {
  return (
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
              ({ key, name, fieldKey, labelCol, wrapperCol, ...restField }) => (
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
                              {titleCase(operationSystem)}
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
              {fields.length < operationSystems.length && (
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
  )
}
