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
import { timeframes } from '../../utils/constants';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Option } = Select;

const LinkDetail = (props) => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [bucket, setBucket] = useState(null);
  const [timeFrame, setTimeFrame] = useState('0');
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
  const handleChangeTimeFrame = (value) => {
    console.log(typeof value, value, 'value');
    setTimeFrame(value);
    let endDate = null;
    let startDate = null;

    switch (value) {
      case 'current': {
        endDate = moment();
        startDate = moment().startOf('month');
        break;
      }
      case 'prev': {
        endDate = moment().startOf('month');
        startDate = moment()
          .subtract(1, 'months')
          .startOf('month');
        break;
      }
      case 'prevYear': {
        endDate = moment().startOf('year');
        startDate = moment()
          .subtract(1, 'years')
          .startOf('year');
        break;
      }

      default: {
        endDate = moment();
        startDate = moment().subtract(value, 'days');
        break;
      }
    }

    setStartDate(startDate);
    setEndDate(endDate);
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
                disabled={timeFrame !== 'custom'}
              />
              <Select
                defaultValue={timeFrame}
                onChange={handleChangeTimeFrame}
                style={{ minWidth: 200 }}
              >
                {Object.keys(timeframes).map((timeFrameKey) => {
                  return (
                    <Option value={timeFrameKey}>
                      {timeframes[timeFrameKey]}
                    </Option>
                  );
                })}
              </Select>
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
