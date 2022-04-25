import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Card } from 'antd'
import { booleanEnum } from '../../utils/constants'
import { useQuery } from '../../hooks/queryParams'
import CreateLinkForm from './content/createLinkForm'
import CreateLinkFromFile from './content/createLinkFromFile'
import CreateLinkFromFileModal from './content/createLinkFromFileModal'
import OnSuccessModal from './content/onSuccessModal'
import './style.scss'

function CreateLink() {
  let query = useQuery()
  const [massCreateResponses, setMassCreateResponses] = useState([])

  const [editMode, setEditMode] = useState(booleanEnum[query.get('isEditing')])
  const [linkId, setLinkId] = useState(query.get('id'))
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)
  const [isCreateLinkModalVisible, setIsCreateLinkModalVisible] =
    useState(false)

  const [formData, setFormData] = useState([])

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1)
    },
  })
  const [linkData, fetchLinkData] = useFetch()

  const onFinishForm = async (data) => {
    const { webhookId } = data
    const id = (response && response.id) || linkId

    await doFetch({
      url: editMode ? `links/${id}` : `links`,
      method: editMode ? 'PUT' : 'POST',
      data: editMode ? data : { ...data, webhookId: webhookId && webhookId },
    })

    // if (editMode) {
    //   const id = (response && response.id) || linkId
    //   await doFetch({
    //     url: `links/${id}`,
    //     method: 'PUT',
    //     data: {
    //       ...data,
    //       type: iframe
    //       ? 'IFRAME'
    //       : scriptId && scriptId
    //       ? 'SCRIPT'
    //       : 'REDIRECT',
    //       scriptId: scriptId && scriptId,
    //     },
    //   })
    // } else {
    //   await doFetch({
    //     url: 'links',
    //     method: 'POST',
    //     data: {
    //       ...data,
    //       type: iframe
    //         ? 'IFRAME'
    //         : scriptId && scriptId
    //         ? 'SCRIPT'
    //         : 'REDIRECT',
    //       scriptId: scriptId && scriptId,
    //       webhookId: WebhookId && WebhookId,
    //     },
    //   })
    // }
  }

  console.log('response', response)

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
    if (linkId) {
      onFetchLinkData()
    }
  }, [linkId])

  return (
    <Card>
      <OnSuccessModal
        response={response} //response ?
        setEditMode={setEditMode}
        query={query}
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
        onFinishFailed={onFinishFailed}
        isLoading={isLoading}
        linkData={linkData}
        setFormData={setFormData}
        onFinishForm={onFinishForm}
      />
    </Card>
  )
}

export default CreateLink
