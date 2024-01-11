import { Alert, Upload, Modal } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

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
      <Dragger {...onUploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
        <Alert
          style={{ marginBottom: 8, width: '90%', margin: 'auto' }}
          message="Only CSV, XLSX Format Are Acceptable"
          type="warning"
        />
      </Dragger>
    </Modal>
  )
}
