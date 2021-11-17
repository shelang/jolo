import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/asyncAction";
import { useHistory } from "react-router-dom";
import { Row, Table, Space, Spin, message } from "antd";

function Scripts(props) {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [{ response, isLoading, error }, doFetch] = useFetch();

  const fetchScripts = async () => {
    await doFetch({
      url: `scripts?page=${currentPage}`,
      method: "GET",
    });
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    message.success("Copied to Your Clipboard");
  };
  const columns = [
    {
      title: "Script ID",
      dataIndex: "scriptId",
      key: "scriptId",
    },
    {
      title: "Script Hash",
      dataIndex: "scriptHash",
      key: "scriptHash",
    },
    {
      title: "Created at",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(e) => history.push(`./scripts/${record.scriptId}`)}>
            View Report
          </a>
          <a
            onClick={(e) =>
              history.push(
                `./create-script?id=${record.scriptId}&isEditing=true`
              )
            }
          >
            Edit
          </a>
          <a onClick={(e) => copyToClipboard(record.scriptHash)}>Copy</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetchScripts();
  }, [currentPage]);

  return (
    <Row>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={response ? response.scripts : []}
          pagination={{
            position: ["bottomCenter"],
            size: "small",
            current: currentPage,
            total: currentPage + 4,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          style={{ width: "100%" }}
        />
      </Spin>
    </Row>
  );
}

export default Scripts;
