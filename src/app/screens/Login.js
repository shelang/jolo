import React from 'react'
import logo from '../resources/images/logo.png'
import { Form, Input, Button, Row, Col, Checkbox} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import language from '../resources/js/languages_dict'
import '../styles/login.css'

export const Login = () => {

 return (
        <Row className="login-row" justify='space-around' align='middle' type='flex'>
            <Col span='8'>
                <Form layout="horizontal" className="login-form">
                    <div className='section-logo'>
                        <img src={logo} className="logo" alt='linkcomposer logo'/>
                    </div>
                    <Form.Item
                        name="username"
                        rules={[
                        {required: true, message: 'Please input your Username!'},
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder={language.tokens['USER_NAME']} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your Password!'},
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder={language.tokens['PASSWORD']}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>{language.tokens['REMEMBER_ME']}</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                            {language.tokens['FORGOT_PASSWORD']}
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {language.tokens['LOG_IN']}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
     )
}

export default Login;