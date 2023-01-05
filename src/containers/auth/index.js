import React, { useEffect } from 'react'
import Logo from '../../assets/logo-light-New.png'
import useFetch from '../../hooks/asyncAction'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Space, Row, Col, Typography, Image } from 'antd'
import { setCookie } from 'nookies'
import './auth.scss'

const { Title } = Typography
const layout = {
  wrapperCol: { span: 24 },
}

function Login() {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  let history = useHistory()

  const onFinish = async (values) => {
    await doFetch({
      url: 'login',
      method: 'POST',
      data: values,
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (response) {
      setCookie(null, 'linkComposerUser', JSON.stringify(response), {
        maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
      })
      history.push('./dashboard')
    }
  }, [response])

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="auth-container">
      <div className="auth-wrapper-image" />
      <div className="auth-wrapper-form">
        <Row className="auth-form">
          <Col span={24}>
            <Title level={1} className="auth-form-title">
              Welcome To Link Composer
            </Title>
          </Col>
          <Col span={24} className="login-form">
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}>
                <Input placeholder="Username" size="large" className="input" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}>
                <Input.Password
                  placeholder="Password"
                  size="large"
                  className="input"
                />
              </Form.Item>

              <Form.Item style={{ width: '100%' }}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{ width: '100%' }}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Login
