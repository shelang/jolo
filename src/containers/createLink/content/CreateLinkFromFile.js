import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Progress, Space, Typography } from 'antd'
import readXlsxFile from 'read-excel-file'
import { FromFileModal } from './fromFileModal'
import useFetch from '../../../hooks/asyncAction'
import { toast } from 'react-toastify'
import { FileAddOutlined } from '@ant-design/icons'

const { Title, Link } = Typography

const keysTemplate = ['title', 'url']

const CreateLinkFromFile = () => {
  const [isCreateLinkModalVisible, setIsCreateLinkModalVisible] =
    useState(false)
  const [normalizedLinks, setNormalizedLinks] = useState([])
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)
  const [fileList, setFileList] = useState([])
  const [percent, setPercent] = useState(0)

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {},
    onSuccess: () => {},
  })

  const fileFormats = {
    CSV: 'text/csv',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }

  const createNewLinks = useCallback(async () => {
    setIsCreateLinkModalVisible(false)

    for (let i = 0; i < normalizedLinks.length; i++) {
      try {
        await doFetch({
          url: 'links',
          method: 'POST',
          data: {
            ...normalizedLinks[i],
          },
        })
      } catch (e) {
        setMassCreateErrorCount((prevCount) => prevCount + 1)
      } finally {
        setPercent((prevPercent) =>
          Math.floor(prevPercent + 100 / normalizedLinks.length),
        )
      }
    }

    if (massCreateErrorCount) {
      toast.success('Links Successfully Created')
    } else {
    }
  }, [normalizedLinks])

  const normalizeXlsxFile = (rows) => {
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
  }
  useEffect(() => {
    fileList.forEach((file) => {
      switch (file.type) {
        case fileFormats.CSV: {
        }
        case fileFormats.XLSX: {
          readXlsxFile(fileList[0]).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            normalizeXlsxFile(rows)
          })
        }
        default: {
        }
      }
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
  const twoColors = { '0%': '#108ee9', '100%': '#87d068' }

  return (
    <Space>
      <FromFileModal
        onIsCreateLinkModalVisible={isCreateLinkModalVisible}
        onCancel={() => setIsCreateLinkModalVisible(false)}
        onCreateNewLinks={createNewLinks}
        onUploadProps={uploadProps}
      />
      <Link level={5} onClick={() => setIsCreateLinkModalVisible(true)}>
        <FileAddOutlined style={{ marginRight: 4 }} />
        Creating Link From File
      </Link>
      {isLoading && (
        <>
          <div
            style={{ width: 200, marginBottom: -8, flexDirection: 'column' }}>
            <Progress percent={percent} strokeColor={twoColors} />
          </div>
          <Alert
            message="Please Wait untill all your links creates"
            type="warning"
          />
        </>
      )}
    </Space>
  )
}

export default CreateLinkFromFile
