import React from 'react'
import { Row, Col } from 'antd'

export const LoginLayout = (props) => {
    return(
        <Row className="login-row" justify='space-around' align='middle' type='flex'>
            <Col span='8'>
                {props.children}
            </Col>
        </Row>
    )    
}

export default LoginLayout