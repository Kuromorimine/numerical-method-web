import React from 'react'
import { Link } from 'react-router-dom'
import CompositeTrapezoidalRule from '../components/Differentiation/CompositeTrapezoidal'

export default function CompositeTrapezoidalPage() {
  return (
    <div>
        <Link to="/">Home</Link>
        <CompositeTrapezoidalRule/>
    </div>
  )
}
