import React from 'react'
import PanelBox from '../components/PanelBox'
import { Form, Input, Row, Col } from 'antd'
import language from '../resources/js/languages_dict'

const CreateLink = () => {
    const submithandler = () => {
        console.log()
    }
    return(
        
        <PanelBox title={language.tokens['CREATE_LINK_PAGE']}>
            {/* <Row gutter={8}>
                        <Col span={12}>
                        
                        </Col>
                        <Col span={12}>
                        <Input placeholder="input placeholder" />
                        </Col>
                        <Col span={12}>
                        <Input placeholder="input placeholder" />
                        </Col>
                        
                    </Row> */}
            <Form 
                onSubmit={submithandler}
                layout='inline'
                label={language.tokens['TITLE']}
                
            >
                <Row gutter={12} className='ant-form-vertical'>
                    <Col>
                        <Form.Item label="Field A">
                            <Input placeholder="input placeholder" />       
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12} className='ant-form-vertical'>
                    <Col>
                        <Form.Item label="Field A">
                            <Input placeholder="input placeholder" />       
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12} className='ant-form-vertical'>
                    <Col>
                        <Form.Item label="Field A">
                            <Input placeholder="input placeholder" />       
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
        </PanelBox>
    )
}

export default CreateLink;