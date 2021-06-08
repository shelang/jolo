import React from 'react'
// import { Route, Switch } from 'react-router-dom'
import LinksList from '../screens/LinksList'
import CreateLink from '../screens/CreateLink'

export const childRoutes = [
  {
    'path':'/create',
    'component': CreateLink,
    'exactly': true,
  },
  {
    'path':'/list',
    'component': LinksList
  }
];

