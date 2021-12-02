import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/asyncAction";
import { useHistory } from "react-router-dom";
import { Table, Space, Spin, message, Card } from "antd";

const Links = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [{ response, isLoading }, doFetch] = useFetch();

  const fetchLinks = async () => {
    await doFetch({
      url: `links?page=${currentPage}`,
      method: "GET",
    });
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    message.success("Copied to Your Clipboard");
  };

  const columns = [
    {
      title: "Link ID",
      dataIndex: "linkId",
      key: "linkId",
    },
    {
      title: "Link Hash",
      dataIndex: "linkHash",
      key: "linkHash",
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
          <a onClick={(e) => history.push(`./links/${record.linkId}`)}>
            View Report
          </a>
          <a
            onClick={(e) =>
              history.push(`./create-link?id=${record.linkId}&isEditing=true`)
            }
          >
            Edit
          </a>
          <a onClick={(e) => copyToClipboard(record.linkHash)}>Copy</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetchLinks();
  }, [currentPage]);

  return (
    <Card>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={response ? response.links : []}
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
};
export default Links;
