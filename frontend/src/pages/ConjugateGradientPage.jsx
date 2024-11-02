import React from 'react'
import { Link } from 'react-router-dom'
import ConjugateGradient from '../components/AXB/ConjugateGradient'

export default function ConjogateGradientPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <ConjugateGradient/>
    </div>
  )
}
