import React from 'react'
import { Form, Input, Button } from 'antd'

export const FormItem = (props) => {
    let formElement = null
    switch(props.itemType){
        case 'input' :
            formElement = <Form.Item
                name={props.name}
                rules={[{
                    required: props.required,
                    message: props.message
                }]}
                hasFeedback={props.hasFeedback}
            >
                <Input
                    value={props.inputValue}
                    onChange={props.change}
                    prefix={props.inputItem.inputIcon ? props.inputItem.renderIcon() : null} 
                    type={props.inputItem.inputType ? props.inputItem.inputType : null}   
                    placeholder={props.inputItem.placeholder}
                />
            </Form.Item>
            break
        case 'button' :
            formElement = <Form.Item>
                <Button 
                    type={props.buttonType} 
                    htmlType={props.htmlType} 
                    className={props.buttonClassName}
                    onClick={props.click}
                    disabled={props.disabled}
                    >
                    {/* {props.buttonValue} */}
                    {props.children}
                </Button>
            </Form.Item>
            break
        default :
            formElement = <Form.Item></Form.Item>   
    }
    return (
        <>
            {formElement}
        </>  
    )
}

export default FormItem