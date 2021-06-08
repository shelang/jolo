import React from 'react'
import { Form, Input, Button, Select } from 'antd'

const { Option } = Select

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
        // case 'select' :
        //     formElement = <Form.Item
        //         name={props.name}
        //         rules={[{
        //             required: props.required,
        //             message: props.message
        //             }]}
        //     >
        //             <Select 
        //                 placeholder={props.selectItem.placeholder}>
        //                 <Option value="male">Male</Option>
        //                 <Option value="female">Female</Option>
        //                 <Option value="other">Other</Option>
        //             </Select>
        //         </Form.Item>
        //         break    
        case 'button' :
            formElement = <Form.Item>
                <Button 
                    type={props.buttonType} 
                    htmlType={props.htmlType} 
                    className={props.buttonClassName}
                    onClick={props.click}
                    disabled={props.disabled}
                    size={props.buttonSize}
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