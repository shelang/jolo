import React from 'react'
import {
  FaChrome,
  FaSafari,
  FaFirefoxBrowser,
  FaWhatsapp,
} from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import SamsungBrowser from '../../assets/SamsungBrowser.png'

import './style.scss'

export const InfoTile = ({ value, label, isLoading, primary }) => {
  const Icons = {
    Firefox: <FaFirefoxBrowser />,
    Chrome: <FaChrome />,
    SamsungBrowser: <img src={SamsungBrowser} alt="logo" width={24} />,
    Safari: <FaSafari />,
    'Chrome Webview': <FaChrome />,
    WhatsApp: <FaWhatsapp />,
  }
  return isLoading ? (
    <div className="infoSkeleton">
      <Skeleton circle count={1} className="circleSkeleton" />
      <Skeleton count={2} />{' '}
    </div>
  ) : (
    <div className={primary ? 'primaryInfoTitleCard' : 'infoTitleCard'}>
      {Icons[label]}
      <span className="infoTitleLabel">{label}</span>
      <span className="infoTitleValue">
        {new Intl.NumberFormat().format(value)}
      </span>
    </div>
  )
}
