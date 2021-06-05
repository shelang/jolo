import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from '../actions/auth'
import { useDispatch } from 'react-redux'

export const LogOut = (props) => {
    const dispatch = useDispatch()

    const call_api = () => {
        dispatch(actions.logout())
    }

    useEffect(() => {
      call_api()
    }, [])

  return <Redirect to="/login" />;
};

export default LogOut;
