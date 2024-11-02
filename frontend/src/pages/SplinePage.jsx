import React from 'react'
import { Link } from 'react-router-dom'
import Spline from '../components/interpolation/Spline'

export default function SplinePage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Spline/>
    </div>
  )
}
