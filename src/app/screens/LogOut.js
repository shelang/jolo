import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from '../actions/auth'
import { useDispatch } from 'react-redux'

export const LogOut = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(actions.logout())
    }, [])

  return <Redirect to="/login" />;
};

export default LogOut;
