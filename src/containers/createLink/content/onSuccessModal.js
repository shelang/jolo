import React, { useState, useEffect } from 'react'
import { Button, Col, Divider, Modal, Row, Input, message } from 'antd'
import { useQuery } from '../../../hooks/queryParams'

const { Search } = Input

const OnSuccessModal = ({
  response,
  form,
  setEditMode,
  massCreateResponses,
  setMassCreateResponses,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  let query = useQuery()

  const createNewLink = () => {
    setIsModalVisible(false)
    form.resetFields()
  }
  useEffect(() => {
    response && setMassCreateResponses([...massCreateResponses, response])
    response && setIsModalVisible(true)
  }, [response])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response.redirectTo)
    message.success('Copied to Your Clipboard')
  }

  return (
    <Modal
      title="Created Link(s) Successfully"
      visible={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false)
        if (massCreateResponses.length <= 1) {
          setEditMode(true)
          query.set('isEditing', true)
        }
      }}
      onOk={createNewLink}
      cancelText={massCreateResponses.length > 1 ? 'Cancel' : 'Edit'}
      okText="Create New Link">
      <p>Here is Your Link(s), Enjoy</p>

      <Row className="links">
        {massCreateResponses.map((res, index) => {
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
              {massCreateResponses.length > 1 &&
                index !== massCreateResponses.length - 1 && <Divider />}
            </>
          )
        })}
      </Row>
    </Modal>
  )
}

export default OnSuccessModal
