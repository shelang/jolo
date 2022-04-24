import { AutoComplete, Button, Tooltip, Typography } from 'antd'
import React from 'react'
import { tooltips } from '../../../utils/constants'

const RetargetScript = ({ onSearch, onSelect, scripts, selectedScript }) => {
  const { Title } = Typography
  return (
    <>
      <Title level={3}>
        Retargeting codes
        <Tooltip
          className={'customTooltip'}
          placement="top"
          title={tooltips.textTargeting}>
          <Button>?</Button>
        </Tooltip>
      </Title>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={scripts}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Search Scripts"
        value={selectedScript ? selectedScript.label : undefined}
      />
    </>
  )
}

export default RetargetScript
