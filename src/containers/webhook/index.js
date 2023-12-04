import React, { useEffect, useState } from 'react'
import { Modal, Button, Input, Table, Spin, Divider, Form } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { AppCard } from '../../components/appCard'

import fs from 'fs'
// import PDFParser from "pdf2json";

const { Search } = Input
function Webhook() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [initialValue, setInitialValue] = useState({})
  const [isEditingMode, setIsEditingMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const [form] = Form.useForm()

  const [{ response, isLoading, error }, doFetch] = useFetch()

  const fetchWebhookList = async () => {
    await doFetch({
      url: `webhook/?page=${currentPage}&name=${searchValue}`,
      method: 'GET',
    })
  }
  const fetchWebhook = async (linkId) => {
    await doFetch({
      url: `webhook/${linkId}`,
      method: 'GET',
    })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const showModalEdit = (id) => {
    fetchWebhook(id)
    // change Modal to editing state
    // change action btn to update
    // set initial Value of webhook based on editingMode
    // after update webhook fetch list again
    // set editingMode to false
    //
  }
  const createNewWebhook = async (values) => {
    try {
      await doFetch({
        url: 'webhook',
        method: 'POST',
        data: {
          ...values,
        },
      })
      if (currentPage === 1) {
        fetchWebhookList()
      } else {
        setCurrentPage(1)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (e) {
    } finally {
    }
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    if (isEditingMode) {
      setIsEditingMode(false)
    }
    fetchWebhookList()
  }
  const searchByName = (value) => {
    setSearchValue(value)
  }

  useEffect(() => {
    fetchWebhookList()
  }, [currentPage])
  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1)
    } else {
      fetchWebhookList()
    }
  }, [searchValue])

  useEffect(() => {
    if (response && response.webhooks === undefined) {
      setIsEditingMode(true)
      setIsModalVisible(true)
      setInitialValue({ ...response })
    } else if (response && response.webhooks) {
      setInitialValue({})
    }
  }, [response])
  const columns = [
    {
      title: 'webhook ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'webhook Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <a type="primary" onClick={() => showModalEdit(record.id)}>
          Edit
        </a>
      ),
    },
  ]

  // const pdfParser = new PDFParser();

  // pdfParser.on("pdfParser_dataError", (errData) =>
  // 	console.error(errData.parserError),
  // );
  // pdfParser.on("pdfParser_dataReady", (pdfData) => {
  // 	fs.writeFile("./test.json", JSON.stringify(pdfData));
  // });

  // pdfParser.loadPDF("./test.pdf");

  return (
    <AppCard>
      <>
        <Button type="primary" onClick={showModal}>
          add webhook
        </Button>
        <Divider />
        <Modal
          title={isEditingMode ? 'Edit webhook' : 'Create webhook'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose>
          <Spin spinning={isLoading}>
            <Form
              form={form}
              scrollToFirstError
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={createNewWebhook}
              onFinishFailed={onFinishFailed}
              initialValues={initialValue}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'Please input your webhook Name' },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="URL"
                name="url"
                rules={[
                  { required: true, message: 'Please input your webhook URL' },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  {isEditingMode ? 'Update' : 'Submit'}
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
        <Spin spinning={isLoading}>
          <Search onSearch={searchByName} enterButton="Search" />
          <Divider />

          <Table
            columns={columns}
            dataSource={response ? response.webhooks : []}
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
      </>
    </AppCard>
  )
}

export default Webhook
