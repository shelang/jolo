import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Row, Col, PageHeader, Divider, List } from 'antd'
import { CheckOutlined, CopyOutlined, FormOutlined, QuestionCircleOutlined, RedoOutlined, HistoryOutlined } from '@ant-design/icons'
import FormItem from '../components/FormItem'
import language from '../resources/js/languages_dict'
import { CopyToClipboard } from "react-copy-to-clipboard"
import '../styles/create_status.css'

const { Text, Paragraph } = Typography

const CreateStatus = (props) => {

    const { location, history } = props
    const [hash_url, set_hash_url] = useState(location.state.url ? location.state.url : '')
    const [copied, set_copied] = useState(false)

    const alert = useSelector(state => state.app.alert)

    const dispatch = useDispatch()

    // const hashurlHandler = (e) => {
    //     set_hash_url(e.target.value)
    // }

    const copyClipboardHandler = () =>{
        set_copied(true)
        dispatch({ 'type': 'APP_SET_ALERT', 'payload': { 'show': true, 'text': language.tokens['LINK_COPIED'] } })
        setTimeout(() => {
            set_copied(false)
        }, 2000)
    }

    useEffect(() => {
        if(!copied && alert.show){
            dispatch({ 'type': 'APP_SET_ALERT', 'payload': { 'show': false, 'text': '' }  })
        }   
    },[copied])

    let rows = []
    let nums = [
        [language.tokens['HOW_IT_WORKS'],<QuestionCircleOutlined/>, language.tokens['HOW_IT_WORKS_DESCRIPTION']], 
        [language.tokens['TEST_IT_NOW'],<HistoryOutlined />, language.tokens['TEST_IT_NOW_DESCRIPTION'], language.tokens['MAKE_A_TEST_CLICK']],
        [language.tokens['VIEW_REPORTS'], <RedoOutlined />,language.tokens['VIEW_REPORTS_DESCRIPTION'] ]
    ]

    for (let i = 0; i < 3; i++) {
           let row = []
            for(let j = 0; j < 1; j++){ 
                row.push(<React.Fragment key={nums[i]}>
                     <PageHeader 
                            title={nums[i][0]} 
                            avatar={{ icon: [nums[i][1]]}}
                        />
                            <Paragraph>
                                {nums[i][2]}     
                            </Paragraph>
                            <FormItem                             
                                itemType="button"
                                buttonType="primary"
                                click={() => window.open(hash_url, "_blank", 'noopener,noreferrer')}
                            >                                        
                                {nums[i][3]} 
                            </FormItem>
                        </React.Fragment> 
            )
        }
        rows.push(<Col key={i} span={8} className='items-info'>
                    {row}
                  </Col>)
    }

    return(
        <>
            <Row>
                <Col span={24} className='create-message'>
                    <CheckOutlined/><Text type="success">{location.state.message}</Text>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <Row>
                        <Col flex={4}>
                            <FormItem 
                                itemType="input"
                                inputName={language.tokens['HASH_URL']}
                                inputItem={false}
                                defaultValue={hash_url}
                                // change={hashurlHandler}
                                disabled={true}
                            />
                        </Col>
                        <Col flex={1} className='btn-container'>
                            <Row>
                                <Col flex={1}>
                                
                                    <CopyToClipboard text={hash_url} onCopy={copyClipboardHandler}>
                                        <span>
                                            <FormItem                             
                                                itemType="button"
                                                htmlType="button"
                                                buttonClassName="clipboard-btn"
                                            >                                        
                                                <CopyOutlined />
                                            </FormItem> 
                                        </span>
                                    </CopyToClipboard>                                  
                                </Col>
                                <Col flex={1}>
                                    <FormItem                             
                                        itemType="button"
                                        buttonClassName="clipboard-btn"
                                    >
                                        <FormOutlined />
                                    </FormItem> 
                                </Col>
                                <Col flex={1}><FormItem                             
                                        itemType="button"
                                        buttonClassName="clipboard-btn"
                                    >
                                       UTM
                                    </FormItem>
                                </Col>
                            </Row>                          
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='alert'>
                <span>
                   {
                     copied && alert.show ?
                        <Text type='success'>
                            {alert.text}
                        </Text>
                    :null
                    } 
                </span>
                </Col>           
            </Row>
            <Divider/>
            <Row className='container-items-info'>
                {rows}
            </Row>
        </>
    )
}


export default CreateStatus