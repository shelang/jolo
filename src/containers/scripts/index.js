import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/asyncAction";
import { useHistory } from "react-router-dom";
import { Input, Table, Space, Spin, Divider, Card, Form } from "antd";
import { Modal, Button } from "antd";

const { TextArea } = Input;

function Scripts() {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [{ response, isLoading, error }, doFetch] = useFetch();

  const fetchScripts = async () => {
    await doFetch({
      url: `script/?page=${currentPage}`,
      method: "GET",
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const createNewScripts = async (values) => {
    try {
      await doFetch({
        url: "script",
        method: "POST",
        data: {
          name: values.name, // script name, useful for searching in UI
          timeout: 180000, // timeout that after that user will be redirected to next page
          content: values.content, // js script that should be load on the page
        },
      });
      if (currentPage === 1) {
        fetchScripts();
      } else {
        setCurrentPage(1);
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (e) {
    } finally {
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchScripts();
  }, [currentPage]);

  const columns = [
    {
      title: "Script ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Script Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={(e) =>
              history.push(
                `./create-script?id=${record.scriptId}&isEditing=true`
              )
            }
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Button type="primary" onClick={showModal}>
        add script
      </Button>
      <Divider />
      <Modal
        title="Create Script"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={createNewScripts}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="name"
            name="name"
            rules={[
              { required: true, message: "Please input your Script Name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="content"
            name="content"
            rules={[
              { required: true, message: "Please input your Script Content" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={response ? response.scripts : []}
          pagination={{
            position: ["bottomCenter"],
            size: "small",
            current: currentPage,
            total: currentPage * 4 + 40,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          style={{ width: "100%" }}
        />
      </Spin>
    </Card>
  );
}

export default Scripts;
