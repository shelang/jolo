import React from 'react'
import logo from '../resources/images/logo.png'
import '../styles/login.css'

const Logo = () => {
    return (
        <div className='section-logo'>
            <img src={logo} className="logo" alt='linkcomposer logo'/>
        </div>
    )
}

export default Logo