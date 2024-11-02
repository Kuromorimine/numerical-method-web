import React from 'react'
import { Link } from 'react-router-dom'
import GaussJordan from '../components/AXB/GaussJordan'

export default function GaussJordanPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <GaussJordan/>
    </div>
  )
}
