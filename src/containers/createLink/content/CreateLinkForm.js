import React, { useEffect, useState } from 'react'
import { Spin, Form } from 'antd'

import useFetch from '../../../hooks/asyncAction'
import { booleanEnum } from '../../../utils/constants'
import { useQuery } from '../../../hooks/queryParams'
import { SuccefullModal } from './succesfullModal'
import { copyToClipboard } from '../../../utils/general/copyToClipboard'
import { CreateLinkForm } from './form'

const CreateLink = () => {
  let query = useQuery()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [editMode, setEditMode] = useState(booleanEnum[query.get('isEditing')])
  const [linkId, setLinkId] = useState(query.get('id'))
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0)

  const [massCreateResponses, setMassCreateResponses] = useState([])

  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1)
    },
  })

  const [linkData, fetchLinkData] = useFetch()
  const [altTypesData, getAltTypeData] = useFetch()

  const [form] = Form.useForm()

  const fetchDevices = async () => {
    getAltTypeData({
      url: 'links/alt/types',
      method: 'GET',
    })
  }
  useEffect(() => {
    fetchDevices()
  }, [])

  const createNewLink = () => {
    setIsModalVisible(false)
    form.resetFields()
    setMassCreateResponses([])
  }

  const onFinish = async (values) => {
    const id = (response && response.id) || linkId
    let URL = editMode ? `links/${id}` : 'links'
    let method = editMode ? 'PUT' : 'POST'
    await doFetch({
      url: URL,
      method: method,
      data: values,
    })
  }

  const onFetchLinkData = async () => {
    await fetchLinkData({
      url: `links/${linkId}`,
      method: 'GET',
    })
  }

  const onCancel = () => {
    setIsModalVisible(false)
    if (massCreateResponses.length <= 1) {
      setEditMode(true)
      query.set('isEditing', true)
    }
  }

  useEffect(() => {
    response && setMassCreateResponses([...massCreateResponses, response])
    response && setIsModalVisible(true)
  }, [response])
  useEffect(() => {
    if (linkId) {
      onFetchLinkData()
    }
  }, [linkId])

  return (
    <>
      <SuccefullModal
        onCopyToClipboard={() => copyToClipboard(response)}
        onMassCreateResponses={massCreateResponses}
        onIsModalVisible={isModalVisible}
        onCreateNewLink={createNewLink}
        onCancel={onCancel}
      />
      <Spin spinning={linkData.isLoading}>
        <CreateLinkForm
          initialValues={linkData?.response ?? {}}
          onFinishForm={onFinish}
          form={form}
          altTypesData={altTypesData}
        />
      </Spin>
    </>
  )
}

export default CreateLink
