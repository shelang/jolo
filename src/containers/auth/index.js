import React, { useEffect } from 'react';
import useFetch from '../../hooks/asyncAction';
import useCache from '../../hooks/cacheData';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Space, Row, Col, Typography } from 'antd';
import './auth.scss';
import { setCookie } from 'nookies';

const { Title } = Typography;
const layout = {
  wrapperCol: { span: 24 },
};

function Login() {
  const [{ response, isLoading, error }, doFetch] = useFetch();
  let history = useHistory();

  const onFinish = async (values) => {
    await doFetch({
      url: 'login',
      method: 'POST',
      data: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (response) {
      setCookie(null, 'user', JSON.stringify(response), {
        maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
      });
      history.push('./dashboard');
    }
  }, [response]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="auth-container">
      <Row>
        <Col span={24}>
          <Title level={2}>Login</Title>
        </Col>
        <Col span={24} className="login-form">
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Space size="middle">
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Log in
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default Login;
