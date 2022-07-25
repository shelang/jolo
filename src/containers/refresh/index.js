import React, { useEffect } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const RefreshToken = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()

  const history = useHistory()

  const refreshToken = () => {
    const cookies = parseCookies()
    const user = JSON.parse(cookies.user)
    console.log(cookies, 'cookies')
    if (user) {
      setCookie(
        null,
        'user',
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
      setCookie(null, 'user', JSON.stringify(response), {
        maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
      })
      history.goBack()
    }
  }, [response])

  useEffect(() => {
    if (error && error.status === 401) {
      destroyCookie(null, 'user')
      history.push('/login')
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