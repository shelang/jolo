import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/asyncAction';
import { useHistory } from 'react-router-dom';
import { Row, Table, Col, Button } from 'antd';

const Links = () => {
  const history = useHistory();
  const [{ response, isLoading, error }, doFetch] = useFetch();
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    await doFetch({
      url: 'links',
      method: 'GET',
    });
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
  ];
  return (
    <Row>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={response ? response.links : []}
          pagination={{ position: ['bottomCenter'], size: 'small' }}
          style={{ width: '100%' }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                event.preventDefault();
                history.push(`./links/${record.linkId}`);
              },
            };
          }}
        />
      </Spin>
    </Row>
  );
};
export default Links;
