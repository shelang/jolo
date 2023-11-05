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
  Tag,
} from 'antd'
import useFetch from '../../hooks/asyncAction'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { AppCard } from '../../components/appCard'
import moment from 'moment'
import { parseCookies } from 'nookies'

const { Search } = Input

const Links = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [linkHash, setLinkHash] = useState('')

  const [{ response, isLoading }, doFetch] = useFetch()

  const fetchLinks = async () => {
    const cookies = parseCookies()

    await doFetch({
      url: `links/workspaces/${cookies['x-wsid']}?page=${currentPage}&q=${searchValue}`,
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
  const tagColors = {
    ACTIVE: 'blue',
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Link Hash',
      dataIndex: 'hash',
      key: 'hash',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={tagColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Redirect Code',
      dataIndex: 'redirectCode',
      key: 'redirectCode',
      render: (tag) => <Tag>{tag}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(e) => navigate(`/dashboard/links/${record.id}`)}>
            View Report
          </a>
          <a
            onClick={(e) =>
              navigate(`./create-link?id=${record.id}&isEditing=true`)
            }>
            Edit
          </a>
          <a
            onClick={(e) =>
              copyToClipboard(`${window.location.origin}/r/${record.hash}`)
            }>
            Copy
          </a>
          <a
            onClick={() =>
              showModal(`${window.location.origin}/r/${record.hash}`)
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
