import React from 'react'
import { Link } from 'react-router-dom'
import LU from '../components/AXB/LU'

export default function LUPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <LU/>
    </div>
  )
}
