import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/asyncAction';
import { useHistory } from 'react-router-dom';
import { Row, Table, Space, Spin, message } from 'antd';

const Links = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [{ response, isLoading, error }, doFetch] = useFetch();
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    await doFetch({
      url: `links?page=${currentPage}`,
      method: 'GET',
    });
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    message.success('Copied to Your Clipboard');
  };

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
        <Space size='middle'>
          <a onClick={(e) => history.push(`./links/${record.linkId}`)}>
            View Report
          </a>
          {/* <a onClick={(e) => history.push(`./link/${record.linkId}`)}>Edit</a> */}
          <a onClick={(e) => copyToClipboard(record.linkHash)}>Copy</a>
        </Space>
      ),
    },
  ];
  return (
    <Row>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={
            response
              ? response.links
              : [
                  { linkId: 1, linkHash: '12', createAt: '12' },
                  { linkId: 2, linkHash: '12', createAt: '12' },
                  { linkId: 3, linkHash: '12', createAt: '12' },
                  { linkId: 4, linkHash: '12', createAt: '12' },
                  { linkId: 5, linkHash: '12', createAt: '12' },
                  { linkId: 6, linkHash: '12', createAt: '12' },
                  { linkId: 7, linkHash: '12', createAt: '12' },
                  { linkId: 8, linkHash: '12', createAt: '12' },
                  { linkId: 9, linkHash: '12', createAt: '12' },
                  { linkId: 10, linkHash: '12', createAt: '12' },
                  { linkId: 11, linkHash: '12', createAt: '12' },
                  { linkId: 12, linkHash: '12', createAt: '12' },
                  { linkId: 13, linkHash: '12', createAt: '12' },
                  { linkId: 14, linkHash: '12', createAt: '12' },
                  { linkId: 15, linkHash: '12', createAt: '12' },
                  { linkId: 16, linkHash: '12', createAt: '12' },
                  { linkId: 17, linkHash: '12', createAt: '12' },
                  { linkId: 18, linkHash: '12', createAt: '12' },
                  { linkId: 19, linkHash: '12', createAt: '12' },
                  { linkId: 20, linkHash: '12', createAt: '12' },
                  { linkId: 21, linkHash: '12', createAt: '12' },
                  { linkId: 22, linkHash: '12', createAt: '12' },
                  { linkId: 23, linkHash: '12', createAt: '12' },
                  { linkId: 24, linkHash: '12', createAt: '12' },
                ]
          }
          pagination={{
            position: ['bottomCenter'],
            size: 'small',
            current: currentPage,
            total: response ? response.links / 10 : 0,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
          style={{ width: '100%' }}
        />
      </Spin>
    </Row>
  );
};
export default Links;
