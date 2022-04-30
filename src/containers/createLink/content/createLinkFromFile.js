import { Col, Row, Typography } from 'antd'
import React from 'react'

const CreateLinkFromFile = ({ setIsCreateLinkModalVisible }) => {
  const { Title, Link } = Typography

  return (
    <Row>
      <Col md={20} xs={24}>
        <Title>Creating Link</Title>
      </Col>
      <Col md={4} xs={24}>
        <Link level={5} onClick={() => setIsCreateLinkModalVisible(true)}>
          Creating Link From File
        </Link>
      </Col>
    </Row>
  )
}

export default CreateLinkFromFile
