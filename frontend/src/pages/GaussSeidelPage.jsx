import React from 'react'
import { Link } from 'react-router-dom'
import GaussSeidel from '../components/AXB/GaussSeidel'

export default function GaussSeidelPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <GaussSeidel/>
    </div>
  )
}
