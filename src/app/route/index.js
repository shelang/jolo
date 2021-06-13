import React from 'react'
import LinksList from '../screens/LinksList'
import CreateLink from '../screens/CreateLink'
import CreateStatus from '../screens/CreateStatus'
import LogOut from '../screens/LogOut'

export const childRoutes = [
  {
    'path':'/create',
    'component': CreateLink,
    'exactly': true,
  },
  {
    'path':'/list',
    'component': LinksList
  },
  {
    'path':'/createStatus',
    'component': CreateStatus
  },
  {
    'path':'/logout',
    'component': LogOut
  }
];

