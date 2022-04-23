import React, { useEffect } from 'react';
import useFetch from '../../hooks/asyncAction';
import { Input, message, Spin, Button, Card } from 'antd';

const { Search } = Input;

const Profile = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch();

  const createToken = async () => {
    try {
      await doFetch({
        url: 'users/api-token',
        method: 'POST',
      });
    } catch (e) {}
  };
  const fetchProfile = async () => {
    try {
      await doFetch({
        url: 'users/me',
        method: 'GET',
      });
    } catch (e) {}
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response.token);
    message.success('Copied to Your Clipboard');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Card>
      <Spin spinning={isLoading}>
        {response && response.token ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 20 }}>Token:</span>
            <Search
              readOnly
              style={{ width: 300 }}
              value={response && response.token}
              onSearch={copyToClipboard}
              enterButton="Copy"
            />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button type="primary" onClick={createToken}>
              Create
            </Button>
          </div>
        )}
      </Spin>
    </Card>
  );
};

export default Profile;
