import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Row, Col } from 'antd'
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

      <div className="cardBody">
        {data.map((browser, index) => {
          const width = 90 / data.length
          return (
            <div style={{ width: `${width}%` }}>
              <InfoTile
                key={index}
                value={browser?.value}
                label={browser?.key}
                isLoading={isLoading}
                primary={index === 2 || index === 3}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AgentNames
