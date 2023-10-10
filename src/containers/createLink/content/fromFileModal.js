import { Button, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export const FromFileModal = (props) => {
  const {
    onIsCreateLinkModalVisible,
    onCancel,
    onCreateNewLinks,
    onUploadProps,
  } = props

  return (
    <Modal
      title="Create Links From File"
      open={onIsCreateLinkModalVisible}
      onCancel={onCancel}
      onOk={onCreateNewLinks}
      okText="Create Links">
      <p>Please Add Your File</p>
      <Upload {...onUploadProps}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  )
}
