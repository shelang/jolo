import React from 'react'
import { Form, Input, Button, Select, Switch } from 'antd'

const { Option } = Select

export const FormItem = (props) => {
    let formElement = null
    switch(props.itemType){
        case 'input' :
            formElement = <Form.Item
                name={props.name}
                label={props.label}
                rules={[{
                    required: props.required,
                    message: props.message
                }]}
                hasFeedback={props.hasFeedback}
                initialvalues={props.inputName ? props.defaultValue : null}
            >      
                <Input
                    value={props.inputValue}
                    defaultValue={props.defaultValue}
                    name={props.inputName}
                    onChange={props.change}
                    prefix={props.inputItem && props.inputItem.inputIcon ? props.inputItem.renderIcon() : null} 
                    type={props.inputItem.inputType ? props.inputItem.inputType : null}   
                    placeholder={props.inputItem.placeholder}
                    disabled={props.disabled}
                />
            </Form.Item>
            break;
        case 'inputwithswitch' :
                formElement = <Form.Item
                    name={props.name}
                    label={props.label}
                    rules={[{
                        required: props.required,
                        message: props.message
                    }]}
                    hasFeedback={props.hasFeedback}
                >      
                    {props.itemSwitch?
                    <span>
                        <Switch onChange={props.inputItem.radioButtonAction} size={props.inputItem.size}/>    
                    </span>:null }          
                    <Input
                        disabled={props.disabled}
                        value={props.inputValue}
                        onChange={props.change}
                        prefix={props.inputItem.inputIcon ? props.inputItem.renderIcon() : null} 
                        type={props.inputItem.inputType ? props.inputItem.inputType : null}   
                        placeholder={props.inputItem.placeholder}
                    />
                </Form.Item>
                break;  
        case 'switch' :
            formElement = <Form.Item label={props.label} name={props.name}>
                        <Switch size={props.size} onChange={props.change} />    
                </Form.Item>
            break;                
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
            break;
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