import React from 'react'
import { Link } from 'react-router-dom'
import Gaussian from '../components/AXB/Gauss'

export default function GaussPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Gaussian/>
    </div>
  )
}
