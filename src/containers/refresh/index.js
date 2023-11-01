import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const RefreshToken = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const navigate = useNavigate()

  const refreshToken = () => {
    const cookies = parseCookies()

    const user = JSON.parse(cookies.linkComposerUser)

    if (user) {
      setCookie(
        null,
        'linkComposerUser',
        JSON.stringify({ ...user, token: user.refresh }),
        {
          maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
        },
      )
    }
    doFetch({
      url: 'login/refresh',
      method: 'POST',
    })
  }

  useEffect(() => {
    refreshToken()
  }, [])

  useEffect(() => {
    if (response) {
      setCookie(null, 'linkComposerUser', JSON.stringify(response), {
        maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
      })
      navigate(-1)
    }
  }, [response])

  useEffect(() => {
    if (error && error.status === 401) {
      destroyCookie(null, 'linkComposerUser')
      navigate('/login')
    }
  }, [error])

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Spin />
    </div>
  )
}

export default RefreshToken
