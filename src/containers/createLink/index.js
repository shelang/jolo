import React from 'react';
import { Row, Col, Typography, Form, Input, Button, Select } from 'antd';

const { Title } = Typography;

function CreateLink() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
          label='Title'
          name='title'
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
          label='URL'
          name='url'
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
          name='status'
          rules={[
            {
              required: false,
              message: 'Please input your Status!',
            },
          ]}
        >
          <Select>
            <Select.Option value='active'>Active</Select.Option>
            <Select.Option value='deactive'>DeActive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Redirect Mode'
          name='redirect'
          rules={[
            {
              required: false,
              message: 'Please input your Redirect Mode!',
            },
          ]}
        >
          <Select>
            <Select.Option value='active'>Active</Select.Option>
            <Select.Option value='deactive'>DeActive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateLink;
