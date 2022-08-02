import React, { useEffect, useState } from 'react'
import { Spin, List, Typography } from 'antd'
import { AppCard } from '../appCard'
import useFetch from '../../hooks/asyncAction'

const { Text, Paragraph } = Typography
const FiveTopIp = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const [IPS, setIPS] = useState([])

  const fetchLinks = async () => {
    await doFetch({
      url: 'analytics/last/ips',
      method: 'GET',
    })
  }

  const findIPSLocation = async () => {
    const rawIps = response.data.slice(0, 5)

    for (let Ip of rawIps) {
      try {
        const { city, country, timezone, utc_offset } = await fetch(
          `https://ipapi.co/${Ip.key}/json/`,
        )
          .then((res) => res)
          .then((res) => res.json())

        setIPS((prevState) => [
          ...prevState,
          {
            key: Ip.key,
            city,
            country,
            timezone,
            utc_offset,
          },
        ])
      } catch (e) {
        setIPS((prevState) => [
          ...prevState,
          {
            key: Ip.key,
            city: 'No Data',
            country: 'No Data',
            timezone: 'No Data',
            utc_offset: 'No Data',
          },
        ])
      }
    }
  }

  const createAddress = ({ city, country, timezone, utc_offset }) => {
    return country + ' - ' + city + ' - ' + timezone + ' - ' + utc_offset
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  useEffect(() => {
    if (response && response.data) {
      findIPSLocation()
    }
  }, [response])

  //ipapi.co/5.117.206.224/json/
  return (
    <AppCard title="Five Last Ips">
      <Spin spinning={isLoading}>
        <List
          dataSource={IPS}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text style={{ fontWeight: 700, marginBottom: 4 }}>
                {item.key}
              </Text>
              <Paragraph style={{ color: '#92918A' }}>
                {createAddress(item)}
              </Paragraph>
            </List.Item>
          )}
        />
      </Spin>
    </AppCard>
  )
}

export default FiveTopIp
