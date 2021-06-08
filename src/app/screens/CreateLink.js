import React from 'react'
import PanelBox from '../components/PanelBox'
import { Form, Input, Row, Col, Select, DatePicker} from 'antd'
import FormItem from '../components/FormItem'
import language from '../resources/js/languages_dict'

const { Option } = Select
const { TextArea } = Input

const CreateLink = () => {

    
const submithandler = () => {
    console.log()
}

const onChangeTextAreaHandler = (e) => {
    console.log('Change:', e.target.value);
}    
    return(
        
        <PanelBox title={language.tokens['CREATE_LINK_PAGE']} className='panel-container'>
            <Form 
                onSubmit={submithandler}
                layout='vertical'
                label={language.tokens['TITLE']}
                
            >
                <Row className='ant-form-inline row-content'>
                    <Col span={8} className='form-item-col'>
                        <Form.Item label={language.tokens['TITLE']}>
                            <Input placeholder="This is example" />       
                        </Form.Item>
                    </Col>
                    <Col span={8} className='form-item-col'>
                        <Form.Item label={language.tokens['URL']}>
                            <Input placeholder="https://example.com" />       
                        </Form.Item>
                    </Col>
                    <Col span={8} className='form-item-col'>
                    <Form.Item
                        label={language.tokens['STATUS']}
                        rules={[
                        {
                            required: true,
                            message: language.tokens['PLEASE_SELECT_STATUS'] ,
                        },
                        ]}
                    >
                        <Select placeholder={language.tokens['SELECT_YOUR_STATUS']}>
                            <Option value="male">Active</Option>
                            <Option value="female">Deactive</Option>
                            <Option value="other">Normal</Option>
                        </Select>
                    </Form.Item>
                        {/* <FormItem 
                            name={language.tokens['URL']}
                            label={language.tokens['URL']}
                            required={true}
                            message={language.tokens['PLEASE_INPUT_USERNAME']}
                            selectItem={{
                                placeholder: language.tokens['SELECT_YOUR_GENDER']             
                            }}
                            >
                            
                        </FormItem> */}
                    </Col>
                    
                </Row>
                <br />
                <Row className='ant-form-inline row-content'>
                    <Col span={8} className='form-item-col'>
                        <Form.Item 
                            label={language.tokens['DESCRIPTION']}
                        >
                            <TextArea 
                                // showCount
                                maxLength={100}
                                onChange={onChangeTextAreaHandler}
                                autoSize={{ minRows: 4, maxRows: 7 }}
                                // value={value}
                                />
                        </Form.Item>                       
                    </Col> 
                    <Col span={8} className='form-item-col'>
                        <Form.Item 
                            // name="date-picker" 
                            label={language.tokens['EXPIRE_DATE']}
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Please select time!',
                                  },
                            ]}     
                            >
                            <DatePicker style={{
                                width: '100%',
                            }}/>
                        </Form.Item>
                    </Col>                 
                </Row> 
                <br />
                <br />
                <Row>
                    <Col flex={1}>
                        <FormItem
                            // click={props.onSubmitForm}
                            itemType="button"
                            buttonClassName="login-form-button"
                            buttonType="primary"
                            htmlType="submit"
                            buttonSize= 'large'
                        >
                            {language.tokens['CREATE']}
                        </FormItem> 
                    </Col>
                    <Col flex={4}></Col>
                </Row>          
            </Form>
        </PanelBox>
    )
}

export default CreateLink;