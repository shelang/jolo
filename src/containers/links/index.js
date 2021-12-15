import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/asyncAction";
import { useHistory } from "react-router-dom";
import { Table, Space, Spin, message, Card, Input } from "antd";
const { Search } = Input;

const Links = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLink, setSelectedLink] = useState("");
  const [{ response, isLoading }, doFetch] = useFetch();

  const fetchLinks = async (searchText) => {
    let query = "";
    if (searchText) {
      query = `search=${searchText}&page=${currentPage}`;
    } else {
      query = `page=${currentPage}`;
    }
    await doFetch({
      url: `links?${query}`,
      method: "GET",
    });
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    message.success("Copied to Your Clipboard");
  };

  const onSearch = async (value) => {
    fetchLinks(value);
  };

  useEffect(() => {
    fetchLinks();
  }, [currentPage]);
  useEffect(() => {
    fetchLinks();
  }, [selectedLink]);

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
  return (
    <Card>
      <Search
        placeholder="Search..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(value) => onSearch(value)}
      />

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
