import React, { useState } from 'react'
import { Table } from 'antd';
import PanelBox from '../components/PanelBox'
import language from '../resources/js/languages_dict'

const LinksList = () => {

    const [sorted_info, set_sorted_info] = useState(null)

    const columns = [
        {
          title: 'Link Id',
          dataIndex: 'linkid',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Link Hash',
          dataIndex: 'linkhash',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
          title: 'Create At',
          dataIndex: 'address',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
        },
        {
            title: 'Actions',
            dataIndex: 'name',
        }
      ];
      
    const data = [
        {
          key: '1',
          name: 'John Brown',
          linkhash: "dfdfleip",
          linkid: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          linkhash: "dfdsropo",
          linkid: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          linkhash: "vbhiuut",
          linkid: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Jim Red',
          linkhash: "opefsDDF",
          linkid: 32,
          address: 'London No. 2 Lake Park',
        },
      ];

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        set_sorted_info(sorter)
    }
    return(
        <PanelBox title={language.tokens['LINKS_LIST_PAGE']} className='panel-container'>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </PanelBox>
    )
}

export default LinksList