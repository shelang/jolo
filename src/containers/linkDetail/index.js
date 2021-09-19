import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/asyncAction';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  DatePicker,
  Row,
  Col,
  Spin,
  Card,
  Typography,
  Select,
  Space,
} from 'antd';
import { encodeQueryData } from '../../utils/queryParams';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Option } = Select;

const LinkDetail = (props) => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [bucket, setBucket] = useState(null);
  const [{ response, isLoading, error }, doFetch] = useFetch();

  useEffect(() => {
    fetchLinkDetail();
  }, [startDate, endDate, bucket]);

  const fetchLinkDetail = async () => {
    const queryParams = encodeQueryData({
      from: startDate.utc().format(),
      to: endDate.utc().format(),
      bucket,
    });
    await doFetch({
      url: `analytics/${props.match.params.id}?${queryParams}`,
      method: 'GET',
    });
  };
  const handleChangeDates = (dates, datesString) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };
  const handleChangeBucket = (value) => {
    setBucket(value);
  };

  const options = {
    title: {
      text: 'Clicks',
    },
    series: [
      {
        data: response ? response.bucket : [],
      },
    ],
  };

  return (
    <Card>
      <Spin spinning={isLoading}>
        <Row>
          <Col span={24}>
            <Space>
              <RangePicker
                value={[startDate, endDate]}
                onChange={handleChangeDates}
              />
              <Select defaultValue={bucket} onChange={handleChangeBucket}>
                <Option value={null}>None</Option>
                <Option value='hour'>Hourly</Option>
                <Option value='daily'>Daily</Option>
                <Option value='montly'>Montly</Option>
              </Select>
            </Space>
          </Col>
          <br />
          <Col span={24}>
            <Title level={3}>Count: {response && response.count}</Title>
          </Col>
          <br />
          <Col span={24}>
            {response && response.bucket && (
              <HighchartsReact highcharts={Highcharts} options={options} />
            )}
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};
export default LinkDetail;
