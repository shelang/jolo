import React from 'react'
import { Layout, Row, Col } from 'antd'
import '../styles/header.css'
import { Link } from 'react-router-dom'
import language from '../resources/js/languages_dict'

const { Header } = Layout

const CustomHeader = () => {

  const logOutHandler = () => {
  
  }
    return (
      <Header className='header-background'>
         <Row type="flex" justify="end" align="middle">
            <Col span={2}>
              <Link to='/logout' onClick={logOutHandler}>{language.tokens['LOG_OUT']}</Link>
            </Col>
         </Row>
      </Header>
    );
  };
  
  
  export default CustomHeader;