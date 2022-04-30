import React, { useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Modal, Upload } from 'antd'
import useFetch from '../../../hooks/asyncAction'
import { toast } from 'react-toastify'
import readXlsxFile from 'read-excel-file'

const keysTemplate = ['title', 'url']

const CreateLinkFromFileModal = ({
  setIsCreateLinkModalVisible,
  isCreateLinkModalVisible,
  massCreateErrorCount,
}) => {
  //Need Testing
  const [normalizedLinks, setNormalizedLinks] = useState([])
  const [fileList, setFileList] = useState([])
  const [{ response, isLoading, error }, doFetch] = useFetch()

  useEffect(() => {
    readXlsxFile(fileList[0]).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      const normalizedRows = rows.reduce((total, row, index) => {
        if (index === 0) {
          return total
        } else {
          total.push({})
          keysTemplate.map((key, keyIndex) => {
            if (row[keyIndex]) {
              return (total[index - 1][key] = row[keyIndex])
            } else {
              toast.error(`${key} Is Required`)
            }
          })
          return total
        }
      }, [])

      console.log(normalizedRows, 'normalizedRows')
      setNormalizedLinks(normalizedRows)
    })
  }, [fileList])

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  const createNewLinks = () => {
    normalizedLinks.forEach(async (normalizedLink) => {
      try {
        await doFetch({
          url: 'links',
          method: 'POST',
          data: {
            ...normalizedLink,
          },
        })
      } catch (e) {}
    })

    if (massCreateErrorCount) {
      toast.error('Creation Failed')
    } else {
      toast.success('Links Successfully Created')
      setIsCreateLinkModalVisible(false)
    }
  }
  return (
    <Modal
      title="Create Links From File"
      visible={isCreateLinkModalVisible}
      onCancel={() => setIsCreateLinkModalVisible(false)}
      onOk={createNewLinks}
      okText="Create Links">
      <p>Please Add Your File</p>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  )
}

export default CreateLinkFromFileModal
