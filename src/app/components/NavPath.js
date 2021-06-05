import React from 'react'
import { Breadcrumb } from 'antd'


const NavPath = (props) => {
    // let data = []

    // const { data } = props

    // const bread = data.map((item)=>{
    //     return (
    //       <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
    //     )
    //   })
    return (
        <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>{props.data.pathname}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };
  
  
  export default NavPath;