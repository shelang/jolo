import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/asyncAction';
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
  Modal,
  message,
  Divider,
  Card,
  Space,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  redirectModes,
  linkStatus,
  tooltips,
  os,
  devices,
} from '../../utils/constants';

const { Title } = Typography;
const { TextArea, Search } = Input;

function CreateLink() {
  const [hash, setHash] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operationSystems, setOperationSystems] = useState(os);
  const [targetDevices, setTargetDevices] = useState(devices);
  const [{ response, isLoading, error }, doFetch] = useFetch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values, 'values');
    // await doFetch({
    //   url: 'links',
    //   method: 'POST',
    //   data: {
    //     ...values,
    //     ...config,
    //   },
    // });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFieldsChange = (changedFields) => {
    // changedFields.forEach((changedField) => {
    //   if (
    //     changedField.name.includes('devices') &&
    //     typeof changedField.value === 'string'
    //   ) {
    //     console.log('here');
    //     setTargetDevices(
    //       targetDevices.filter(
    //         (device) => device.toLowerCase() !== changedField.value
    //       )
    //     );
    //   } else if (changedField.name.includes('os')) {
    //     setOperationSystems(
    //       operationSystems.filter((os) => os !== changedField.value)
    //     );
    //   }
    // });
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response.url);
    message.success('Copied to Your Clipboard');
  };
  const createNewLink = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    console.log(response, 'response');
    response && setIsModalVisible(true);
  }, [response]);

  const labelCol = {
    lg: { span: 4 },
    md: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
  };
  const wrapperCol = {
    lg: { span: 12 },
    md: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
  };

  return (
    <Card>
      <Modal
        title='Created Link Successfully'
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={createNewLink}
        cancelText='Edit'
        okText='Create New Link'
      >
        <p>Here is Your Link, Enjoy</p>
        <Search
          value={response && response.redirectTo}
          onSearch={copyToClipboard}
          enterButton='Copy'
        />
        <Divider />
        <Button
          type='dashed'
          block
          onClick={() => response && window.open(response.url)}
        >
          Test Link
        </Button>
      </Modal>
      <Row>
        <Col span={24}>
          <Title>Creating Link</Title>
        </Col>
      </Row>
      <Form
        form={form}
        scrollToFirstError
        labelAlign='left'
        name='create link'
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={onFieldsChange}
        initialValues={{ index_status: 'active', index_mode: 301 }}
      >
        <Form.Item
          label='Friendly Name:'
          name='title'
          tooltip={tooltips.friendlyName}
          rules={[
            {
              required: true,
              message: 'Please input your Title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Destination URL:'
          name='url'
          tooltip={tooltips.destinationUrl}
          rules={[
            {
              required: true,
              message: 'Please input your URL!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Status'
          name='index_status'
          rules={[
            {
              required: false,
              message: 'Please input your Status!',
            },
          ]}
        >
          <Select>
            {Object.keys(linkStatus).map((key) => {
              return (
                <Select.Option value={linkStatus[key]}>{key}</Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label='Redirect Mode:'
          name='index_mode'
          tooltip={tooltips.redirectMode}
          rules={[
            {
              required: false,
              message: 'Please input your Redirect Mode!',
            },
          ]}
        >
          <Select>
            {redirectModes.map((redirectMode) => {
              return (
                <Select.Option value={redirectMode}>
                  {redirectMode}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label='Expiration Date:'
          name='exp_date'
          tooltip={tooltips.expirationDate}
          rules={[
            {
              required: false,
              message: 'Please input your Expire Date!',
            },
          ]}
        >
          <DatePicker showTime showNow={false} />
        </Form.Item>
        <Form.Item
          label='Note:'
          name='des'
          tooltip={tooltips.note}
          rules={[
            {
              required: false,
              message: 'Please input your Description!',
            },
          ]}
        >
          <TextArea maxLength={255} autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item label='Hash URL:' name='hash' tooltip={tooltips.hashUrl}>
          <Row align='middle'>
            <Col span={4}>
              <Switch value={hash} onChange={setHash} />
            </Col>
            <Col span={20}>
              <Input placeholder='Hash URL' disabled={!hash} />{' '}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          label='Forward Parameters:'
          name='param'
          tooltip={tooltips.forwardParameters}
        >
          <Switch />
        </Form.Item>
        <Row>
          <Col span={16}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Card>
                <Title level={3}>Device Targeting:</Title>
                <Form.List name='devices'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          size={0}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align='baseline'
                        >
                          <Form.Item
                            {...restField}
                            wrapperCol={{ span: 24 }}
                            name={[name, 'type']}
                            fieldKey={[fieldKey, 'type']}
                            rules={[
                              { required: true, message: 'Missing type' },
                            ]}
                          >
                            <Select style={{ width: 200 }} placeholder='Device'>
                              {targetDevices.map((targetDevice) => {
                                return (
                                  <Select.Option
                                    value={targetDevice.toLowerCase()}
                                  >
                                    {targetDevice}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            wrapperCol={{ span: 24 }}
                            name={[name, 'url']}
                            fieldKey={[fieldKey, 'url']}
                            rules={[{ required: true, message: 'Missing URL' }]}
                          >
                            <Input placeholder='url' style={{ width: 300 }} />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ marginLeft: 10 }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type='dashed'
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Device
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
              <Card>
                <Title level={3}>Operation System Targeting:</Title>
                <Form.List name='os'>
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
                            align='baseline'
                          >
                            <Form.Item
                              {...restField}
                              wrapperCol={{ span: 24 }}
                              name={[name, 'type']}
                              fieldKey={[fieldKey, 'type']}
                              rules={[
                                { required: true, message: 'Missing type' },
                              ]}
                            >
                              <Select
                                style={{ width: 200 }}
                                placeholder='Operation System'
                              >
                                {operationSystems.map((operationSystem) => {
                                  return (
                                    <Select.Option
                                      value={operationSystem.toLowerCase()}
                                    >
                                      {operationSystem}
                                    </Select.Option>
                                  );
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
                              ]}
                            >
                              <Input placeholder='url' style={{ width: 300 }} />
                            </Form.Item>
                            <MinusCircleOutlined
                              style={{ marginLeft: 10 }}
                              onClick={() => remove(name)}
                            />
                          </Space>
                        )
                      )}
                      <Form.Item>
                        <Button
                          type='dashed'
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Operation System
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Space>
          </Col>
        </Row>
        <br />
        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CreateLink;
