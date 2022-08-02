import React from 'react'
import { Col, Modal, Row, Input, Divider, Button } from 'antd'
const { Search } = Input

export const SuccefullModal = (props) => {
  console.log(props)
  const {
    onCancel,
    onIsModalVisible,
    onCreateNewLink,
    onMassCreateResponses,
    copyToClipboard,
  } = props

  return (
    <Modal
      title="Created Link(s) Successfully"
      visible={onIsModalVisible}
      onCancel={onCancel}
      onOk={onCreateNewLink}
      cancelText={onMassCreateResponses.length > 1 ? 'Cancel' : 'Edit'}
      okText="Create New Link">
      <p>Here is Your Link(s), Enjoy</p>

      <Row className="links">
        {onMassCreateResponses.map((res, index) => {
          return (
            <>
              <Col span={24}>
                <Col span={17}>
                  <Search
                    value={res && res.redirectTo}
                    onSearch={copyToClipboard}
                    enterButton="Copy"
                  />
                  <span className="linksFrom">Created from: {res.url}</span>
                </Col>
                <Col span={1}>
                  <Divider type="vertical" />
                </Col>
                <Col span={6}>
                  <Button
                    type="dashed"
                    block
                    onClick={() => res && window.open(res.redirectTo)}>
                    Test Link
                  </Button>
                </Col>
              </Col>
              {onMassCreateResponses.length > 1 &&
                index !== onMassCreateResponses.length - 1 && <Divider />}
            </>
          )
        })}
      </Row>
    </Modal>
  )
}
