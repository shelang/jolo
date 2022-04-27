import React, { useRef, useState, useEffect } from 'react'
import { Button, Card } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import './collapsible.scss'
const Collapsible = ({ title, children, isOpen, setIsOpen }) => {
  const [height, setHeight] = useState(isOpen ? undefined : 0)

  const ref = useRef(null)

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev)
  }

  //get height to animate the collapse
  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height)
    else setHeight(0)
  }, [isOpen])

  return (
    <div>
      <div onClick={handleFilterOpening}>
        <Button
          style={{ paddingLeft: 0 }}
          type="link"
          icon={!isOpen ? <DownOutlined /> : <UpOutlined />}
          size={'lg'}>
          {title}
        </Button>
      </div>
      {isOpen && (
        <div style={{ height }} className="my-collapse">
          <div style={{ padding: '2rem' }} ref={ref}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Collapsible
