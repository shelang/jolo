import React from 'react'
import { AppCard } from '../../components/appCard'
import CreateLinkForm from './content/CreateLinkForm'
import CreateLinkFromFile from './content/CreateLinkFromFile'
import './style.scss'

function CreateLink() {
  return (
    <AppCard>
      <CreateLinkFromFile />
      <CreateLinkForm />
    </AppCard>
  )
}

export default CreateLink
