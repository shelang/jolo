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
} from 'antd';
import {
  redirectModes,
  linkStatus,
  tooltips,
  os,
  devices,
} from '../../utils/constants';

const { Title } = Typography;
const { TextArea, Search } = Input;

const urlConfiguration = {
  Device: devices,
  'Operation System': os,
};

function CreateLink() {
  const [hash, setHash] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [branch, setBranch] = useState();
  const [{ response, isLoading, error }, doFetch] = useFetch();
  const [form] = Form.useForm();

  const onFinish = async ({ urlConfigs, ...values }) => {
    const config = {};
    if (urlConfigs) {
      if (urlConfigs.branch === 'Device') {
        config.devices = {
          type: urlConfigs.type,
          url: urlConfigs.url,
        };
      } else {
        config.os = {
          type: urlConfigs.type,
          url: urlConfigs.url,
        };
      }
    }

    await doFetch({
      url: 'links',
      method: 'POST',
      data: {
        ...values,
        ...config,
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFieldsChange = (changedFields) => {
    changedFields.forEach((changedField) => {
      if (changedField.name.includes('branch')) {
        setBranch(changedField.value);
      }
    });
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
          value={response && response.url}
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
        <Form.Item label='URL Configuration' name='urlConfigs'>
          <Input.Group compact>
            <Form.Item name={['urlConfigs', 'branch']} noStyle>
              <Select style={{ width: '25%' }}>
                {Object.keys(urlConfiguration).map((key) => {
                  return <Select.Option value={key}>{key}</Select.Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item name={['urlConfigs', 'type']} noStyle>
              <Select style={{ width: '25%' }} disabled={!branch}>
                {branch &&
                  Object.keys(urlConfiguration[branch]).map((key) => {
                    return (
                      <Select.Option value={urlConfiguration[branch][key]}>
                        {key}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item name={['urlConfigs', 'url']} noStyle>
              <Input
                style={{ width: '50%' }}
                placeholder='URL'
                disabled={!branch}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
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
