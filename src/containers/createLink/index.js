import React, { useEffect } from 'react';
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
  Checkbox,
} from 'antd';
import { redirectModes, linkStatus, tooltips } from '../../utils/constants';

const { Title } = Typography;
const { TextArea } = Input;

function CreateLink() {
  const [{ response, isLoading, error }, doFetch] = useFetch();

  const onFinish = async (values) => {
    console.log('Success:', values);
    await doFetch({
      url: 'links',
      method: 'POST',
      data: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    console.log(response, 'response');
  }, [response]);

  const labelCol = {
    lg: { span: 3 },
    md: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
  };
  const wrapperCol = {
    lg: { span: 9 },
    md: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title>Creating Link</Title>
        </Col>
      </Row>
      <Form
        scrollToFirstError
        labelAlign='left'
        name='create link'
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
        <Form.Item
          label='Hash URL:'
          name='hash'
          tooltip={tooltips.hashUrl}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Checkbox>Hash URL ?</Checkbox>
        </Form.Item>
        <Form.Item
          label='Forward Parameters:'
          name='param'
          tooltip={tooltips.forwardParameters}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateLink;
