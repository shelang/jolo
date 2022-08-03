import React, { useState, useEffect } from 'react'
import { Col, Row, Typography } from 'antd'
import readXlsxFile from 'read-excel-file'
import { FromFileModal } from './fromFileModal'
import useFetch from '../../../hooks/asyncAction'
import { toast } from 'react-toastify'
const { Title, Link } = Typography

const keysTemplate = ['title', 'url']

const CreateLinkFromFile = () => {
  const [isCreateLinkModalVisible, setIsCreateLinkModalVisible] =
    useState(false)
  const [normalizedLinks, setNormalizedLinks] = useState([])
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)
  const [fileList, setFileList] = useState([])

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1)
    },
  })

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

  return (
    <>
      <FromFileModal
        onIsCreateLinkModalVisible={isCreateLinkModalVisible}
        onCancel={() => setIsCreateLinkModalVisible(false)}
        onCreateNewLinks={createNewLinks}
        onUploadProps={uploadProps}
      />
      <Row>
        <Col md={20} xs={24}></Col>
        <Col md={4} xs={24}>
          <Link level={5} onClick={() => setIsCreateLinkModalVisible(true)}>
            Creating Link From File
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default CreateLinkFromFile
