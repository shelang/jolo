import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Table,
  Space,
  Spin,
  message,
  Divider,
  Input,
  Modal,
  QRCode,
} from 'antd'
import useFetch from '../../hooks/asyncAction'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { AppCard } from '../../components/appCard'
import moment from 'moment'

const { Search } = Input

const Links = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [linkHash, setLinkHash] = useState('')

  const [{ response, isLoading }, doFetch] = useFetch()

  const fetchLinks = async () => {
    await doFetch({
      url: `links?page=${currentPage}&q=${searchValue}`,
      method: 'GET',
    })
  }
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value)
    message.success('Copied to Your Clipboard')
  }
  const searchByName = (value) => {
    setSearchValue(value)
  }
  const downloadQRCode = () => {
    const canvas = document.querySelector('#myqrcode canvas')
    if (canvas) {
      const url = canvas.toDataURL()
      const a = document.createElement('a')
      a.download = 'QRCode.png'
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
  const showModal = (linkHash) => {
    setLinkHash(linkHash)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: 'Link ID',
      dataIndex: 'linkId',
      key: 'linkId',
    },
    {
      title: 'Link Hash',
      dataIndex: 'linkHash',
      key: 'linkHash',
    },
    {
      title: 'Created at',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (item) => moment(item).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(e) => navigate(`/dashboard/links/${record.linkId}`)}>
            View Report
          </a>
          <a
            onClick={(e) =>
              navigate(`./create-link?id=${record.linkId}&isEditing=true`)
            }>
            Edit
          </a>
          <a
            onClick={(e) =>
              copyToClipboard(`${window.location.origin}/r/${record.linkHash}`)
            }>
            Copy
          </a>
          <a
            onClick={() =>
              showModal(`${window.location.origin}/r/${record.linkHash}`)
            }>
            QRCode
          </a>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    fetchLinks()
  }, [currentPage])

  useDidMountEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1)
    } else {
      fetchLinks()
    }
  }, [searchValue])

  return (
    <AppCard>
      <Spin spinning={isLoading}>
        <Modal
          title="Link QR Code"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={downloadQRCode}
          okText="Download">
          <div id="myqrcode">
            <QRCode value={linkHash} bgColor="#fff" />
          </div>
        </Modal>
        <Search onSearch={searchByName} enterButton="Search" />
        <Divider />

        <Table
          columns={columns}
          dataSource={response ? response.links : []}
          pagination={{
            position: ['bottomCenter'],
            size: 'small',
            current: currentPage,
            total: currentPage * 4 + 40,
            onChange: (page) => {
              setCurrentPage(page)
            },
          }}
          style={{ width: '100%' }}
        />
      </Spin>
    </AppCard>
  )
}
export default Links
