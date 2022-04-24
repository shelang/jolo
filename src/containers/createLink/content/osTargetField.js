import React, { useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Select,
  Space,
  Tooltip,
  Typography,
  Input,
} from 'antd'
import { os, tooltips } from '../../../utils/constants'
import { deleteObjectKey, reorderObjectKeys } from '../../../utils/objectUtils'

const { Title } = Typography

const OsTargetField = ({ selectedOs, setSelectedOs }) => {
  const [operationSystems, setOperationSystems] = useState(os)

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
                    name={[name, 'type']}
                    fieldKey={[fieldKey, 'type']}
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
  )
}

export default OsTargetField
