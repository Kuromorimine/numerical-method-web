import React from 'react'
import { Link } from 'react-router-dom'
import LinearLeastSquares from '../components/regression/Linear'

export default function LinearPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <LinearLeastSquares />
    </div>
  )
}
