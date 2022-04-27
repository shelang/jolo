import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Card, Form } from 'antd'
import { booleanEnum } from '../../utils/constants'
import { useQuery } from '../../hooks/queryParams'
import CreateLinkForm from './content/createLinkForm'
import CreateLinkFromFile from './content/createLinkFromFile'
import CreateLinkFromFileModal from './content/createLinkFromFileModal'
import OnSuccessModal from './content/onSuccessModal'
import './style.scss'

function CreateLink() {
  let query = useQuery()
  const [form] = Form.useForm()

  const [massCreateResponses, setMassCreateResponses] = useState([])

  const [editMode, setEditMode] = useState(booleanEnum[query.get('isEditing')])
  const [linkId, setLinkId] = useState(query.get('id'))
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)
  const [isCreateLinkModalVisible, setIsCreateLinkModalVisible] =
    useState(false)

  const [linkData, fetchLinkData] = useFetch()

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1)
    },
  })

  const onFinishForm = async (data) => {
    const id = (response && response.id) || linkId
    await doFetch({
      url: editMode ? `links/${id}` : `links`,
      method: editMode ? 'PUT' : 'POST',
      data: data,
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFetchLinkData = async () => {
    await fetchLinkData({
      url: `links/${linkId}`,
      method: 'GET',
    })
  }

  useEffect(() => {
    if ((response && response.id) || linkId) {
      onFetchLinkData()
    }
  }, [linkId])

  return (
    <Card>
      <OnSuccessModal
        response={response}
        query={query}
        form={form}
        setEditMode={setEditMode}
        massCreateResponses={massCreateResponses}
        setMassCreateResponses={setMassCreateResponses}
      />

      <CreateLinkFromFileModal
        setIsCreateLinkModalVisible={setIsCreateLinkModalVisible}
        isCreateLinkModalVisible={isCreateLinkModalVisible}
      />

      <CreateLinkFromFile
        setIsCreateLinkModalVisible={setIsCreateLinkModalVisible}
      />
      <CreateLinkForm
        form={form}
        onFinishFailed={onFinishFailed}
        isLoading={isLoading}
        linkData={linkData}
        linkId={linkId}
        onFinishForm={onFinishForm}
      />
    </Card>
  )
}

export default CreateLink
