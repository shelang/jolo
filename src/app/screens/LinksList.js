import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import PanelBox from '../components/PanelBox'
import language from '../resources/js/languages_dict'
import '../styles/links_list.css'
// import loading_spinner from '../resources/js/loading_spinner'
// import Loading from '../components/Loading'
import * as actions from '../actions'
import FormItem from '../components/FormItem'

const LinksList = () => {
    const token = useSelector(state => state.app.token)
    const data_list = useSelector(state => state.links_list.data)
    const loading = useSelector(state => state.links_list.loading)
    const dispatch = useDispatch()

    const [pagination, set_pagination] = useState({}) //check it 
    const [columns] = useState([
        { title: language.tokens['LINK_Id'], dataIndex: 'linkId' },
        { title: language.tokens['LINK_HASH'], dataIndex: 'linkHash' },
        { title: language.tokens['CREATE_AT'], dataIndex: 'createAt' },
        { title: language.tokens['ACTIONS'], dataIndex: 'actions', 
            render: (_, record) => (
            <>
                <Space>
                    <FormItem
                      // click={props.onSubmitForm}
                      itemType="button"
                      // buttonClassName="login-form-button"
                      htmlType="submit"
                    >
                        {language.tokens['VIEW']}
                    </FormItem>
                  <a><EditOutlined /></a>
                  <Popconfirm 
                      title={language.tokens['SURE_TO_DELETE']}
                      icon={<QuestionCircleOutlined style={{ color: 'red' }}/>} 
                      size="middle"
                      onConfirm={() => deleteItemHandler(record.linkId, token)}
                    >  
                        <a><DeleteOutlined /></a>
                  </Popconfirm>
                </Space>    
            </>
            )
        }
    ])
    
    const get_data = (params = {}) => {
    if(data_list.length === 0 )
        dispatch(actions.linksList({ params : { token, ...params } }))
    }
    
    //load first page(1)
    useEffect(() => get_data({ page : 1, results : 10 }), [])

    const changePageHandler = (pagination) => {
    const pager = pagination
    pager.current = pagination.current
    set_pagination(pager)
      get_data({ 
        page : pagination.current, 
        results : pagination.pageSize 
      })
    }

    const deleteItemHandler = (id, user_token) => {
      dispatch(actions.removeItemStart(id, user_token))
    }
   
    let list_items
    if(data_list && data_list !== undefined){
      list_items = ( <Table 
            columns={columns}
            dataSource={data_list}
            onChange={changePageHandler}
            bordered
            pagination={false}
            scroll={{ y: 300 }}
            rowKey={record => record.linkId.toString()}
            loading={loading}
            // (<Loading color={loading_spinner['loading_spinner']['blue']}/>)
        />)
    } 
      return(
          <PanelBox title={language.tokens['LINKS_LIST_PAGE']} className='panel-container'>
            {list_items}
          </PanelBox>
      )
    }

export default LinksList