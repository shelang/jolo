import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './style.scss'

export const Sticky = ({ children, topOffset = 0 }) => {
  const [isStick, setIsStick] = useState(false)

  const handleScroll = useCallback(
    (event) => {
      const elementTop =
        event?.target?.children[0]?.getBoundingClientRect()?.top

      setIsStick((prev) => {
        if (elementTop < 63 && !prev) {
          return true
        } else if (elementTop >= 63 && prev) {
          return false
        } else {
          return prev
        }
      })
    },
    [isStick],
  )

  const StickyHeader = useMemo(() => {
    return (
      <div
        className={isStick ? 'sticked' : 'normal'}
        style={{
          position: 'sticky',
          top: topOffset,
          zIndex: 999,
          width: '100%',
          transition: 'all 0.2s ease-in-out',
        }}>
        {React.cloneElement(children, {
          ...children.props,
          isStick: isStick,
        })}
      </div>
    )
  }, [isStick, children.props])

  useEffect(() => {
    document.querySelector('#content')?.addEventListener('scroll', handleScroll)

    return () => {
      document
        .querySelector('#content')
        ?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return StickyHeader
}
