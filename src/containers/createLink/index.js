import React from 'react'
import { Card } from 'antd'
import './style.scss'
import CreateLinkForm from './content/CreateLinkForm'
import CreateLinkFromFile from './content/CreateLinkFromFile'

function CreateLink() {
  return (
    <Card>
      <CreateLinkFromFile />
      <CreateLinkForm />
    </Card>
  )
}

export default CreateLink
