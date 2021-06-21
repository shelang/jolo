import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PanelBox from '../components/PanelBox'
import { Form, Input, Row, Col, Select, DatePicker, Alert } from 'antd'
import moment from 'moment'
import FormItem from '../components/FormItem'
import language from '../resources/js/languages_dict'
import * as actions from '../actions'
import loading_spinner from '../resources/js/loading_spinner'
import Loading from '../components/Loading'
import '../styles/create_link.css'
import { useHistory } from 'react-router-dom'

const { Option } = Select
const { TextArea } = Input
// const { RangePicker } = DatePicker

const CreateLink = () => {
    const [title, set_title] = useState("")
    const [url_item, set_url_item] = useState("")
    const [disabled, set_disabled] = useState(true)
    const [select_index, set_select_index] = useState(0)
    const [select_info] = useState([301, 302, 307, 308])
    const [select_index_status, set_select_index_status] = useState(0)
    const [select_info_status] = useState([language.tokens['ACTIVE'], language.tokens['DEACTIVE']])
    const [description, set_description] = useState('')
    const [expire_date, set_expire_date] = useState('')
    const [date, set_date] = useState('')
    const [domain_password, set_domain_password] = useState('')
    const [radio_button, set_radio_button] = useState()
    const [button_status, set_button_status] = useState({ status: false, error: null })

    const token = useSelector(state => state.app.token)
    const loading = useSelector(state => state.createlink.loading)
    const user = useSelector(state => state.createlink.user)
    const url = useSelector(state => state.createlink.data)
    const alert = useSelector(state => state.createlink.alert)

    const dispatch = useDispatch()
    const history = useHistory()
    
    // const text_input = useRef()
    
    const clickSwitchHandler = () => {
        set_radio_button((prev) => (!prev))
    }

    useEffect(() => {
        if(radio_button === false || radio_button === 'undefined'){
            set_radio_button(true)
        }else if(radio_button === true){
            set_radio_button(false)  
        }         
    },[])

    const validation_form = (title, url, index_status, index_mode, exp_date, des, hash, param, token) => {
        dispatch(actions.createLink(title, url, index_status, index_mode, exp_date, des, hash, param, token))
    }

    const submithandler = (e) => {
        e.preventDefault()
        
        //create link validation
        if(title.length > 150) {
            set_button_status({ status: false, error: language.tokens['MAX_TITLE_CHAR_LIMIT'] })
        } else if (description.length > 255) {
            set_button_status({ status: false, error: language.tokens['MAX_DESCRIPTION_CHAR_LIMIT'] })
        } else if (domain_password.length > 20) {
            set_button_status({ status: false, error: language.tokens['MAX_HASH_URL_CHAR_LIMIT'] })
        } else if (description === '') {
            set_button_status({ status: false, error: language.tokens['PLEASE_INPUT_DESCRIPTION'] })
        } else if (expire_date === '') {
            set_button_status({ status: false, error: language.tokens['PLEASE_SELECT_EXPIRE_DATE'] })
        } else if( title === '' && url_item === '' ) { 
            set_button_status({ status: false, error: language.tokens['ENTER_TITLE_AND_URL'] })
        } else {
            set_button_status({ status: false, error: null })
            let target_status =  select_info_status[select_index_status] === undefined ?
                select_index_status.value : select_info_status[select_index_status]
            let target_mode =  select_info[select_index] === undefined ?
                 select_index.value : select_info[select_index]
            validation_form(title, url_item, target_status, target_mode, date, description, domain_password, radio_button, token)
        }  
    }
    
    useEffect(() => {
        if (title && url_item) {
            set_button_status({ status: false, error: null })
        } else if((title === '' && url_item !== '') || (title !== '' && url_item === '')){
            set_button_status({ status: true, error: null })
        } else {
            set_button_status({ status: false, error: null })
        }
    }, [title, url_item]) 

    const domainPasswordHandler = (e) => {
        set_domain_password(e.target.value)
    }

    const urlItemHandler = (e) => {
        set_url_item(e.target.value)
    }

    const titleItemHandler = (e) => {
        set_title(e.target.value)
    }

    const onChangeTextAreaHandler = (e) => {
        set_description(e.target.value)
    } 

    useEffect(() => {
        if(!loading){
            if (user.exist === true) {
                history.push('/createStatus', { 'url': url, 'message': alert.text })
            }
		}
        return () => {
            dispatch({ 'type': 'CREATE_USER_NOT_EXIST' }) 
        }
	}, [loading])

    const disabledRange = (start, end, is_equal) => {    
        const result = []
            if(is_equal){
                for (let i = start; i <= end; i++) {
                    result.push(i)
                }
                return result
            }
            for (let i = start; i < end; i++) {
                result.push(i)
            }
            return result
    }

    return(
        
        <PanelBox title={language.tokens['CREATE_LINK_PAGE']} className='panel-box-container'>
            <Form 
                layout='vertical'
                label={language.tokens['TITLE']}   
            >
                <Row className='ant-form-inline row-content'>
                    <Col span={8} className='form-item-col'>
                        <FormItem
                            itemType="input"
                            name={language.tokens['TITLE']}
                            label={language.tokens['TITLE']}
                            inputValue={title}
                            change={(e) => titleItemHandler(e)}
                            required={true}
                            hasFeedback={true}
                            inputItem={{
                                placeholder: language.tokens['THIS_IS_EXAMPLE']                                     
                            }}
                        />
                    </Col>
                    <Col span={8} className='form-item-col'>
                        <FormItem 
                            itemType="input"
                            name={language.tokens['URL']}
                            label={language.tokens['URL']}
                            inputValue={url_item}
                            change={(e) => urlItemHandler(e)}
                            required={true}
                            hasFeedback={true}
                            inputItem={{
                                placeholder: language.tokens['URL_EXAMPLE']                                     
                            }}
                        />
                    </Col>
                    <Col span={8} className='form-item-col'>
                        <Form.Item label={language.tokens['STATUS']}>
                            <Select onChange={(item , index) => set_select_index_status(index)} 
                            value={select_info_status[select_index_status] === undefined ? select_index_status.value : select_info_status[select_index_status]}>
                                {
                                    select_info_status.map((item, index) => {                                    
                                        return (<Option value={item} key={index}>{item}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>                        
                    </Col>                 
                </Row>
                <Row className='ant-form-inline row-content'>
                    <Col span={8} className='form-item-col'>
                        <Form.Item label={language.tokens['REDIRECT_MODE']}>
                            <Select onChange={(item , index) => set_select_index(index)} 
                            value={select_info[select_index] === undefined ? select_index.value : select_info[select_index]}>
                                {
                                    select_info.map((item, index) => {
                                        return (<Option value={item} key={index}>{item}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>                 
                    </Col> 
                    <Col span={8} className='form-item-col'>
                        <Form.Item                          
                            label={language.tokens['EXPIRE_DATE']}
                            placeholder={language.tokens['PLEASE_SELECT_TIME']}
                            rules={[{
                                    type: 'array',
                                    required: true,
                                    message: language.tokens['PLEASE_SELECT_TIME'],
                                }]}     
                            >
                            <DatePicker
                                defaultValue={expire_date}
                                onChange={(date, dateString) => {
                                    set_date(new Date(date))
                                    set_expire_date(dateString)
                                }}
                                showTime
                                showNow={false}
                                disabledDate={(current) => { return current && current < moment().startOf('day') }}
                                disabledTime={(current) => {                                     
                                    if(current !== null) {
                                        let h = new Date(Date.now()).getHours()
                                        let m = new Date(Date.now()).getMinutes()                                                                                                         
                                        if(current < moment().endOf('day')){
                                            return {
                                                disabledHours: () => disabledRange(0, h, false),
                                                disabledMinutes: () => disabledRange(0, m, true)
                                            }
                                        }   
                                    }
                                }}                           
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>                     
                    </Col> 
                    <Col span={8} className='form-item-col'>
                        <Form.Item 
                            label={language.tokens['DESCRIPTION']}  
                        >
                            <TextArea 
                                // ref={text_input}
                                maxLength={255}
                                autoSize={{ minRows: 3, maxRows: 6 }}
                                placeholder={language.tokens['ENTER_DESCRIPTION']}
                                value={description}
                                onChange={onChangeTextAreaHandler}
                                />
                        </Form.Item> 
                    </Col>                 
                </Row> 
                <Row className='ant-form-inline row-content'>
                    <Col span={8} className='form-item-col'>
                        <FormItem 
                            itemType="inputwithswitch"
                            PropName="checked"
                            name={language.tokens['HASH_URL']}               
                            label={language.tokens['HASH_URL']}
                            inputValue={domain_password}
                            change={domainPasswordHandler}
                            itemSwitch={true}
                            required={false}
                            hasFeedback={false}
                            disabled={disabled}
                            inputItem={{
                                placeholder: language.tokens['THIS_FIELD_IS_OPTIONAL'],
                                radioButtonAction: () => {
                                    set_disabled(previousState => !previousState)
                                    if(!disabled)
                                        set_domain_password('')
                                },
                                size: 'small'                   
                            }}
                        >                        
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            itemType='switch'
                            PropName="checked"
                            label={language.tokens['FORWARD_PARAMETER']}
                            name={language.tokens['FORWARD_PARAMETER']} 
                            size='small'
                            value={radio_button}
                            change={clickSwitchHandler}
                        />
                    </Col>
                </Row>             
                <Row className='ant-form-inline row-content-button'>
                    <Col flex={1}>
                        {
                            loading ?
                                <FormItem                             
                                    itemType="button"
                                    buttonClassName="login-form-button"
                                    buttonType="primary"
                                    htmlType="submit"
                                    buttonSize= 'large'
                                >
                                <Loading color={loading_spinner['loading_spinner']['white']}/>
                            </FormItem>
                            :
                            !button_status.status ?
                                <FormItem
                                    click={(e) => submithandler(e)}
                                    itemType="button"
                                    buttonClassName="login-form-button"
                                    buttonType="primary"
                                    htmlType="submit"
                                    buttonSize= 'large'
                                >
                                    {language.tokens['CREATE']}
                                </FormItem>
                               :
                                <FormItem                              
                                    itemType="button"
                                    disabled={true}
                                    buttonClassName="login-form-button"
                                    buttonType="primary"
                                    htmlType="submit"
                                    buttonSize= 'large'
                                >
                                    {language.tokens['CREATE']}
                                </FormItem> 
                        }
                    </Col>
                    <Col flex={4}></Col>
                </Row>  
                <Row className='ant-form-inline'>
                    <Col flex={1}>                 
                        {
                            button_status.error ?
                                <Alert message={button_status.error} type="error" showIcon/>
                            :null    
                        } 
                    </Col>
                    <Col flex={4}></Col>
                </Row>       
            </Form>
        </PanelBox>
    )
}

export default CreateLink;