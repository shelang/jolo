import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Space } from 'antd'
import useFetch from '../../hooks/asyncAction'
import { makingUrl } from '../../utils/makingUrl'
import { apiRoutes } from '../../utils/apiRoutes'
import { InfoTile } from '../infoTile'
import './style.scss'

const AgentNames = ({ queryParams }) => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const params = useParams()

  const fetchLinks = async () => {
    const linkedId = params.id
    const URL = makingUrl(apiRoutes.AGENT_NAME, linkedId, queryParams)
    await doFetch({
      url: URL,
      method: 'GET',
    })
  }

  useEffect(() => {
    fetchLinks()
  }, [])
  useEffect(() => {
    if (Object.keys(queryParams).length) {
      fetchLinks()
    }
  }, [queryParams.from, queryParams.to])

  const data = response?.data ?? Array.from(new Array(5))
  return (
    <>
      <p className="cardTitle">Top Browsers</p>

      <Row gutter={10} wrap>
        {data.map((browser, index) => {
          return (
            <Col flex={24 / data.length} key={index}>
              <InfoTile
                value={browser?.value}
                label={browser?.key}
                isLoading={isLoading}
                primary={index === 2 || index === 3}
              />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default AgentNames
