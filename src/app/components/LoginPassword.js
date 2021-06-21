import React from 'react'
import Logo from './Logo'
import { Form, Alert } from 'antd'
import FormItem from './FormItem'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import loading_spinner from '../resources/js/loading_spinner'
import Loading from './Loading'
// import notify from '../utils/notify'
import language from '../resources/js/languages_dict'
import '../styles/login.css'

export const LoginPassword = (props) => {
    return( 
            <>
                <Form layout="horizontal" className="login-form">
                    <Logo />
                    <FormItem
                        itemType="input"
                        inputValue={props.userName}
                        change={props.onChangeUsername}
                        name={language.tokens['USER_NAME']}
                        required={true}
                        message={language.tokens['PLEASE_INPUT_USERNAME']}
                        hasFeedback={true}
                        inputItem={{
                            placeholder: language.tokens['USER_NAME'],
                            inputIcon: true,
                            renderIcon: () => <UserOutlined className='site-form-item-icon' />               
                        }}
                    />
                    <FormItem
                        itemType="input"
                        inputValue={props.passwordValue}
                        change={props.onChangePassword}
                        name={language.tokens['PASSWORD']}
                        required={true}
                        message={language.tokens['PLEASE_INPUT_PASSWORD']}
                        hasFeedback={true}
                        inputItem={{
                            placeholder: language.tokens['PASSWORD'],
                            // inputType: true, // check it
                            inputType: "password",
                            inputIcon: true,
                            renderIcon: () => <LockOutlined className='site-form-item-icon' />               
                        }}
                    />
                        {/* <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>{language.tokens['REMEMBER_ME']}</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                {language.tokens['FORGOT_PASSWORD']}
                            </a>
                        </Form.Item> */}
                    {
                        props.loading ? 
                        <FormItem
                            itemType="button"
                            buttonClassName="login-form-button"
                            buttonType="primary"
                            htmlType="submit"
                        >
                            <Loading color={loading_spinner['loading_spinner']['white']}/>
                        </FormItem>                          
                        :
                        !props.errorMessage.status ?
                            <FormItem
                                click={props.onSubmitForm}
                                itemType="button"
                                buttonClassName="login-form-button"
                                buttonType="primary"
                                htmlType="submit"
                            >
                                {language.tokens['LOG_IN']}
                            </FormItem>
                        :
                            <FormItem                             
                                disabled={true}
                                itemType="button"
                                buttonClassName="login-form-button"
                                buttonType="primary"
                                htmlType="submit"
                            >
                                {language.tokens['LOG_IN']}
                            </FormItem> 
                    }                
                    {
                        props.errorMessage.error ?
                            <Alert message={props.errorMessage.error} type="error" showIcon/>
                        :null    
                    }
                </Form>
                {/* {
                    props.messageAuth.show && (
                        notify(props.messageAuth.text, props.messageAuth.type)                                             
                    )  
                } */}
            </>
    )
}


export default React.memo(LoginPassword)