import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import { parseCookies, setCookie } from 'nookies'
import './style.scss'

const AcceptCookies = () => {
  const [showCookie, setShowCookie] = useState(false)

  const handleShowCookie = () => {
    setShowCookie(false)
    setCookie(null, 'isCookieAccepted', 'true', {
      maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
    })
  }

  useEffect(() => {
    const cookies = parseCookies()
    if (!cookies.isCookieAccepted) {
      setCookie(null, 'isCookieAccepted', 'false', {
        maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
      })
    } else {
      const res = JSON.parse(cookies.isCookieAccepted)

      if (res) {
        setShowCookie(!res)
      }
    }
  }, [])

  return (
    <Row className={`accept-cookies-container ${showCookie && 'hide'}`}>
      <Col flex="1 1 800px" className="info">
        <h1>We value your privacy</h1>
        <span>
          this website uses cookies to improve performance and enhance the user
          experience
        </span>
      </Col>
      <Col flex="1 1 200px" className="cookies-btn">
        <Button type="primary" size="large" onClick={handleShowCookie}>
          I understand
        </Button>
      </Col>
    </Row>
  )
}

export default AcceptCookies
