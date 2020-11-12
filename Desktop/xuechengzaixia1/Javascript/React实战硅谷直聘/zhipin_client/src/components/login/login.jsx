import React from 'react'

import './logo.css'
import logo from './logo.jpg'

export default function Logo() {
  return (
    <div className="logo-container">
      <br/>
      <img src={logo} alt="logo" className="logo-img"/>
    </div>
  )
} 