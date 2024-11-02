import React from 'react'
import { Link } from 'react-router-dom'
import Jacobi from '../components/AXB/Jacobi'

export default function JacobiPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Jacobi/>
    </div>
  )
}
