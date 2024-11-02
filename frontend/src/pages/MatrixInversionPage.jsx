import React from 'react'
import { Link } from 'react-router-dom'
import MatrixInversion from '../components/AXB/MatrixInversion'

export default function MatrixInversionPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <MatrixInversion/>
    </div>
  )
}
