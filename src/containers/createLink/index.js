import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/asyncAction'
import { Card } from 'antd'
import { booleanEnum } from '../../utils/constants'
import { useQuery } from '../../hooks/queryParams'
import CreateLinkForm from './content/createLinkForm'
import CreateScriptModal from './content/createScriptModal'
import CreateLinkFromFile from './content/createLinkFromFile'
import CreateLinkFromFileModal from './content/createLinkFromFileModal'
import CreateWebHookModal from './content/createWebHookModal'
import OnSuccessModal from './content/onSuccessModal'
import './style.scss'

function CreateLink() {
  let query = useQuery()

  const [iframe, setIframe] = useState(false)
  const [massCreateResponses, setMassCreateResponses] = useState([])

  const [editMode, setEditMode] = useState(booleanEnum[query.get('isEditing')])
  const [linkId, setLinkId] = useState(query.get('id'))
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)
  const [isCreateLinkModalVisible, setIsCreateLinkModalVisible] =
    useState(false)

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1)
    },
  })
  const [linkData, fetchLinkData] = useFetch()

  const onFinish = async ({ iframe, ...values }) => {
    // if (editMode) {
    //   const id = (response && response.id) || linkId
    //   await doFetch({
    //     url: `links/${id}`,
    //     method: 'PUT',
    //     data: {
    //       ...values,
    //       scriptId: selectedScript && selectedScript.value,
    //       type: iframe
    //         ? 'IFRAME'
    //         : selectedScript && selectedScript.value
    //         ? 'SCRIPT'
    //         : 'REDIRECT',
    //     },
    //   })
    // } else {
    //   await doFetch({
    //     url: 'links',
    //     method: 'POST',
    //     data: {
    //       ...values,
    //       type: iframe
    //         ? 'IFRAME'
    //         : selectedScript && selectedScript.value
    //         ? 'SCRIPT'
    //         : 'REDIRECT',
    //       scriptId: selectedScript && selectedScript.value,
    //       webhookId: selectedWebhook && selectedWebhook.value,
    //     },
    //   })
    // }
    console.log(iframe, values)
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isLoading={isLoading}
        linkData={linkData}
        iframe={iframe} //in
        setIframe={setIframe} //in
        //dakhel
      />
    </Card>
  )
}

export default CreateLink
