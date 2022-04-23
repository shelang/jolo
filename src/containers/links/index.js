import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import { useHistory } from 'react-router-dom'
import {
  Table,
  Space,
  Spin,
  message,
  Card,
  Divider,
  Input,
  Tooltip,
} from 'antd'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { AreaChartOutlined, CopyFilled, EditFilled } from '@ant-design/icons'
import { tooltips } from '../../utils/constants'

const { Search } = Input

const Links = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

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
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(e) => history.push(`./links/${record.linkId}`)}>
            <Tooltip placement="bottom" title={tooltips.viewReportAction}>
              <AreaChartOutlined style={{ fontSize: '1.3rem' }} />
            </Tooltip>
          </a>
          <a
            onClick={(e) =>
              history.push(`./create-link?id=${record.linkId}&isEditing=true`)
            }>
            <Tooltip placement="bottom" title={tooltips.editItemAction}>
              <EditFilled style={{ fontSize: '1.3rem' }} />
            </Tooltip>
          </a>
          <a onClick={(e) => copyToClipboard(record.linkHash)}>
            <Tooltip placement="bottom" title={tooltips.copyItemAction}>
              <CopyFilled style={{ fontSize: '1.3rem' }} />
            </Tooltip>
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
    <Card>
      <Spin spinning={isLoading}>
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
    </Card>
  )
}
export default Links
