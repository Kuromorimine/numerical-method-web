import React from 'react'
import { Link } from 'react-router-dom'
import TrapezoidalRule from '../components/Differentiation/Trapezoidal'

export default function TrapezoidalPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <TrapezoidalRule/>
    </div>
  )
}
